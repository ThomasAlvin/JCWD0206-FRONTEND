module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    fullname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    bio: Sequelize.TEXT,
    avatar: Sequelize.BLOB("long"),
    avatar_url: Sequelize.TEXT,
    username: Sequelize.STRING,
    role: Sequelize.ENUM("Admin", "User"),
    gender: Sequelize.ENUM("Male", "Female"),
    status: Sequelize.ENUM("Verified", "Unverified"),
    pronouns: Sequelize.STRING,
  });
  return User;
};
