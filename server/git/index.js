const git = require('simple-git/promise');
const { getRepoRemote } = require('../db/index');
const { root } = require('../env');
const path = require('path');
const fs = require('fs');

const registerRepo = (remote) => {
  getRepoRemote(remote).then((r) => {
    if (!r.uuid)  {
      return;
    } // Assuming repo is added before this (i.e. in DB with 'remote' field)

    const store = path.join(root, r.uuid, 'repo');
    if (fs.existsSync()) {
      git(store).pull('origin', 'master').then(console.log); // TODO: Handle this
    } else { // Does not yet exist
      git(store).clone(remote, '').then(() => {
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