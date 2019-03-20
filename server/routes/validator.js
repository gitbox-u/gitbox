// params: [ "a", "b" ]
const bodyHasParameters = (params) => {
  return (req, res, next) => {
    const { body } = req;

    console.log(body);

    if (body === undefined) {
      res.status(400).json({ message: "Request to this endpoint requires a body" });
      return;
    } else {
      for (let key of params) {
        if (!(key in body)) {
          res.status(400).json({ message: `Request to this endpoint requires parameters: ${params}, but is missing ${key}` });
          return;
        }
      }
    }

    next();
  }
};

module.exports = { bodyHasParameters };