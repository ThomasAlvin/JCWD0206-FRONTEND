module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define("Order_Details", {
    order_number: { type: Sequelize.STRING, primaryKey: true },
    menu_dishes_id: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
    price: { type: Sequelize.INTEGER },
    status: { type: Sequelize.STRING },

    //         id integer [primary key]
    //   name varchar
    //   price integer
    //   imgurl varchar
    //   category_id integer
    //   stock integer
  });
  return OrderDetails;
};
