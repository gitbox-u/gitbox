const fs = require("fs");
const commit_lines = require('./commit_lines');
const branches = require('./branches');
const tree = require('./tree');
const topfive = require('./topfive');


const yargs = require('yargs').option('path', {
  url: 'string' // Allows you to have an array of arguments for particular command
});

const yargs_argv = yargs.argv;

if (!('path' in yargs_argv)) {
  process.exit(1)
}

const path = yargs_argv["path"];
// commit_lines(path).then((res) => console.log(JSON.stringify(res.stats_global.languages)));
// console.log(JSON.stringify(tree(path, ['jsx', 'js', 'sh'])));
topfive(path).then(console.log);



