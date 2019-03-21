const uuid = require('uuid/v4');

const mongoose = require('mongoose');
const { Schema, connect, model } = mongoose;

const init = () => connect('mongodb://localhost:27017').then(() => {
  console.log('connected');

  // addEntity();
  // getEntity('test123').then(console.log);
  // addRepo('test123', 'TEST', 'URL');
  // getRepo('test456').then(console.log);
  // getEntity('test123').then(console.log);
});

// TODO: Move Schema/model definitions into logical files & use this to export them

// To use this: .create()/.insertMany()/.findOne()...
// Be sure to save it to Mongo: .save(callback)
// https://mongoosejs.com/docs/models.html
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
 * Any entity that may perform operations on repositories
 * (usually a human user).
 */
const Entity = model('Entity', new Schema({
  uuid: String, // TODO: How do we ensure this matches auth UUIDs?
  authorized: [ // Authorized repo UUIDs
    { type: String },
  ],
}));

const addEntity = () => {
  const entityRecord = new Entity({
    uuid: 'test123',
    authorized: [],
  });
  entityRecord.save(); // TODO: Error check
};

const getEntity = (uuid) => Entity.findOne({ uuid });

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
  repoRecord.save(); // TODO: Error check

  getEntity(entityUUID).then((entity) => {
    entity.authorized.push(repoRecord.uuid);
    entity.save();
  });
};

/**
 * Retrieves a repository record by its UUID.
 *
 * @returns {Repository} or {null}.
 */
// TODO: Restrict info (.findOne().select()...)
const getRepo = (uuid) => Repository.findOne({ uuid });

module.exports = {
  init,
  Repository,
  Entity,
  addEntity,
  getEntity,
  addRepo,
  getRepo
};