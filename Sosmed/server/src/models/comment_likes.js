module.exports = (sequelize, Sequelize) => {
  const CommentLike = sequelize.define("CommentLikes", {});
  return CommentLike;
};
