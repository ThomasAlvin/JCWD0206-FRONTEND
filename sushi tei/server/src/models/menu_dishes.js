module.exports = (sequelize, Sequelize) => {
  const MenuDishes = sequelize.define("Menu_Dishes", {
    // id: { Type:Sequelize.INTEGER, primaryKey: true },
    name: { type: Sequelize.STRING },
    price: { type: Sequelize.INTEGER },
    img_url: { type: Sequelize.TEXT("long") },
    category_id: { type: Sequelize.INTEGER },
    stock: { type: Sequelize.INTEGER },
    best_seller: { type: Sequelize.BOOLEAN },
    //         id integer [primary key]
    //   name varchar
    //   price integer
    //   imgurl varchar
    //   category_id integer
    //   stock integer
  });
  return MenuDishes;
};
