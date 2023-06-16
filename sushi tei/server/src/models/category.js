module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Category", {
    name: { type: Sequelize.STRING },

    //         id integer [primary key]
    //   name varchar
    //   price integer
    //   imgurl varchar
    //   category_id integer
    //   stock integer
  });
  return Category;
};
