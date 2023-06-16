const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const likeController = {
  getAll: async (req, res) => {
    try {
      const Like = await db.Like.findAll();
      return res.send(Like);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const Like = await db.Like.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(Like);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getLikeTotalByPostId: async (req, res) => {
    try {
      const Like = await db.Like.findAndCountAll({
        include: [
          {
            model: db.Post,
            attributes: [],
            where: {
              id: req.params.postid,
            },
          },
        ],
      });
      return res.send(Like);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editLike: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.Like.update(
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

      return await db.Like.findOne({
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
  insertLike: async (req, res) => {
    try {
      const { postId, userId, liked } = req.body;
      const match = await db.Like.findOne({
        where: {
          postId,
          userId,
        },
      });
      if (match) {
        await db.Like.update(
          {
            liked,
            postId,
            userId,
          },
          {
            where: {
              postId,
              userId,
            },
          }
        );
        return await db.Like.findAll().then((result) => {
          res.send(result);
        });
      } else {
        await db.Like.create({
          liked,
          postId,
          userId,
        });
        return await db.Like.findAll().then((result) => {
          res.send(result);
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteLike: async (req, res) => {
    try {
      await db.Like.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Like.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = likeController;
