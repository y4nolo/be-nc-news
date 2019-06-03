const { getTopics } = require("../models/topics_model");

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then(topics => {
      if (topics.length > 0) return res.status(200).send({ topics });
      else return res.status(404).send({ msg: "Articles Not Found" });
    })

    .catch(next);
};
