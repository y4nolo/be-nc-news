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

//endpoint to handle potential queries of topics - there is no sub router to topic!!! - does not need to be tested
// exports.topicNotFound = (req, res, next) => {
//   const { slug } = req.query;
//   Promise.all([checkTopicExists(slug)]).then(
//     [slug]
//       .then(([slug]) => {
//         if (!slug) {
//           return Promise.reject({ status: 404, msg: "Topic Not Found " });
//         } else return req.query;
//       })
//       .then(topics => {
//         res.status(200).send({ topics });
//       })
//       .catch(next)
//   );
// };

//endpoint to handle potential queries of articles ids

//endpoint to handle potential queries of comments belonging to articles

//endpoint to handle potential queries of users
