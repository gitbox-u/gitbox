const { authenticate } = require('./validator');
const express = require('express');
const {getEntity} = require('../db')
const router = express.Router();

router.use(authenticate);

router.get("/commiters/:id", (req, res) => {
  const entity = getEntity(req.body.uid);
  if(!entity) res.status(404).json({message: "Repo not found :( "});
  if(!(req.params.id in entity.authorized)) res.status(403).json({message: "Repo Access denied"});

  res.status(200).json({message: "Hello, World!"})
});

router.get("/api/stats/:id", (req, res) => {
  res.status(200).json({ id: req.body.uid })
});


module.exports = router;