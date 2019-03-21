const { authenticate } = require('./validator');
const express = require('express');
const router = express.Router();

router.use(authenticate)

router.get("/api/repository/:id", (req, res) => {
  res.status(200).json({ id: req.body.id })
});


module.exports = router;