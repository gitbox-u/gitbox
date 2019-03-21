const router = require('express').Router();

router.get("/commiters/:id", (req, res) => {
  res.status(200).json({message: "Hello, World!"})
});

router.get("/repodata/:id", (req, res) => {
  console.log(`${req.body.username} : ${req.body.password}`);
  res.status(200).json({message: "Hello, World!"})
});



module.exports = router;