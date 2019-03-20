const authenticationRouter = function (app) {

  app.get("/api/login", function (req, res) {
    console.log(`${req.body.username} : ${req.body.password}`);
    res.status(200).json({message: "Hello, World!"})
  });

};

export {
  authenticationRouter
}