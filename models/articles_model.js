const connection = require("../db/connection");

exports.getAllArticles = (sort_by = "created_at") => {
  return connection
    .select(
      "articles.article_id",
      "articles.author",
      "title",
      "topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")

    .count({ comment_count: "articles.article_id" })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(`articles.${sort_by}`, "asc");
};

/* ./models/films.js
const connection = require('../db/connection');
exports.fetchFilms = ({ sort_by }) => {
  return connection.select('title', 'year_of_release', 'duration', 'plot', 'rating', 'name AS director')
    .from('films')
    .join('films.director_id', '=', 'directors.director_id')
    .orderBy(sort_by || 'title', 'asc');
}; */

exports.getArticleById = ({ article_id }) => {
  return connection
    .select(
      "articles.article_id",
      "articles.author",
      "title",
      "topic",
      "articles.votes",
      "articles.created_at",
      "articles.body"
    )
    .from("articles")
    .modify(query => {
      if (article_id) query.where({ "articles.article_id": article_id });
    })
    .count({ comment_count: "articles.article_id" })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .first();
};

exports.modifyArticleById = ({ article_id, inc_votes = 0 }) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", inc_votes)
    .returning("*");
};

exports.getCommentsByArticleId = ({
  article_id,
  sort_by = "created_at",
  order = "created_at"
}) => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .modify(query => {
      if (article_id) query.where("comments.article_id", "=", article_id);
    })
    .orderBy(sort_by || "created_at", "desc")
    .orderBy(`comments.${order}`, "desc");
};

exports.addCommentsByArticleId = ({ article_id, username, body }) => {
  return connection("comments")
    .where("comments.article_id", "=", article_id)
    .insert({ author: username, body: body })
    .returning("*");
};
