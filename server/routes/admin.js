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
  bodyHasParameters(["uuid_change", "new_username"]),
  (req, res) => {
    const {uuid_change, new_username} = req.body;
    updateUsername(uuid_change, new_username)
    .then(() => res.status(200).json({"message": `Username for user ${new_username} changed`}))
    .catch(() => res.status(400).json({"message": `Could not find user ${uuid_change}`}))
  }
);

router.post("/users/remove/user",
  bodyHasParameters(["uuid_delete"]),
  (req, res) => {
    const {uuid_delete} = req.body;
    removeUser(uuid_delete)
    .then(() => res.status(200).json({"message": "done"}));
  }
);


module.exports = router;