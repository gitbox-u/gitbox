const express = require('express');
const router = express.Router();


router.get("/api/repository/:id", function (req, res) {
  console.log(`${req.body.username} : ${req.body.password}`);
  res.status(200).json({message: "Hello, World!"})
});


module.export = router;