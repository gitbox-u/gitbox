const mongoose = require('mongoose');
const { Schema, connect } = mongoose;

const conn = () => connect('mongodb://localhost:27017').then(() => {
  console.log('connected');
});

module.exports = {
  conn,
};