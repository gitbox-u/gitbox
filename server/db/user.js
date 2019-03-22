const { Schema, model } = require('mongoose');

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
      if (res === null) {
        // gen new uuid
        const id = uuid();

        return addEntity(id).then(() => {
          return new User({
            user, salt, hash, uuid: id, admin: false,
          }).save()
        });
      } else {
        return Promise.reject();
      }
    }
  );
};

const getUser = (user) => User.findOne({ user });

module.exports = {
  User, addUser, getUser,
}