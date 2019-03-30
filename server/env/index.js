const path = require('path');

const root = path.join(process.env.REPODIR ? process.env.REPODIR : require('os').homedir(), 'REPODUMP', 'Repos');
console.log('rt');
console.log(root);

module.exports = {
  root,
};