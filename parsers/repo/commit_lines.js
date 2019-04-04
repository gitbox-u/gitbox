const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { getColour, getLanguage, isIgnored } = require('./LanguageTools')
const { colors } = require("./Colors")
const interval = 86400;

async function commitLines(path) {
  const git = `cd "${path}"
  git log --numstat --pretty="C:%cn:%at" --no-merges --reverse| sed '/^$/d'`;
  const { stdout, stderr } = await exec(git, {maxBuffer: 1024 * 1000 * 4});

  const committers = {};
  const stats_committers = {};
  const extensions = new Set([]);
  const languages = new Set([]);

  const stats_global = {
    languages: {},
    addDelete: [{ 'id': 'additions', 'color': 'green', 'data': {} }, { 'id': 'deletions', 'color': 'red', 'data': {} }],
    stats: {}
  };

  let curr_committer = null;
  let curr_time = null;

  let committer_ind = 0;

  stdout.split('\n').forEach((commit, index) => {
    if (commit === '') return;
    if (commit[0] === 'C') {
      // new commit
      const [_, com, time] = commit.split(':');

      curr_committer = com;
      curr_time = Math.floor(parseInt(time) / interval) * interval; // floor to nearest day

      if (committers[curr_committer] === undefined) {
        committers[curr_committer] = { commits: 1, additions: 0, deletions: 0, color: colors[(committer_ind) % colors.length], key: committer_ind };

        committer_ind++;
        stats_committers[curr_committer] = {
          languages: {},
          addDelete: [{ 'id': 'additions', 'color': 'green', 'data': {} }, {
            'id': 'deletions',
            'color': 'red',
            'data': {}
          }]
        };
      } else committers[curr_committer].commits++


      // code stream
      const { stats } = stats_global;

      if (stats[curr_time] === undefined) {
        stats[curr_time] = {};
      }

      if (stats[curr_time][curr_committer] === undefined) {
        stats[curr_time][curr_committer] = 0;
      }

      stats[curr_time][curr_committer]++;

    } else {

      let [adds, dels, file] = commit.split('\t');
      if (file.split('.').length < 2) return;
      if (includesBanned(file)) return;


      try {
        // moving logic
        if (file.includes('=>')) {
          // TODO: FIX
          if (file.includes('}/')) return; // hell to handle
          if (!file.includes('}')) return; // hell to handle
          let [path, rest] = file.split('{');

          rest = rest.split('}')[0];

          const [frm, to] = rest.split(' => ');

          if (isIgnored(frm.split('.').pop())) return;

          const lang_from = getLanguage(frm.split('.').pop());
          const lang_to = getLanguage(to.split('.').pop());

          if (lang_from === "Other") return;

          if (stats_global.languages[lang_to] === undefined) stats_global.languages[lang_to] = new LangObject(lang_to);
          stats_global.languages[lang_to].children[path + to] = stats_global.languages[lang_from].children[path + frm];

          try {
            stats_global.languages[lang_to].children[path + to].name = path + to;
          }catch (e) {

          }


          delete stats_global.languages[lang_from].children[path + frm];

          for (let cont of Object.keys(stats_committers)) {
            if (typeof (stats_committers[cont].languages[lang_from]) === "undefined" ||
              typeof (stats_committers[cont].languages[lang_from].children[path + frm]) === "undefined") continue;


            if (stats_committers[cont].languages[lang_to] === undefined) stats_committers[cont].languages[lang_to] = new LangObject(lang_to);

            stats_committers[cont].languages[lang_to].children[path + to] = stats_committers[cont].languages[lang_from].children[path + frm];
            stats_committers[cont].languages[lang_to].children[path + to].name = path + to;
            stats_committers[cont].languages[lang_to].children[path + to].name = path + to;
            delete stats_committers[cont].languages[lang_from].children[path + frm];
          }

          file = path + to;
        }
      }catch (e) {
        return;
      }

      const tokens = file.split('.');
      const extension = tokens.pop();
      const name = tokens.join();

      if (name.split('/').pop() === '') return;

      if (isIgnored(extension)) return;
      extensions.add(extension);


      let add = 0, del = 0;
      if (!isNaN(parseInt(adds))) add = parseInt(adds);
      if (!isNaN(parseInt(dels))) del = parseInt(dels);


      committers[curr_committer].additions += add;
      committers[curr_committer].deletions += del;


      const lang = getLanguage(extension);
      if(lang === "Other") return;
      languages.add(lang);
      if (stats_global.languages[lang] === undefined) stats_global.languages[lang] = new LangObject(lang);
      if (stats_committers[curr_committer].languages[lang] === undefined) stats_committers[curr_committer].languages[lang] = new LangObject(lang);
      if (stats_global.languages[lang].children[file] === undefined) stats_global.languages[lang].children[file] = {
        name: file,
        lines: 0
      };
      if (stats_committers[curr_committer].languages[lang].children[file] === undefined) stats_committers[curr_committer].languages[lang].children[file] = {
        name: file,
        lines: 0
      };

      stats_committers[curr_committer].languages[lang].children[file].lines += add;
      // stats_committers[curr_committer].languages[lang].children[file].lines -= del;
      stats_global.languages[lang].children[file].lines += add;
      stats_global.languages[lang].children[file].lines -= del;


      const stats_add_data = stats_committers[curr_committer].addDelete[0].data;
      const stats_del_data = stats_committers[curr_committer].addDelete[1].data;
      const global_add_data = stats_global.addDelete[0].data;
      const global_del_data = stats_global.addDelete[1].data;
      // addDelete stats, init if needed
      if (stats_add_data[curr_time] === undefined || stats_del_data[curr_time] === undefined) {
        stats_add_data[curr_time] = { y: 0 };
        stats_del_data[curr_time] = { y: 0 };
      }

      if (global_add_data[curr_time] === undefined || stats_del_data[curr_time] === undefined) {
        global_add_data[curr_time] = { y: 0 };
        global_del_data[curr_time] = { y: 0 };
      }

      stats_add_data[curr_time].y += add;
      stats_del_data[curr_time].y -= del;
      global_add_data[curr_time].y += add;
      global_del_data[curr_time].y -= del;
    }

  });




  stats_global.languages = getLangArray(stats_global.languages);
  stats_global.addDelete[0].data = getKeyedObjectAsArray(stats_global.addDelete[0].data, 'x');
  stats_global.addDelete[1].data = getKeyedObjectAsArray(stats_global.addDelete[1].data, 'x');
  for (let committer in stats_committers) {
    stats_committers[committer].languages = getLangArray(stats_committers[committer].languages);
    stats_committers[committer].addDelete[0].data = getKeyedObjectAsArray(stats_committers[committer].addDelete[0].data, 'x');
    stats_committers[committer].addDelete[1].data = getKeyedObjectAsArray(stats_committers[committer].addDelete[1].data, 'x');
  }


  // codestream
  const allCommitters = Object.keys(stats_committers)
  // give all non-committers of this interval a value of 0
  stats_global.stats = Object.values(stats_global.stats).map(
    s => {
      for (let committer of allCommitters) {
        if (s[committer] === undefined) s[committer] = 0;
      }
      return s;
    }
  );

  // transforming committers
  const newCommittersArray = getKeyedObjectAsArray(committers, "name");


  return { stats_global, stats_committers, committers: newCommittersArray, extensions: [...extensions],
    languages: [...languages].map(lang => {return {language: lang, color: getColour(lang)}})
  };
}

function getLangArray(languages) {
  for (let lang of Object.keys(languages)) {
    languages[lang].children = Object.values(languages[lang].children);
  }

  return Object.values(languages);
}

class LangObject {
  constructor(language) {
    this.children = [];
    this.name = language;
    this.color = getColour(language);
  }
}

function getKeyedObjectAsArray(obj, name) {
  const ret = [];
  for (let key in obj) {
    const toPush = { [name]: key, ...obj[key] };
    ret.push(toPush);
  }

  return ret;
}

function includesBanned(file){
  const BANNED = ['.min.', 'build/', 'dependencies/', 'node_modules/'];
  for (let item of BANNED){
    if (file.includes(item)) return true;
  }

  return false;
}



module.exports = commitLines;


