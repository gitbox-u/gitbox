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