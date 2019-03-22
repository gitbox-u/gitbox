const git = require('simple-git/promise');
const { getRepoRemote } = require('../db/index');
const { root } = require('../env');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const registerRepo = (remote) => {
  getRepoRemote(remote).then((r) => {
    if (!r.uuid) {
      return;
    } // Assuming repo is added before this (i.e. in DB with 'remote' field)

    const store = path.join(root, r.uuid);
    if (fs.existsSync()) {
      git(store).pull('origin', 'master').then(console.log); // TODO: Handle this
    } else { // Does not yet exist
      shell.mkdir('-p', store);
      git(store).clone(remote, null).then(() => {
        console.log('Cloned ' + remote);
      }).catch((err) => {
        console.log('Cloning error: ' + err);
      });
    }
  });
};

module.exports = {
  registerRepo
};