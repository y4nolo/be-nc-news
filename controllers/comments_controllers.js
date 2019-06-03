const { modifyCommentById } = require("../models/comments_model");
const { getComments } = require("../models/comments_model");
const { removeCommentById } = require("../models/comments_model");

exports.sendComments = (req, res, next) => {
  getComments()
    .then(comments => {
      if (comments.length > 0) return res.status(200).send({ comments });
      else return res.status(404).send({ msg: "Comments Not Found" });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  modifyCommentById({ ...req.body, ...req.params })
    .then(comments => {
      if ([comment_id] === "comments.comment_id")
        return res.status(200).send({
          comment: comments[0]
        });
      else return res.status(404).send({ msg: "Comment Not Found" });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  removeCommentById({ ...req.body, ...req.params })
    .then(numberOfDeletions => {
      if (numberOfDeletions > 0) res.sendStatus(204);
      else res.status(404).send({ msg: "Comment Not Found" });
    })
    .catch(next);
};
