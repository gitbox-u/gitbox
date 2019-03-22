const {Schema, model} = require('mongoose');
const {getEntity} = require('./entity');
const uuid = require('uuid/v4');

const Repository = model('Repository', new Schema({
  uuid: String, // TODO: See if we can validate the length of this
  name: String,
  auth: { // TODO: More persistent thing for this (maybe as a file/config?)
    username: String,
    password: String,
    privateKey: String,
  },
  remoteUrl: String,
  stats: String, // TODO: Expand into useful objects
}));

/**
 * Adds a repository record for an entity.
 */
const addRepo = (entityUUID, name, remoteUrl) => {
  // TODO: Add fingerprint to check if repo already exists - hash remoteUrl / something else?
  const repoRecord = new Repository({
    uuid: uuid(),
    name,
    auth: {
      username: '',
      password: '',
      privateKey: '',
    },
    remoteUrl,
    stats: '',
  });
  return repoRecord.save()
    .then(() => getEntity(entityUUID))
    .then((entity) => {
      entity.authorized.push(repoRecord.uuid); // TODO: Check if already there (use a map)
      return entity.save();
    });
};

/**
 * Retrieves a repository record by its UUID.
 *
 * @returns {Promise} for {Repository}.
 */
// TODO: Restrict info (.findOne().select()...)
const getRepo = (uuid) => Repository.findOne({uuid});

const getUserRepos = async (useruuid) => {
  const user = await getEntity(useruuid);

  return Promise.all(user.authorized.map(getRepo)).map(res => res.uuid);

};

// By remote URL
const getRepoRemote = (remote) => Repository.findOne({remoteUrl: remote});

module.exports = {
  Repository, getRepo, getRepoRemote, addRepo, getUserRepos
};