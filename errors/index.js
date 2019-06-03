exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handleSQLErrors = (err, req, res, next) => {
  const codes = {
    "22P02": "id must be type integer",
    "42703": "query input does not exist",
    "23503": "article not found"
  };
  if (codes[err.code]) {
    if (err.code === "23503") {
      res.status(404).send({ msg: codes[err.code] });
    } else {
      res.status(400).send({ msg: codes[err.code] });
    }
  } else next(err);
};

exports.badrequest = (err, req, res, next) => {
  console.log(err);
  res.status(400).send({ msg: "Bad Request" });
  next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
  next(err);
};
exports.routeNotFound = (err, req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
};
