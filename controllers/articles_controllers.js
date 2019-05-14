const { getAllArticles } = require("../models/articles_model");

exports.sendArticles = (req, res, next) => {
  const { sort_by } = req.query;

  getAllArticles(sort_by)
    .then(articles => {
      return res.status(200).send({ articles });
    })
    .catch(err => {
      console.log(err);
    });
};

function addTwo(a) {
  return a + 2;
}
