module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING },
    stock: { type: Sequelize.INTEGER },

    //         id integer [primary key]
    //   name varchar
    //   price integer
    //   imgurl varchar
    //   category_id integer
    //   stock integer
  });
  return Ingredient;
};
