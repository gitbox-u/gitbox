const fs = require("fs");
const commit_lines = require('./commit_lines');
const branches = require('./branches');


const yargs = require('yargs').option('path', {
  url: 'string' // Allows you to have an array of arguments for particular command
});

const yargs_argv = yargs.argv;

if (!('path' in yargs_argv)) {
  process.exit(1)
}

const path = yargs_argv["path"];
branches(path).then(console.log);



