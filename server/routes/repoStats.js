const { authenticate } = require('./validator');
const express = require('express');
const {getEntity} = require('../db');
const router = express.Router();

router.use(authenticate);

router.get("/commiters/:id", (req, res) => {
  getEntity(req.body.uid)
    .then((entity) => {
      if(!(entity.authorized.includes(req.params.id ))) res.status(403).json({message: "Repo Access denied"});
      res.status(200).json({message: "Hello, World!"})
    })
    .catch(res.status(500).json({message: "Repo Not found"}));
});

router.get("/api/stats/:id", (req, res) => {
  getEntity(req.body.uid)
    .then((entity) => {
      if(!(entity.authorized.includes(req.params.id ))) res.status(403).json({message: "Repo Access denied"});
      res.status(200).json({message: "Hello, World!"})
    })
    .catch(res.status(500).json({message: "Repo Not found"}));
});


module.exports = router;