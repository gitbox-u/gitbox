const fs = require("fs");
const git = require("simple-git");

const yargs = require('yargs').option('path', {
  url: 'string' // Allows you to have an array of arguments for particular command
});

const yargs_argv = yargs.argv;

if ('path' in yargs_argv) {
  console.log(`parsing ${yargs_argv['path']}`)
}else{
  process.exit(1)
}

