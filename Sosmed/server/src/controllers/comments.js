const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const commentController = {
  getAll: async (req, res) => {
    try {
      const Comment = await db.Comment.findAll();
      return res.send(Comment);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const Comment = await db.Comment.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(Comment);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editComment: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.Comment.update(
        {
          date,
          quantity,
          activity,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Comment.findOne({
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
  insertComment: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.Comment.create({
        date,
        quantity,
        activity,
      });
      return await db.Comment.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteComment: async (req, res) => {
    try {
      await db.Comment.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Comment.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = commentController;
