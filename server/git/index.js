const git = require('simple-git/promise');
const {getRepoRemote} = require('../db/index');
const {root} = require('../env');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const registerRepo = (repo) => {
  if (!repo.uuid) return Promise.reject();  // Assuming repo is added before this (i.e. in DB with 'remote' field)

  const store = path.join(root, repo.uuid, 'repo');

  let remote = repo.remoteUrl;
  if (repo.auth) remote = `https://${repo.auth.username}:${repo.auth.password}@${remote.split('://')[1]}`;
  shell.mkdir('-p', store);

  const creds = `cd ${store}/${repo.name}
        git config credential.helper store`;

  console.log('dir created');
  return git(store)
    .clone(remote, repo.name)
    .then(() => exec(creds))
    .then(() => Promise.resolve(repo.uuid))
    .catch((err) => {
      Promise.reject('Cloning error: ' + err);
    });
};

function pullRepo(repo) {
  const store = path.join(root, repo.uuid, 'repo');

  return git(store)
    .pull('origin', 'master')

}

async function refreshStats(repoID) {

}

async function getStats(repoID) {

}

async function getStatsCommitter(repoID, committer) {

}

module.exports = {
  registerRepo
};
