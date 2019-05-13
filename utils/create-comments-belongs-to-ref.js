exports.addCommentsColumn = function(comments) {
  const reformattedBelongsTo = comments.map(({ belongs_to, commentKeys }) => {
    return {
      title: comments[belongs_to],
      ...commentKeys
    };
  });
  return reformattedBelongsTo;
};
