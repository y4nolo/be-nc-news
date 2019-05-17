//just added

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.badrequest = (err, req, res, next) => {
  if (err.code === 42703) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
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
