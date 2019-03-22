const uuid = require('uuid/v4');

const { connect } = require('mongoose');

const init = () => connect('mongodb://localhost:27017').then(() => {
  console.log('connected');
}).catch((err) => {
  // idk what to do here
});


module.exports = {
  init,
  ...require('./repository'),
  ...require('./entity'),
  ...require('./user'),
};