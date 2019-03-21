const crypto = require("crypto");

const hasher = crypto.createHash("sha512")

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genSalt = (length) => {
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};

const hashWithSalt = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt)
    .update(password)
    .digest('hex');

  return hash;
}

const enc = (password) => {
  const salt = genSalt(16);
  const hash = hashWithSalt(password, salt);

  return {
    salt, hash
  };
}

const check = (hashed, salt, attempt) => {
  return hashWithSalt(attempt, salt) === hashed;
}

module.exports = { enc, check }