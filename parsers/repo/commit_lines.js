const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function commitLines(path) {
  const git = `cd ${path}
  git log --numstat --pretty="C:%cn:%at" --no-merges | sed '/^$/d'`;
  const {stdout, stderr} = await exec(git);

  const committers = {};
  const stats_commiters = {};

  const stats_global = {
    languages: {}
  };

  let curr_committer = null;

  stdout.split('\n').forEach((commit, index) => {
    if (commit === '') return;
    if (commit[0] === 'C') {
      // new commit
      curr_committer = commit.split(':')[1];
      if (committers[curr_committer] === undefined) {
        committers[curr_committer] = {commits: 1, add: 0, delete: 0};
        stats_commiters[curr_committer] = {languages: {}};
      } else committers[curr_committer].commits++
    } else {

      const [adds, dels, file] = commit.split('\t');
      if (file.includes('=>') || file.split('.').length < 2) return;
      const [name, extension] = file.split('.');
      if (name.split('/').pop() === '') return;
      if (IGNORED_EXTENSIONS.includes(extension)) return;


      let add, del;
      if (!isNaN(parseInt(adds))) add = parseInt(adds);
      if (!isNaN(parseInt(dels))) del = parseInt(dels);

      committers[curr_committer].add += parseInt(add);
      committers[curr_committer].delete += parseInt(del);


      const lang = getLanguage(extension);
      if (stats_global.languages[lang] === undefined) stats_global.languages[lang] = {name: lang, children: {}};
      if (stats_commiters[curr_committer].languages[lang] === undefined) stats_commiters[curr_committer].languages[lang] = {
        name: lang,
        children: {}
      };
      if (stats_global.languages[lang].children[file] === undefined) stats_global.languages[lang].children[file] = {name: file, lines: 0};
      if (stats_commiters[curr_committer].languages[lang].children[file] === undefined) stats_commiters[curr_committer].languages[lang].children[file] = {
        name: file,
        lines: 0
      };

      stats_commiters[curr_committer].languages[lang].children[file].lines += add;
      stats_commiters[curr_committer].languages[lang].children[file].lines -= del;
      stats_global.languages[lang].children[file].lines += add;
      stats_global.languages[lang].children[file].lines -= del;
    }
  });

  stats_global.languages = getLangArray(stats_global.languages);
  for (let committer of Object.keys(stats_commiters)){
    stats_commiters[committer].languages = getLangArray(stats_commiters[committer].languages);
  }
  return stats_commiters
}

const IGNORED_EXTENSIONS = [
  'xml',
  'json',
  'txt',
  'csv',
  'svg',
  'jpg',
  'jpeg',
  'png',
  'yaml',
  'md',
  'yml',
  'ico'
];

const languages = {
  js: 'Javascript',
  mjs: 'Javascript',
  jsx: 'React.js',
  py: 'Python',
  java: 'Java',
  c: 'C',
  h: 'C',
  sh: 'Shell',
  css: 'CSS',
  html: 'HTML',
  cpp: 'C++',
  swift: 'Swift',
  kt: 'Kotlin',
  cs: 'C#',
};

function getLanguage(extension) {
  const lang = languages[extension];
  return lang === undefined ? 'Other' : lang;
}

function getLangArray(languages){
  for (let lang of Object.keys(languages)){
    languages[lang].children = Object.values(languages[lang].children);
  }

  return Object.values(languages);
}

module.exports = commitLines;
