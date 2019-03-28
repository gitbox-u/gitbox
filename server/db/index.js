const { connect } = require('mongoose');

let mongoHost = 'localhost';
if (process.env.MONGOHOST) {
  mongoHost = process.env.MONGOHOST;
}

const init = () => connect('mongodb://' + mongoHost + ':27017').then(() => {
  console.log('\u001b[32mMongoDB connection completed.\u001b[0m');
}).catch(() => {
  console.log('\u001b[31mMongoDB connection failed. Retrying...\u001b[0m');
  setTimeout(init, 2000);
});

module.exports = {
  init,
  ...require('./repository'),
  ...require('./entity'),
  ...require('./user'),
};