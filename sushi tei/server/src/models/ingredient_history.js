module.exports = (sequelize, Sequelize) => {
  const IngredientHistory = sequelize.define("Ingredient_History", {
    name: { type: Sequelize.STRING },
    position: { type: Sequelize.STRING },
    date_and_time: { type: Sequelize.DATE },
    stockin: { type: Sequelize.INTEGER },
    stockout: { type: Sequelize.INTEGER },
    total_aftermath: { type: Sequelize.INTEGER },
    ingredient_id: { type: Sequelize.INTEGER },
    //         id integer [primary key]
    //   name varchar
    //   price integer
    //   imgurl varchar
    //   category_id integer
    //   stock integer
  });
  return IngredientHistory;
};
