const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const ingredientHistoryController = {
  getAll: async (req, res) => {
    try {
      const ingredientHistory = await db.IngredientHistory.findAll();
      return res.send(ingredientHistory);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const ingredientHistory = await db.IngredientHistory.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(ingredientHistory);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editIngredientHistory: async (req, res) => {
    try {
      const {
        name,
        position,
        date_and_time,
        stockin,
        stockout,
        total_aftermath,
        ingredient_id,
      } = req.body;
      await db.IngredientHistory.update(
        {
          name,
          position,
          date_and_time,
          stockin,
          stockout,
          total_aftermath,
          ingredient_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.IngredientHistory.findOne({
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
  insertIngredientHistory: async (req, res) => {
    try {
      const {
        name,
        position,
        date_and_time,
        stockin,
        stockout,
        total_aftermath,
        ingredient_id,
      } = req.body;
      await db.IngredientHistory.create({
        name,
        position,
        date_and_time,
        stockin,
        stockout,
        total_aftermath,
        ingredient_id,
      });
      return await db.IngredientHistory.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteIngredientHistory: async (req, res) => {
    try {
      await db.IngredientHistory.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.IngredientHistory.findAll().then((result) =>
        res.send(result)
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = ingredientHistoryController;
