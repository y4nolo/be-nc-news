exports.createArticleRef = function(articles) {
  return articles.reduce(function(acc, article) {
    acc[article.title] = article.article_id;
    return acc;
  }, {});
};
