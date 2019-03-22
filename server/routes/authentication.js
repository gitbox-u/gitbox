const {bodyHasParameters} = require("./validator");
const {enc, check} = require("../authenticator/hasher");
const {secret} = require('../authenticator/secret');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {addUser} = require('../db');

const users = [];

router.post(
  "/login",
  bodyHasParameters(
    ["username", "password"],
  ),
  (req, res) => {
    const {username, password} = req.body;

    if (username in users) {
      const user = users[username];
      const {hash, salt, uuid} = user;
      if (check(hash, salt, password)) {
        const token = jwt.sign(
          {id: uuid},
          secret,
          {expiresIn: 86400} // 24 hrs
        );

        res.status(200).json({auth: true, token});
      } else {
        res.status(401).json({auth: false, token: null});
      }
    } else {
      res.status(401).json({auth: false, token: null});
    }
  }
);

router.post(
  "/register",
  bodyHasParameters(
    ["username", "password"],
  ),
  (req, res) => {
    const {username, password} = req.body;

    if (username in users) {
      res.status(400).json({message: `${username} is taken, try another.`});
    } else {
      // username is free

      const cred = enc(password);
      const {hash, salt} = cred;

      console.log(cred);

      addUser(username, hash, salt)
        .then(() => res.status(201).json({message: `${username} created`}))
        .catch(console.error)



    }
  },
);


module.exports = router;