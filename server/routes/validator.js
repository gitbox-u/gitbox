const {secret} = require('../authenticator/secret');
const jwt = require('jsonwebtoken');

// params: [ "a", "b" ]
const bodyHasParameters = (params) => {
  return (req, res, next) => {
    const { body } = req;

    if (body === undefined) {
      return res.status(400).json({ message: "Request to this endpoint requires a body" });
    } else {
      for (let key of params) {
        if (!(key in body)) {
          return res.status(400).json({ message: `Request to this endpoint requires parameters: ${params}, but is missing ${key}` });
        }
      }
    }

    next();
  }
};

const authenticate = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token === undefined) return res.status(401).json({ message: 'Requests to this resource must be accompanied by a token' })

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

    // token is a valid token
    const uuid = decoded.id;
    next(uuid);
  });
}

module.exports = { bodyHasParameters, authenticate };