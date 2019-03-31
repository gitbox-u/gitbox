const util = require('util');
const exec = util.promisify(require('child_process').exec);

const interval = 86400;

async function commitLines(path) {
  const git = `cd ${path}
  git log --numstat --pretty="C:%cn:%at" --no-merges --reverse| sed '/^$/d'`;
  const {stdout, stderr} = await exec(git);

  const committers = {};
  const stats_committers = {};
  const extensions = new Set([]);

  const stats_global = {
    languages: {},
    addDelete: [{'id': 'additions', 'color': 'green', 'data': {}}, {'id': 'deletions', 'color': 'red', 'data': {}}],
  };

  let curr_committer = null;
  let curr_time = null;

  stdout.split('\n').forEach((commit, index) => {
    if (commit === '') return;
    if (commit[0] === 'C') {
      // new commit
      const [_, com, time] = commit.split(':');

      curr_committer = com;
      curr_time = Math.floor(parseInt(time) / interval) * interval; // floor to nearest day

      if (committers[curr_committer] === undefined) {
        committers[curr_committer] = {commits: 1, add: 0, delete: 0};
        stats_committers[curr_committer] = {
          languages: {},
          addDelete: [{'id': 'additions', 'color': 'green', 'data': {}}, {
            'id': 'deletions',
            'color': 'red',
            'data': {}
          }]
        };
      } else committers[curr_committer].commits++
    } else {

      let [adds, dels, file] = commit.split('\t');
      if (file.split('.').length < 2) return;


      // moving logic
      if (file.includes('=>')) {
        if(file.includes('}/')) return; // hell to handle
        if(!file.includes('}')) return; // hell to handle
        let [path, rest] = file.split('{');

        rest = rest.split('}')[0];

        const [frm, to] = rest.split(' => ');

        const lang_from = getLanguage(frm.split('.').pop());
        const lang_to = getLanguage(to.split('.').pop());


        if (stats_global.languages[lang_to] === undefined) stats_global.languages[lang_to] = {name: lang_to, children: {}};
        stats_global.languages[lang_to].children[path + to] = stats_global.languages[lang_from].children[path + frm];


        stats_global.languages[lang_to].children[path + to].name = path + to;


        delete stats_global.languages[lang_from].children[path + frm];

        for (let cont of Object.keys(stats_committers)) {
          if (typeof (stats_committers[cont].languages[lang_from]) === "undefined"||
            typeof (stats_committers[cont].languages[lang_from].children[path + frm]) === "undefined") continue;


          if (stats_committers[cont].languages[lang_to] === undefined) stats_committers[cont].languages[lang_to] = {name: lang_to, children: {}};

          stats_committers[cont].languages[lang_to].children[path + to] = stats_committers[cont].languages[lang_from].children[path + frm];
          stats_committers[cont].languages[lang_to].children[path + to].name = path + to;
          delete stats_committers[cont].languages[lang_from].children[path + frm];
        }

        file = path + to;
      }


      const [name, extension] = file.split('.');
      if (name.split('/').pop() === '') return;
      if (IGNORED_EXTENSIONS.includes(extension)) return;
      extensions.add(extension);


      let add = 0, del = 0;
      if (!isNaN(parseInt(adds))) add = parseInt(adds);
      if (!isNaN(parseInt(dels))) del = parseInt(dels);

      committers[curr_committer].add += add;
      committers[curr_committer].delete += del;


      const lang = getLanguage(extension);
      if (stats_global.languages[lang] === undefined) stats_global.languages[lang] = {name: lang, children: {}};
      if (stats_committers[curr_committer].languages[lang] === undefined) stats_committers[curr_committer].languages[lang] = {
        name: lang,
        children: {}
      };
      if (stats_global.languages[lang].children[file] === undefined) stats_global.languages[lang].children[file] = {
        name: file,
        lines: 0
      };
      if (stats_committers[curr_committer].languages[lang].children[file] === undefined) stats_committers[curr_committer].languages[lang].children[file] = {
        name: file,
        lines: 0
      };

      stats_committers[curr_committer].languages[lang].children[file].lines += add;
      stats_committers[curr_committer].languages[lang].children[file].lines -= del;
      stats_global.languages[lang].children[file].lines += add;
      stats_global.languages[lang].children[file].lines -= del;


      // const stats_add_data = stats_committers[curr_committer][0].data;
      // const stats_del_data = stats_committers[curr_committer][1].data;
      // const global_add_data = stats_global[0].data;
      // const global_del_data = stats_global[1].data;
      // // addDelete stats, init if needed
      // if (stats_add_data[curr_time] === undefined || stats_del_data[curr_time] === undefined) {
      //   stats_add_data[curr_time] = {y: 0};
      //   stats_del_data[curr_time] = {y: 0};
      // }
      //
      // if (global_add_data[curr_time] === undefined || stats_del_data[curr_time] === undefined) {
      //   global_add_data[curr_time] = {y: 0};
      //   global_del_data[curr_time] = {y: 0};
      // }
      //
      // stats_add_data[curr_time].y += add;
      // stats_del_data[curr_time].y += del;
      // global_add_data[curr_time].y += add;
      // global_add_data[curr_time].y += del;
    }
  });

  stats_global.languages = getLangArray(stats_global.languages);
  stats_global.addDelete = getKeyedObjectAsArray(stats_global.addDelete, 'x');
  for (let committer in stats_committers) {
    stats_committers[committer].languages = getLangArray(stats_committers[committer].languages);
    stats_committers[committer].addDelete = getKeyedObjectAsArray(stats_committers[committer].addDelete, 'x');
  }
  return {stats_global};
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

function getLangArray(languages) {
  for (let lang of Object.keys(languages)) {
    languages[lang].children = Object.values(languages[lang].children);
  }

  return Object.values(languages);
}

function getKeyedObjectAsArray(obj, name) {
  const ret = [];
  for (let key in obj) {
    const toPush = {[name]: key, ...obj[key]};
    ret.push(toPush);
  }

  return ret;
}

module.exports = commitLines;


