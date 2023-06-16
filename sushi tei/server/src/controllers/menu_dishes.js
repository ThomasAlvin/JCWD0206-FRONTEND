const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const menuDishesController = {
  getAll: async (req, res) => {
    try {
      const menuDishes = await db.MenuDishes.findAll();
      return res.send(menuDishes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const menuDishes = await db.MenuDishes.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(menuDishes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editMenuDishes: async (req, res) => {
    try {
      const { name, price, img_url, category_id, stock, best_seller } =
        req.body;
      await db.MenuDishes.update(
        {
          name,
          price,
          img_url,
          category_id,
          stock,
          best_seller,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.MenuDishes.findOne({
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
  insertMenuDishes: async (req, res) => {
    try {
      const { name, price, img_url, category_id, stock, best_seller } =
        req.body;
      await db.MenuDishes.create({
        name,
        price,
        img_url,
        category_id,
        stock,
        best_seller,
      });
      return await db.MenuDishes.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteMenuDishes: async (req, res) => {
    try {
      await db.MenuDishes.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.MenuDishes.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = menuDishesController;
