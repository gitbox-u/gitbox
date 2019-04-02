const path = require('path');

const root = path.join(process.env.REPODIR ? process.env.REPODIR : require('os').homedir(), 'REPODUMP', 'Repos');

module.exports = {
  root,
};