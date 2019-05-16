const {
  getAllArticles,
  getArticleById,
  modifyArticleById,
  getCommentsByArticleId,
  addCommentsByArticleId
} = require("../models/articles_model");

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

exports.sendArticlebyId = (req, res, next) => {
  getArticleById({ ...req.query, ...req.params })
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  modifyArticleById({ ...req.body, ...req.params, ...req.query })
    .then(articles => {
      res.status(200).send({ article: articles[0] });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  console.log(req.query);
  getCommentsByArticleId({ sort_by, order })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCommentByArticleId = (req, res, next) => {
  const { username, body } = req.body;
  addCommentsByArticleId({ ...req.body, ...req.params })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err);
    });
};
