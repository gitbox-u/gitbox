const {authenticate} = require('./validator');
const express = require('express');
const {getEntity, addRepo, getUserRepos} = require('../db');
const {registerRepo} = require('../git');
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
      if (!(entity.authorized.includes(req.params.id))) res.status(403).json({message: "Repo Access denied"});
      else res.status(200).json({message: "Hello, World!"})
    })
    .catch(res.status(500).json({message: "Repo Not found"}));
});

router.post("/add", (req, res) => {
  addRepo(req.body.uuid, req.query.name, req.query.remoteUrl, req.body.auth)
    .then(() => registerRepo(req.query.remoteUrl, req.body.auth))
    .then(() => res.status(200).json({message: "repo created"}))
    .catch(() => res.status(500).json({message: "error creating a repo"}))
});


module.exports = router;