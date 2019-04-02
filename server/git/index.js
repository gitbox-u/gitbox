const git = require('simple-git/promise');
const {getRepo} = require('../db/index');
const {root} = require('../env');
const path = require('path');
const shell = require('shelljs');
const util = require('util');
const fs = require('fs');
const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8');
const exec = util.promisify(require('child_process').exec);

const registerRepo = (repo) => {
  if (!repo.uuid) return Promise.reject();  // Assuming repo is added before this (i.e. in DB with 'remote' field)

  const store = path.join(root, repo.uuid, 'repo');

  console.log(repo);
  console.log(repo.auth);

  let remote = repo.remoteUrl;
  if (repo.auth !== undefined) {
    console.log("RUN")
    const user = encodeURIComponent(repo.auth.username);
    const pass = encodeURIComponent(repo.auth.password);
    remote = `https://${user}:${pass}@${remote.split('://')[1]}`;
  }
  shell.mkdir('-p', store);

  console.log(remote);

  const creds = `cd "${store}/${repo.name}"
        git config credential.helper store`;

  console.log('dir created');
  return git(store)
    .clone(remote, repo.name)
    .then(() => exec(creds))
    .then(() => Promise.resolve(repo))
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
  const repo = await getRepo(repoID).exec();
  const sstore = path.join(root, repo.uuid, 'stats');
  const rstore = path.join(root, repo.uuid, 'repo', repo.name);
  shell.mkdir('-p', sstore);
  console.log(`node ../parsers/repo/repo.js --path "${rstore}" --save "${sstore}"`)
  await exec(`node ../parsers/repo/repo.js --path "${rstore}" --save "${sstore}"`)
}

async function getStats(repoID) {
  const store = path.join(root, repoID, 'stats');
  const stats = JSON.parse(await readFile(path.join(store, 'stats_global.json')));
  stats.id = repoID;
  stats.description = "Descriptions are cancelled, please remove me from the frontend. Thanks!";
  await Promise.all([
    readFile(path.join(store, 'committers.json')).then(r => stats.contributors = JSON.parse(r)),
    readFile(path.join(store, 'tree.json')).then(r => stats.tree = JSON.parse(r)),
    readFile(path.join(store, 'topfive.json')).then(r => stats.calendar = JSON.parse(r)),
    readFile(path.join(store, 'branches.json')).then(r => stats.graph = JSON.parse(r)),
    readFile(path.join(store, 'stats_committers.json')).then(r => stats.stats_committers = JSON.parse(r)),
    getRepo(repoID).exec().then(r => stats.name = r.name)
  ]);

  stats.languages = {name: "language", children: stats.languages};

  return stats;
}

async function getStatsCommitter(repoID, committer) {
  const store = path.join(root, repoID, 'stats');
  const stats = await getStats(repoID);
  const com_stats = JSON.parse(await readFile(path.join(store, 'stats_committers.json')))
  stats.languages = com_stats[committer].languages;
  stats.addDelete = com_stats[committer].addDelete;

  stats.languages = {name: "language", children: stats.languages};

}

module.exports = {
  registerRepo, pullRepo, refreshStats, getStatsCommitter, getStats
};
