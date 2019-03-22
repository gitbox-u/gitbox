const { authenticate } = require('./validator');
const express = require('express');
const router = express.Router();

router.use(authenticate)

router.get("/commiters/:id", (req, res) => {
  const {id} = req.body;
  res.status(200);
});

router.get("/repository/:id", (req, res) => {
  const {id} = req.body;
  console.log(id);
  res.status(200).send({id});
});


module.exports = router;