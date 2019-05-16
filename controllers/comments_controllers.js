const { modifyCommentById } = require("../models/comments_model");
const { getComments } = require("../models/comments_model");
const { removeCommentById } = require("../models/comments_model");

exports.sendComments = (req, res, next) => {
  getComments()
    .then(comments => {
      return res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.patchCommentById = (req, res, next) => {
  modifyCommentById({ ...req.body, ...req.params })
    .then(comments => {
      res.status(200).send({ comment: comments[0] });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  removeCommentById({ ...req.body, ...req.params })
    .then(comments => {
      res.status(204).send({ comment: comments[0] });
    })
    .catch(err => {
      console.log(err);
    });
};
