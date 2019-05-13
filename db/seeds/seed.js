const {
  articleData,
  commentData,
  topicData,
  userData
} = require("../data/index");

const { formatArticleDates } = require("../../utils/create-article-date-ref");
const { formatComments } = require("../../utils/create-comment-reformat-ref");
const {
  addCommentsColumn
} = require("../../utils/create-comments-belongs-to-ref");
const {
  createArticleRef
} = require("../../utils/create-comment-article-id-ref");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(topicData)
        .into("topics")
        .returning("*");
    })
    .then(topics => {
      return knex
        .insert(userData)
        .into("users")
        .returning("*");
    })
    .then(users => {
      const formattedArticleDates = formatArticleDates(articleData);
      return knex
        .insert(formattedArticleDates)
        .into("articles")
        .returning("*");
    })
    .then(articles => {
      const article_ref = createArticleRef(articles);
      const formattedComment = formatComments(commentData, article_ref);
      return knex
        .insert(formattedComment)

        .into("comments")
        .returning("*");
    });
};
