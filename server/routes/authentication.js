const { bodyHasParameters } = require("./validator");

const users = {
  // user: { uuid, pass, [ secrets ] }

}


const authenticationRouter = (app) => {

  app.post(
    "/api/login",
    bodyHasParameters(
      [ "username", "password" ],
    ),
    (req, res) => {
      const { username, password } = req.body;

    }
  );

};

module.exports = {
  authenticationRouter
}