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

db.Category = require("./category")(sequelize, Sequelize);
db.Employee = require("./employee")(sequelize, Sequelize);
db.IngredientHistory = require("./ingredient_history")(sequelize, Sequelize);
db.Ingredient = require("./ingredient")(sequelize, Sequelize);
db.MenuDishes = require("./menu_dishes")(sequelize, Sequelize);
db.OrderDetail = require("./order_detail")(sequelize, Sequelize);
db.Order = require("./order")(sequelize, Sequelize);

db.MenuDishes.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "Category",
});
db.IngredientHistory.belongsTo(db.Ingredient, {
  foreignKey: "ingredient_id",
  as: "Ingredient",
});
db.OrderDetail.belongsTo(db.Order, {
  foreignKey: "order_number",
  as: "OrderNumber",
});
db.OrderDetail.belongsTo(db.MenuDishes, {
  foreignKey: "menu_dishes_id",
  as: "MenuDishes",
});

module.exports = db;
