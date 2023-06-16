module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Posts", {
    title: Sequelize.STRING,
    caption: Sequelize.STRING,
    status: Sequelize.ENUM(""),
    media: Sequelize.BLOB("long"),
    media_url: Sequelize.TEXT,
    token: Sequelize.STRING,
  });
  return Post;
};
