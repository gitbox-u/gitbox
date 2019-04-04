const {authenticateAdmin, bodyHasParameters} = require('./validator');
const express = require('express');
const {getAllUsers, updateUser, removeUser} = require('../db/user');

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

router.post("/users/change", 
  bodyHasParameters(["uuid_change", "new_username"]),
  (req, res) => {
    const {uuid_change, new_username} = req.body;
    updateUser(uuid_change, {user: new_username})
    .then(() => res.status(200).json({"message": `Username for user ${uuid_change} changed`}))
    .catch(() => res.status(400).json({"message": `Could not find user ${uuid_change}`}))
  }
);

router.post("/users/remove",
  bodyHasParameters(["uuid_delete"]),
  (req, res) => {
    const {uuid_delete} = req.body;
    removeUser(uuid_delete)
    .then(() => res.status(200).json({"message": `User ${uuid_delete} deleted`}));
  }
);

router.post("/users/promote",
  bodyHasParameters(["uuid_promote", "admin"]),
  (req, res) => {
    const {uuid_promote, admin} = req.body;
    updateUser(uuid_promote, {admin})
    .then(() => res.status(200).json({"message": `${uuid_promote} ${admin ? "promoted" : "demoted"} to ${admin ? "admin" : "regular user"}`}))
    .catch(() => res.status(400).json({"message": `Could not find user ${uuid_promote}`}))
  }
);


module.exports = router;