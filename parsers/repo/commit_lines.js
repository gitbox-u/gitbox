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


        if (stats_global.languages[lang_to] === undefined) stats_global.languages[lang_to] = {name: lang_to, children: {}, color: colours[lang_to]};
        stats_global.languages[lang_to].children[path + to] = stats_global.languages[lang_from].children[path + frm];


        stats_global.languages[lang_to].children[path + to].name = path + to;


        delete stats_global.languages[lang_from].children[path + frm];

        for (let cont of Object.keys(stats_committers)) {
          if (typeof (stats_committers[cont].languages[lang_from]) === "undefined"||
            typeof (stats_committers[cont].languages[lang_from].children[path + frm]) === "undefined") continue;


          if (stats_committers[cont].languages[lang_to] === undefined) stats_committers[cont].languages[lang_to] = {name: lang_to, children: {}, color: colours[lang_to]};

          stats_committers[cont].languages[lang_to].children[path + to] = stats_committers[cont].languages[lang_from].children[path + frm];
          stats_committers[cont].languages[lang_to].children[path + to].name = path + to;
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
      if (stats_global.languages[lang] === undefined) stats_global.languages[lang] = {name: lang, children: {}, color: colours[lang]};
      if (stats_committers[curr_committer].languages[lang] === undefined) stats_committers[curr_committer].languages[lang] = {name: lang, children: {}, color: colours[lang]};
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
  js: 'JavaScript',
  mjs: 'JavaScript',
  jsx: 'React',
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

const colours = {
  "Other": "#000000",
  "Mercury": "#ff2b2b",
  "React": "#50e1ff",
  "TypeScript": "#2b7489",
  "PureBasic": "#5a6986",
  "Objective-C++": "#6866fb",
  "Self": "#0579aa",
  "edn": "#db5855",
  "NewLisp": "#87AED7",
  "Jupyter Notebook": "#DA5B0B",
  "Rebol": "#358a5b",
  "Frege": "#00cafe",
  "Dart": "#00B4AB",
  "AspectJ": "#a957b0",
  "Shell": "#89e051",
  "Web Ontology Language": "#9cc9dd",
  "xBase": "#403a40",
  "Eiffel": "#946d57",
  "Nix": "#7e7eff",
  "RAML": "#77d9fb",
  "MTML": "#b7e1f4",
  "Racket": "#22228f",
  "Elixir": "#6e4a7e",
  "SAS": "#B34936",
  "Agda": "#315665",
  "wisp": "#7582D1",
  "D": "#ba595e",
  "Kotlin": "#F18E33",
  "Opal": "#f7ede0",
  "Crystal": "#776791",
  "Objective-C": "#438eff",
  "ColdFusion CFC": "#ed2cd6",
  "Oz": "#fab738",
  "Mirah": "#c7a938",
  "Objective-J": "#ff0c5a",
  "Gosu": "#82937f",
  "FreeMarker": "#0050b2",
  "Ruby": "#701516",
  "Component Pascal": "#b0ce4e",
  "Arc": "#aa2afe",
  "Brainfuck": "#2F2530",
  "Nit": "#009917",
  "APL": "#5A8164",
  "Go": "#375eab",
  "Visual Basic": "#945db7",
  "PHP": "#4F5D95",
  "Cirru": "#ccccff",
  "SQF": "#3F3F3F",
  "Glyph": "#e4cc98",
  "Java": "#b07219",
  "MAXScript": "#00a6a6",
  "Scala": "#DC322F",
  "Makefile": "#427819",
  "ColdFusion": "#ed2cd6",
  "Perl": "#0298c3",
  "Lua": "#000080",
  "Vue": "#2c3e50",
  "Verilog": "#b2b7f8",
  "Factor": "#636746",
  "Haxe": "#df7900",
  "Pure Data": "#91de79",
  "Forth": "#341708",
  "Red": "#ee0000",
  "Hy": "#7790B2",
  "Volt": "#1F1F1F",
  "LSL": "#3d9970",
  "eC": "#913960",
  "CoffeeScript": "#244776",
  "HTML": "#e44b23",
  "Lex": "#DBCA00",
  "API Blueprint": "#2ACCA8",
  "Swift": "#ffac45",
  "C": "#555555",
  "AutoHotkey": "#6594b9",
  "Isabelle": "#FEFE00",
  "Metal": "#8f14e9",
  "Clarion": "#db901e",
  "JSONiq": "#40d47e",
  "Boo": "#d4bec1",
  "AutoIt": "#1C3552",
  "Clojure": "#db5855",
  "Rust": "#dea584",
  "Prolog": "#74283c",
  "SourcePawn": "#5c7611",
  "AMPL": "#E6EFBB",
  "FORTRAN": "#4d41b1",
  "ANTLR": "#9DC3FF",
  "Harbour": "#0e60e3",
  "Tcl": "#e4cc98",
  "BlitzMax": "#cd6400",
  "PigLatin": "#fcd7de",
  "Lasso": "#999999",
  "ECL": "#8a1267",
  "VHDL": "#adb2cb",
  "Elm": "#60B5CC",
  "Propeller Spin": "#7fa2a7",
  "X10": "#4B6BEF",
  "IDL": "#a3522f",
  "ATS": "#1ac620",
  "Ada": "#02f88c",
  "Unity3D Asset": "#ab69a1",
  "Nu": "#c9df40",
  "LFE": "#004200",
  "SuperCollider": "#46390b",
  "Oxygene": "#cdd0e3",
  "ASP": "#6a40fd",
  "Assembly": "#6E4C13",
  "Gnuplot": "#f0a9f0",
  "JFlex": "#DBCA00",
  "NetLinx": "#0aa0ff",
  "Turing": "#45f715",
  "Vala": "#fbe5cd",
  "Processing": "#0096D8",
  "Arduino": "#bd79d1",
  "FLUX": "#88ccff",
  "NetLogo": "#ff6375",
  "C Sharp": "#178600",
  "CSS": "#563d7c",
  "Emacs Lisp": "#c065db",
  "Stan": "#b2011d",
  "SaltStack": "#646464",
  "QML": "#44a51c",
  "Pike": "#005390",
  "LOLCODE": "#cc9900",
  "ooc": "#b0b77e",
  "Handlebars": "#01a9d6",
  "J": "#9EEDFF",
  "Mask": "#f97732",
  "EmberScript": "#FFF4F3",
  "TeX": "#3D6117",
  "Nemerle": "#3d3c6e",
  "KRL": "#28431f",
  "Ren'Py": "#ff7f7f",
  "Unified Parallel C": "#4e3617",
  "Golo": "#88562A",
  "Fancy": "#7b9db4",
  "OCaml": "#3be133",
  "Shen": "#120F14",
  "Pascal": "#b0ce4e",
  "F#": "#b845fc",
  "Puppet": "#302B6D",
  "ActionScript": "#882B0F",
  "Diff": "#88dddd",
  "Ragel in Ruby Host": "#9d5200",
  "Fantom": "#dbded5",
  "Zephir": "#118f9e",
  "Click": "#E4E6F3",
  "Smalltalk": "#596706",
  "DM": "#447265",
  "Ioke": "#078193",
  "PogoScript": "#d80074",
  "LiveScript": "#499886",
  "JavaScript": "#f1e05a",
  "VimL": "#199f4b",
  "PureScript": "#1D222D",
  "ABAP": "#E8274B",
  "Matlab": "#bb92ac",
  "Slash": "#007eff",
  "R": "#198ce7",
  "Erlang": "#B83998",
  "Pan": "#cc0000",
  "LookML": "#652B81",
  "Eagle": "#814C05",
  "Scheme": "#1e4aec",
  "PLSQL": "#dad8d8",
  "Python": "#3572A5",
  "Max": "#c4a79c",
  "Common Lisp": "#3fb68b",
  "Latte": "#A8FF97",
  "XQuery": "#5232e7",
  "Omgrofl": "#cabbff",
  "XC": "#99DA07",
  "Nimrod": "#37775b",
  "SystemVerilog": "#DAE1C2",
  "Chapel": "#8dc63f",
  "Groovy": "#e69f56",
  "Dylan": "#6c616e",
  "E": "#ccce35",
  "Parrot": "#f3ca0a",
  "Grammatical Framework": "#79aa7a",
  "Game Maker Language": "#8fb200",
  "Papyrus": "#6600cc",
  "NetLinx+ERB": "#747faa",
  "Clean": "#3F85AF",
  "Alloy": "#64C800",
  "Squirrel": "#800000",
  "PAWN": "#dbb284",
  "UnrealScript": "#a54c4d",
  "Standard ML": "#dc566d",
  "Slim": "#ff8f77",
  "Perl6": "#0000fb",
  "Julia": "#a270ba",
  "Haskell": "#29b544",
  "NCL": "#28431f",
  "Io": "#a9188d",
  "Rouge": "#cc0088",
  "cpp": "#f34b7d",
  "AGS Script": "#B9D9FF",
  "Dogescript": "#cca760",
  "nesC": "#94B0C7"
}

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


