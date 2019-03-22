const { Schema, model } = require('mongoose');

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

/**
 * Adds a new user/other entity the database
 * @param {String} uuid, the uuid of the entity (if is a user, needs to be the same as the user.)
 */
const addEntity = (uuid) => {
  return new Entity({
    uuid: uuid,
    authorized: [],
  }).save();
};

const getEntity = (uuid) => Entity.findOne({ uuid }); // TODO: Handle failed promises


module.exports = {
  Entity, addEntity, getEntity,
}