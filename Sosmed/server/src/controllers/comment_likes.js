const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const commentLikeController = {
  getAll: async (req, res) => {
    try {
      const CommentLike = await db.CommentLike.findAll();
      return res.send(CommentLike);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const CommentLike = await db.CommentLike.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(CommentLike);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editCommentLike: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.CommentLike.update(
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

      return await db.CommentLike.findOne({
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
  insertCommentLike: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.CommentLike.create({
        date,
        quantity,
        activity,
      });
      return await db.CommentLike.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteCommentLike: async (req, res) => {
    try {
      await db.CommentLike.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.CommentLike.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = commentLikeController;
