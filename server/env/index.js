const path = require('path');

const root = path.join(process.env.REPODIR ? process.env.REPODIR : require('os').homedir(), 'REPODUMP', 'Repos');
const parsers = path.join(process.env.PARSERDIR || '..', 'parsers/');
console.log(parsers);

module.exports = {
  root, parsers
};