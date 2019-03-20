import mongoose from 'mongoose';
const { Schema, connect, model } = mongoose;

export const init = () => connect('mongodb://localhost:27017').then(() => {
  console.log('connected');
});

// TODO: Move Schema/model definitions into logical files & use this to export them

// To use this: .create()/.insertMany()/.findOne()...
// Be sure to save it to Mongo: .save(callback)
// https://mongoosejs.com/docs/models.html
export const Repository = model('Repository', new Schema({
  uuid: String, // TODO: See if we can validate the length of this
  name: String,
  remoteUrl: String,
  stats: String, // TODO: Expand into useful objects
}));

/**
 * An entity that may perform operations on repositories
 * (usually a human user).
 */
export const Entity = model('Entity', new Schema({
  uuid: String, // TODO: How do we ensure this matches auth UUIDs?
  // authorizedRepos: [
  //
  // ],
}));