const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const orderDetailController = {
  getAll: async (req, res) => {
    try {
      const orderDetail = await db.OrderDetail.findAll();
      return res.send(orderDetail);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const orderDetail = await db.OrderDetail.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(orderDetail);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editOrderDetail: async (req, res) => {
    try {
      const { order_number, menu_dishes_id, quantity, price, status } =
        req.body;
      await db.OrderDetail.update(
        {
          order_number,
          menu_dishes_id,
          quantity,
          price,
          status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.OrderDetail.findOne({
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
  insertOrderDetail: async (req, res) => {
    try {
      const { order_number, menu_dishes_id, quantity, price, status } =
        req.body;
      await db.OrderDetail.create({
        order_number,
        menu_dishes_id,
        quantity,
        price,
        status,
      });
      return await db.OrderDetail.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteOrderDetail: async (req, res) => {
    try {
      await db.OrderDetail.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.OrderDetail.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = orderDetailController;
