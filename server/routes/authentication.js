const {bodyHasParameters} = require("./validator");
const router = require('express').Router();

const users = {
  // user: { uuid, pass, [ secrets ] }

};

router.post(
  "/login",
  bodyHasParameters(
    ["username", "password"],
  ),
  (req, res) => {
    const {username, password} = req.body;

  }
);


module.exports = router;