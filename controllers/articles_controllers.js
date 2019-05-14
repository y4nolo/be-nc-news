const { getAllArticles } = require("../models/articles_model");

exports.sendArticles = (req, res, next) => {
  getAllArticles()
    .then(articles => {
      return res.status(200).send({ articles });
    })
    .catch(err => {
      console.log(err);
    });
};
