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
const updatePassword = (user, password) => {
  const cred = enc(password);
  return User.findOneAndUpdate({user}, {...cred}).then(res => {
    if (res) return Promise.resolve();
    return Promise.reject();
  })
}


module.exports = {
  User, addUser, getUser, getUserByUUID, getAllUsers, updatePassword
};