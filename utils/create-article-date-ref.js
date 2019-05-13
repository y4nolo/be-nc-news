const { createDateStringFromUnix } = require("./date-unix");

exports.formatArticleDates = function(articles) {
  const formatedDateArticle = articles.map(({ created_at, ...articleKeys }) => {
    return {
      created_at: createDateStringFromUnix(created_at),
      ...articleKeys
    };
  });
  return formatedDateArticle;
};
