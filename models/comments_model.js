const connection = require("../db/connection");

exports.getComments = () => {
  return connection.select("*").from("comments");
};

exports.modifyCommentById = ({ comment_id, inc_votes = 0 }) => {
  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*");
};

exports.removeCommentById = ({ comment_id }) => {
  return connection("comments")
    .where({ comment_id }, true)
    .del();
};

// connection("comments")
//   // .modify(query => {
//   //   if ({ comment_id })
//   //     query.where("comments.comment_id", "=", { comment_id });
//   // })
//   .where("comment_id", comment_id)
//   .del()
