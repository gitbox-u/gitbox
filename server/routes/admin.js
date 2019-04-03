const {authenticateAdmin, bodyHasParameters} = require('./validator');
const express = require('express');
const {getAllUsers, updateUsername, removeUser} = require('../db/user');

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

router.post("/users/update/user", 
  bodyHasParameters(["oldUsername", "newUsername"]),
  (req, res) => {
    const {oldUsername, newUsername} = req.body;
    updateUsername(oldUsername, newUsername)
    .then(() => res.status(200).json({"message": `Username for user ${newUsername} changed`}))
    .catch(() => res.status(400).json({"message": `Could not find user ${oldUsername}`}))
  }
);

router.post("/users/remove/user",
  bodyHasParameters(["uuid"]),
  (req, res) => {
    console.log("hello!");
    const {uuid} = req.body;
    removeUser(uuid)
    .then(() => res.status(200).json({"message": "done"}));
  }
);


module.exports = router;