const { Schema, model } = require('mongoose');
const { addEntity } = require('./entity');
const { enc } = require('../authenticator/hasher');
const uuid = require('uuid/v4');

const User = model('User', new Schema({
  user: String,
  uuid: String,
  hash: String,
  salt: String,
  admin: Boolean,
}));

const addUser = (user, salt, hash) => {
  return getUser(user).then(
    (res, err) => {
      console.log(res, err);

      if (res === null) {
        // gen new uuid
        const id = uuid();

        return addEntity(id).then((entity) => {
          return new User({
            user, salt, hash, uuid: id, admin: false,
          }).save();
        });
      } else {
        return Promise.reject();
      }
    }
  );
};

const getUser = (user) => User.findOne({ user });
const getUserByUUID = (uuid) => User.findOne({ uuid });
const getAllUsers = (uuid) => User.find();
const updateUser = (uuid, params) => {
  return User.findOneAndUpdate({uuid}, params).then(res => {
    if (res) return Promise.resolve();
    return Promise.reject();
  })
}

const removeUser = (uuid) => {
  return User.findOneAndRemove({uuid});
}


module.exports = {
  User, addUser, getUser, getUserByUUID, getAllUsers, updateUser, removeUser
};