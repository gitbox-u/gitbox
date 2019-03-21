const {bodyHasParameters} = require("./validator");
const {hash, check} = require("../authenticator/hasher");
const uuidv4 = require("uuid/v4");
const router = require('express').Router();

const users = {
  // user: { pass, salt, uuid, [ secrets ] }

};

router.post(
  "/login",
  bodyHasParameters(
    ["username", "password"],
  ),
  (req, res) => {
    const {username, password} = req.body;
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
      const cred = hash(password);
      const {pass, salt} = cred;

      // username is free
      users[username] = {
        pass,
        salt,
        uuid: uuidv4(),
        secrets: [],
      };
    }
  },
)


module.exports = router;