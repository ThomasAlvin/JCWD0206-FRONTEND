module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("Employee", {
    name: { type: Sequelize.STRING },
    position: { type: Sequelize.STRING },
    worktime_start: { type: Sequelize.DATE },
    worktime_end: { type: Sequelize.DATE },
    address: { type: Sequelize.STRING },
    phone_number: { type: Sequelize.STRING },
    salary: { type: Sequelize.INTEGER },
    gender: { type: Sequelize.ENUM("Male,Female") },
    //         id integer [primary key]
    //   name varchar
    //   price integer
    //   imgurl varchar
    //   category_id integer
    //   stock integer
  });
  return Employee;
};
