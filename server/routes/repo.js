const {authenticate} = require('./validator');
const express = require('express');
const {getEntity, addRepo, getUserRepos} = require('../db');
const {registerRepo, refreshStats, getStats} = require('../git');
const router = express.Router();

router.use(authenticate);

router.get("/commiters/:id", (req, res) => {
  getEntity(req.body.uuid)
    .then((entity) => {
      if (!(entity.authorized.includes(req.params.id))) res.status(403).json({message: "Repo Access denied"});
      else res.status(200).json({message: "Hello, World!"})
    })
    .catch(res.status(500).json({message: "Invalid User"}));
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


module.exports = router;