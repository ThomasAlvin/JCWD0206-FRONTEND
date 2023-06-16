const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const orderController = {
  getAll: async (req, res) => {
    try {
      const order = await db.Order.findAll();
      return res.send(order);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const order = await db.Order.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(order);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editOrder: async (req, res) => {
    try {
      const { order_number, date, total_price, table_no } = req.body;
      await db.Order.update(
        {
          order_number,
          date,
          total_price,
          table_no,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Order.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  insertOrder: async (req, res) => {
    try {
      const { order_number, date, total_price, table_no } = req.body;
      await db.Order.create({
        order_number,
        date,
        total_price,
        table_no,
      });
      return await db.Order.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await db.Order.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Order.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = orderController;
