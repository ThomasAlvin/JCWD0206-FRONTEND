const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const ingredientController = {
  getAll: async (req, res) => {
    try {
      const ingredient = await db.Ingredient.findAll();
      return res.send(ingredient);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const ingredient = await db.Ingredient.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(ingredient);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editIngredient: async (req, res) => {
    try {
      const { name, status, stock } = req.body;
      await db.Ingredient.update(
        {
          name,
          status,
          stock,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Ingredient.findOne({
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
  insertIngredient: async (req, res) => {
    try {
      const { name, status, stock } = req.body;
      await db.Ingredient.create({
        name,
        status,
        stock,
      });
      return await db.Ingredient.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteIngredient: async (req, res) => {
    try {
      await db.Ingredient.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Ingredient.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = ingredientController;
