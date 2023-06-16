module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comments", {
    comment: Sequelize.STRING,
    date: Sequelize.DATE,
  });
  return Comment;
};
