const git = require('simple-git/promise');
const {getRepoRemote} = require('../db/index');
const {root} = require('../env');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const registerRepo = (remote, auth) => {
  return new Promise((resolve, reject) => {
    getRepoRemote(remote).then((r) => {
      if (!r.uuid) {
        return;
      } // Assuming repo is added before this (i.e. in DB with 'remote' field)

      const store = path.join(root, r.uuid, 'repo');
      if (fs.existsSync(store)) { // $ROOT/r.uuid/repo/REPO DATA
        git(store).pull('origin', 'master').then(console.log); // TODO: Handle this
        resolve()
      } else { // Does not yet exist
        if(auth) remote = `https://${auth.username}:${auth.password}@${remote.split('://')[1]}`;
        shell.mkdir('-p', store);
        git(store)
          .clone(remote, '')
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject('Cloning error: ' + err);
          });
      }
    });
  });
};

module.exports = {
  registerRepo
};