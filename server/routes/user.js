const {authenticate} = require('./validator');
const express = require('express');
const {getEntity, getUserRepos} = require('../db');
const router = express.Router();

router.use(authenticate);

router.get("/stats", (req, res) => {
  getEntity(req.body.uuid)
    .then((entity) => {
      if (!(entity.authorized.includes(req.params.id))) res.status(403).json({message: "Repo Access denied"});
      else res.status(200).json({message: "Hello, World!"})
    })
    .catch(res.status(500).json({message: "Repo Not found"}));
});

router.get("/calendar", (req, res) => {
  getEntity(req.body.uuid)
    .then((entity) => {
      if (!(entity.authorized.includes(req.params.id))) res.status(403).json({message: "Repo Access denied"});
      else res.status(200).json({message: "Hello, World!"})
    })
    .catch(res.status(500).json({message: "Repo Not found"}));
});

router.get("/repos", (req, res) => {
  console.log('gettherepos');
  getUserRepos(req.body.uuid)
    .then((repos) => {
      console.log(repos);
      res.status(200).json(repos)
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({message: 'error'});
    })

});


module.exports = router;