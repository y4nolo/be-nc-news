const { getTopics } = require("../models/topics_model");

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then(topics => {
      return res.status(200).send({ topics });
    })
    .catch(err => {
      console.log(err);
    });
};
