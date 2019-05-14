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

/*
// ./models/films.js
const connection = require('../db/connection');
exports.fetchFilms = ({ sort_by }) =>
{return connection.select('title','year_of_release','duration','plot','rating','name AS director')
.from('films')
.join('films.director_id', '=', 'directors.director_id')
.orderBy(sort_by || 'title', 'asc');}; */
