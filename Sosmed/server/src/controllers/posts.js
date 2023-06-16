const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const sharp = require("sharp");
const { nanoid, customAlphabet } = require("nanoid");
const postController = {
  getAll: async (req, res) => {
    try {
      const Post = await db.Post.findAll();
      return res.send(Post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const Post = await db.Post.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(Post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getByUserId: async (req, res) => {
    try {
      const Post = await db.Post.findAll({
        where: {
          userId: req.params.id,
        },
      });
      return res.send(Post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },

  editPost: async (req, res) => {
    try {
      const { date, quantity, activity } = req.body;
      await db.Post.update(
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

      return await db.Post.findOne({
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
  insertPost: async (req, res) => {
    try {
      const generateTokens = customAlphabet(
        "1234567890abcdefghijklmnopqrstuvwxyz",
        10
      );
      const generateToken = generateTokens();

      const buffer = await sharp(req.file.buffer)
        .resize(250, 250)
        .png()
        .toBuffer();
      console.log(buffer);

      const { title, caption, status, userId } = req.body;
      var fullUrl =
        req.protocol +
        "://" +
        req.get("host") +
        "/post/image/render/" +
        generateToken +
        "_" +
        Date.parse(new Date());
      console.log(fullUrl);
      await db.Post.create({
        userId,
        title,
        caption,
        status,
        media: buffer,
        media_url: fullUrl,
        token: generateToken,
      });
      return await db.Post.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  renderPostImage: async (req, res) => {
    try {
      let { token } = req.params;
      // console.log(req.params.id);\
      token = token.toString().split("_")[0];

      await db.Post.findOne({
        where: {
          token,
        },
      }).then((result) => {
        console.log(result);
        res.set("Content-type", "image/png");
        res.send(result.dataValues.media);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: err.message,
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      await db.Post.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Post.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = postController;
