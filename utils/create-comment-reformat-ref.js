const { createDateStringFromUnix } = require("./date-unix");

exports.formatComments = function(comments, article_ref) {
  const formatedComments = comments.map(
    ({ created_at, created_by, belongs_to, ...commentKeys }) => {
      return {
        created_at: createDateStringFromUnix(created_at),
        author: created_by,
        article_id: article_ref[belongs_to],

        ...commentKeys
      };
    }
  );

  return formatedComments;
};
