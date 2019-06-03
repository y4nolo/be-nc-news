const {
  getAllArticles,
  getArticleById,
  modifyArticleById,
  getCommentsByArticleId,
  addCommentsByArticleId
} = require("../models/articles_model");

exports.sendArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  getAllArticles(sort_by, order, author, topic)
    .then(articles => {
      if (articles.length > 0) return res.status(200).send({ articles });
      else return res.status(404).send({ msg: "Articles Not Found" });
    })
    .catch(next);
};

exports.sendArticlebyId = (req, res, next) => {
  const { article_id } = req.params;

  getArticleById({ ...req.query, ...req.params })
    .then(article => {
      if (!article) {
        return next({ code: 4041 });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  modifyArticleById(article_id, inc_votes)
    .then(article => {
      if (!article.article) {
        return next({ code: 4002 });
      }
      res.status(200).send(article);
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  getCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const author = username;
  const newComment = { author, body, article_id };
  addCommentsByArticleId(newComment)
    .then(([comment]) => {
      if (!comment.body.length) {
        return next({ code: 4003 });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};
