exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

//app.use(err,req,res,next) - takes to next piece of error handling middleware

//204 - deletes specified house removes all associated students from the db

// 400 - responsds with bad request e.g. trying to delete a 'house with a nonsense string/invalid ID format instead of numerical house ID
// - beware promise can be rejected - and goes to .then and catch before error handling (throws an error instead of going to error handling)
