const connection = require("../db/connection");

exports.getAllArticles = (
  sort_by = "created_at",
  order = "asc",
  author,
  topic
) => {
  return connection("articles")
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
    .orderBy(`articles.${sort_by}`, `articles.${order}`)
    .modify(query => {
      if (topic) query.where({ "articles.topic": topic });
      if (author) query.where({ "articles.author": author });
    });
};

exports.getArticleById = ({
  sort_by = "created_at",
  order = "asc",
  article_id
}) => {
  return connection("articles")
    .select(
      "articles.article_id",
      "articles.author",
      "articles.title",
      "articles.topic",
      "articles.votes",
      "articles.created_at",
      "articles.body"
    )
    .from("articles")
    .count({ comment_count: "articles.article_id" }, article_id)
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .first();
};

exports.modifyArticleById = (article_id, inc_votes = 0) => {
  return connection("articles")
    .where("articles.article_id", "=", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(([value]) => {
      const article = { article: value };
      return article;
    });
};

exports.getCommentsByArticleId = (article_id, sort_by, order) => {
  return connection("comments")
    .select(
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by || "comments.created_at", order || "desc");
};

exports.addCommentsByArticleId = newComment => {
  return connection("comments")
    .where("comments.article_id", "=", [article_id])
    .insert(newComment)
    .returning("*")
    .modify(query => {
      if ([article_id]) query.where("comments.article_id", "=", [article_id]);
    });
};
/* ./models/films.js
const connection = require('../db/connection');
exports.fetchFilms = ({ sort_by }) => {
  return connection.select('title', 'year_of_release', 'duration', 'plot', 'rating', 'name AS director')
    .from('films')
    .join('films.director_id', '=', 'directors.director_id')
    .orderBy(sort_by || 'title', 'asc');
}; */
