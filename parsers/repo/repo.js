const fs = require("fs");
const commit_lines = require('./commit_lines');
const branches = require('./branches');
const tree = require('./tree');
const topfive = require('./topfive');
const shell = require('shelljs');


const yargs = require('yargs')
  .option('save')
  .demandOption('path');

const yargs_argv = yargs.argv;

if (!('path' in yargs_argv)) {
  process.exit(1)
}

const path = yargs_argv.path;
const save = yargs_argv.save;
if (save) shell.mkdir('-p', save);

commit_lines(path)
  .then((res) => {
    saveFile(res.committers, 'committers');
    saveFile(res.stats_global, 'stats_global');
    saveFile(res.stats_committers, 'stats_committers');

    return tree(path, res.extensions);
  })
  .then((t) => {
    saveFile(t, 'tree');
  }).catch((t) => {
    saveFile(t, 'err')
  });

// console.log(JSON.stringify(tree(path, ['jsx', 'js', 'sh'])));
topfive(path).then((t) => saveFile(t, 'topfive'));

branches(path).then((t) => saveFile(t, 'branches'));



function saveFile(file, name) {
  if(save) fs.writeFileSync(`${save}/${name}.json`, JSON.stringify(file))
}



