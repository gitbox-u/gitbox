const git = require('simple-git/promise');
const { getRepoRemote } = require('../db/index');
const { root } = require('../env');
const path = require('path');

const registerRepo = (remote) => {
  getRepoRemote(remote).then((r) => {
    if (!r.uuid) return;
    git().clone(remote, path.join(root, r.uuid)).then(() => {
      console.log('Cloned ' + remote);
    }).catch((err) => {
      console.log('Cloning error: ' + err);
    });
  });
};

module.exports = {
  registerRepo
};