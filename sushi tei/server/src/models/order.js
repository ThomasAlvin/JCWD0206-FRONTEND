module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    order_number: { type: Sequelize.STRING, primaryKey: true },
    date: { type: Sequelize.DATE },
    total_price: { type: Sequelize.INTEGER },
    table_no: { type: Sequelize.INTEGER },

    //         id integer [primary key]
    //   name varchar
    //   price integer
    //   imgurl varchar
    //   category_id integer
    //   stock integer
  });
  return Order;
};
