const { bodyHasParameters } = require("./validator");
const { enc, check } = require("../authenticator/hasher");
const { secret } = require('../authenticator/secret');
const { addUser, getUser } = require('../db/index');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post(
  "/login",
  bodyHasParameters(
    ["username", "password"],
  ),
  (req, res) => {
    const { username, password } = req.body;

    getUser(username).then((user) => {
      const { hash, salt, uuid } = user;
      if (check(hash, salt, password)) {
        const token = jwt.sign(
          { id: uuid },
          secret,
          { expiresIn: 86400 } // 24 hrs
        );

        res.status(200).json({ auth: true, token });
      } else {
        res.status(401).json({ auth: false, token: null });
      }
    }).catch((err) => {
      res.status(401).json({ auth: false, token: null });
    });
  }
);

router.post(
  "/register",
  bodyHasParameters(
    ["username", "password"],
  ),
  (req, res) => {
    const { username, password } = req.body;
    const cred = enc(password);
    const { hash, salt } = cred;

    addUser(username, salt, hash).then((user) => {
      return res.status(201).json({ message: `${username} created` });
    }).catch((err) => {
      return res.status(400).json({ message: `${username} is taken, try another.` });
    });
  },
);


module.exports = router;