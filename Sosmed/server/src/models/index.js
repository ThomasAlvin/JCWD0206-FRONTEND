"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Comment = require("./comments")(sequelize, Sequelize);
db.CommentLike = require("./comment_likes")(sequelize, Sequelize);
db.Like = require("./likes")(sequelize, Sequelize);
db.Post = require("./posts")(sequelize, Sequelize);
db.User = require("./users")(sequelize, Sequelize);
db.Token = require("./tokens")(sequelize, Sequelize);
db.Comment.belongsTo(db.Post, {
  foreignKey: "postId",
  // as: "Category",
});
db.Comment.belongsTo(db.User, {
  foreignKey: "userId",
  // as: "Category",
});
db.CommentLike.belongsTo(db.CommentLike, {
  foreignKey: "commentId",
});

db.Like.belongsTo(db.Post, {
  foreignKey: "postId",
});
db.Post.belongsTo(db.User, {
  foreignKey: "userId",
});
db.CommentLike.belongsTo(db.User, {
  foreignKey: "commentLikeId",
});
db.Like.belongsTo(db.User, {
  foreignKey: "userId",
});

module.exports = db;
