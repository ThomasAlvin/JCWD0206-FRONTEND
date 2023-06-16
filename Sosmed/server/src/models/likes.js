module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("Likes", {
    liked: Sequelize.BOOLEAN,
  });
  return Like;
};
