const { secret } = require('../authenticator/secret');
const jwt = require('jsonwebtoken');
const { getEntity, getUserByUUID } = require('../db');

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

const auth = (isAdmin) => (req, res, next) => {
  console.log(req.headers);
  
  const token = req.headers['authorization'].split(' ')[1]; // TODO: Intermediate error checks?
  

  if (token === undefined)
    return res.status(401).json({ auth: false, token: null, admin: false }); // TODO: Notify user not logged in?

  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: 'Failed to authenticate token' }); // TODO: Notify

    getEntity(decoded.id).then((e) => {
      if (!e) {
        return Promise.reject();
      }

      // token is a valid token
      req.body.uuid = decoded.id;
      res.locals.uuid = decoded.id; // TODO: Use this - more proper than modifying req.body
    })
    .then((e) => {
      return getUserByUUID(req.body.uuid)
    })
    .then((e) => {
      if (!e.admin && isAdmin) return Promise.reject();
      else return Promise.resolve();
    })
    .then((e) => {
      next()
    })
    .catch((e) => {
      return res.status(401).json({ auth: false, token: null, admin: false });
    });
  });
};

const authenticate = auth(false);
const authenticateAdmin = auth(true);

module.exports = { bodyHasParameters, authenticate, authenticateAdmin };