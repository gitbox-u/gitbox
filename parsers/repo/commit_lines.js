const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function commit_lines(path) {
  const git = `cd ${path}
  git log --numstat --pretty="C:%cn:%at" --no-merges | sed '/^$/d'`;
  const {stdout, stderr} = await exec(git);

  const committers = {};
  const stats_commiters ={};
  const stats_global = {};

  let curr = null;

  stdout.split('\n').forEach((commit, index) => {
    if(commit ==='') return;
    if (commit[0] === 'C') {
      // new commit
      curr = commit.split(':')[1];
      if (committers[curr] === undefined) committers[curr] = {commits: 1, add: 0, delete: 0};
      else committers[curr].commits++
    }else{

      const [add, del, file] = commit.split('\t');
      if(file.includes('=>')) return;
      if(IGNORED_EXTENSIONS.includes(file.split('.').pop())) return;
      if(file.split())

        if(!isNaN(parseInt(add))) committers[curr].add += parseInt(add);
      if(!isNaN(parseInt(del))) committers[curr].delete += parseInt(del);


    }
  });

  return  committers
}

const IGNORED_EXTENSIONS =[
  'xml',
  'json',
  'txt',
  'csv'
];

module.exports = commit_lines;
