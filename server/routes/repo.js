const {authenticate, bodyHasParameters} = require('./validator');
const express = require('express');
const {getEntity, addRepo, getUserRepos} = require('../db');
const {registerRepo, pullRepo, refreshStats, getStats} = require('../git');
const router = express.Router();

router.use(authenticate);

router.get("/refresh/:id", (req, res) => {
  getEntity(req.body.uuid)
    .then((entity) => {
      if (!(entity.authorized.includes(req.params.id))) throw Error;
      // else return refreshStats(req.params.id)
    })
    .then(() => pullRepo(req.params.id))
    .then(() => refreshStats(req.params.id))
    .then(() => res.status(200).send())
    .catch(() => res.status(500).json({message: "Error"}));
});

router.get("/stats/:id", (req, res) => {
  getEntity(req.body.uuid)
    .then((entity) => {
      if (!(entity.authorized.includes(req.params.id))) throw Error;
      // else return refreshStats(req.params.id)
    })
    .then(() => getStats(req.params.id))
    .then(r => res.status(200).json(r))
    .catch(() => res.status(500).json({message: "Error"}));
});

router.post("/add", (req, res) => { // TODO: Assume authenticated, add to authorized repos
  if (req.body.name.length === 0) return res.status(400).send();
  addRepo(req.body.uuid, req.body.name, req.body.remoteUrl, req.body.auth)
    .then((repo) => registerRepo(repo))
    .then((repo) => refreshStats(repo.uuid))
    .then(() => res.status(200).json({message: "repo created"}))
    .catch((e) => {
      console.log(e);
      res.status(500).json({message: "error creating a repo"})
    })
});


router.post("/delete", 
  bodyHasParameters(["id"]),
  (req, res) => {
    const {id, uuid} = req.body;
    console.log(id, uuid);
    getEntity(uuid).update({$pull: {authorized: id}}).then(
      () => res.json({message: "Deleted"})
    ).catch(() => res.send({message: "Something went wrong"}))
  }
);

module.exports = router;