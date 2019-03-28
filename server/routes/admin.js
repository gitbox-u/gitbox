const {authenticateAdmin, bodyHasParameters} = require('./validator');
const express = require('express');
const {getAllUsers, updatePassword} = require('../db/user');

const router = express.Router();

router.use(authenticateAdmin);

router.get("/users", (req, res) => {
  // TODO: send any relavent data to the frontend
  getAllUsers().then((users) => users.map(
    (userobj) => {
      const {user, uuid, admin} = userobj;
      return {user, uuid, admin};
    }
  ))
  .then(users => res.send(users));
});

router.post("/users/update/pass", 
  bodyHasParameters(["username", "password"]),
  (req, res) => {
    const {username, password} = req.body;
    updatePassword(username, password)
    .then(() => res.status(200).json({"message": `Password for user ${username} changed`}))
    .catch(() => res.status(400).json({"message": `Could not find user ${username}`}))
  }
);


module.exports = router;