const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const private_key = process.env.private_key;
const { nanoid } = require("nanoid");
const moment = require("moment");
const url = process.env.URL;
const urlVerify = process.env.URLverify;

const mailer = require("../lib/mailer");
const image_url = process.env.URL_IMAGE;
const sharp = require("sharp");
const { Op } = db.Sequelize;
const user = require("../models/users");
const userController = {
  verifyEmail: async (req, res) => {
    try {
      console.log(req.body);
      const { token } = req.query;
      const { id } = req.user;
      console.log(id);
      await db.User.update(
        {
          status: "verified",
        },
        {
          where: {
            id,
          },
        }
      );

      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );

      res.send({
        message: "Email Verified",
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const user = await db.User.findAll();
      return res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getByEmail: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.query.email,
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getByUsername: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          username: req.query.username,
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByRole: async (req, res) => {
    try {
      const user = await db.User.findAll({
        where: {
          role: req.query.role,
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByName: async (req, res) => {
    try {
      console.log(req.query);
      const search = req.query.search_query || "";
      const user = await db.User.findAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.like]: "%" + search + "%" } },
            { lastName: { [Op.like]: "%" + search + "%" } },
          ],
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      const { fullname, email, username, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      await db.User.create({
        fullname,
        email,
        username,
        password: hashPassword,
      });

      return res.send({
        message: "register berhasil",
        private_key,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.Us.findOne({
        where: {
          email,
        },
      });

      //    console.log(user);

      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const token = jwt.sign(payload, private_key, {
            expiresIn: "1h",
          });

          console.log(token);
          //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6InVkaW4yIiwiYWRkcmVzcyI6ImJhdGFtIiwicGFzc3dvcmQiOiIkMmIkMTAkWUkvcTl2dVdTOXQ0R1V5a1lxRGtTdWJnTTZwckVnRm9nZzJLSi9FckFHY3NXbXBRUjFOcXEiLCJlbWFpbCI6InVkaW4yQG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJDb21wYW55SWQiOm51bGwsImlhdCI6MTY4NDQ4MzQ4NSwiZXhwIjoxNjg0NDgzNTQ1fQ.Ye5l7Yml1TBWUgV7eUnhTVQjdT3frR9E0HXNxO7bTXw;

          return res.send({
            message: "login berhasil",
            value: user,
            token,
          });
        } else {
          throw new Error("wrong password");
        }
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },
  loginV2: async (req, res) => {
    try {
      const { emus, password } = req.body;
      const user = await db.User.findOne({
        where: {
          [Op.or]: {
            email: emus,
            username: emus,
          },
        },
      });

      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };

          const generateToken = nanoid();
          console.log(nanoid());
          const token = await db.Token.create({
            expired: moment().add(1, "days").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
          });

          console.log(token);
          //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6InVkaW4yIiwiYWRkcmVzcyI6ImJhdGFtIiwicGFzc3dvcmQiOiIkMmIkMTAkWUkvcTl2dVdTOXQ0R1V5a1lxRGtTdWJnTTZwckVnRm9nZzJLSi9FckFHY3NXbXBRUjFOcXEiLCJlbWFpbCI6InVkaW4yQG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJDb21wYW55SWQiOm51bGwsImlhdCI6MTY4NDQ4MzQ4NSwiZXhwIjoxNjg0NDgzNTQ1fQ.Ye5l7Yml1TBWUgV7eUnhTVQjdT3frR9E0HXNxO7bTXw;

          return res.send({
            message: "login berhasil",
            // value: user,
            token: token.dataValues.token,
          });
        } else {
          throw new Error("wrong password");
        }
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .send({ message: "Email or password is incorrect" });
    }
  },
  getByToken: async (req, res, next) => {
    try {
      let { token } = req.query;
      console.log(token);
      let payload = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });
      if (!payload) {
        throw new Error("token has expired");
      }
      console.log(payload.dataValues);
      let user = await db.User.findOne({
        where: {
          id: JSON.parse(payload.dataValues.payload).id,
        },
      });
      delete user.dataValues.password;

      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },
  getUserByToken: async (req, res) => {
    res.status(200).send(req.user);
  },
  generateTokenByEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              Status: "FORGOT-PASSWORD",
            },
          }
        );
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(60, "minutes").format(),
          token: generateToken,
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT-PASSWORD",
        });

        mailer({
          subject: "hello,",
          to: user.dataValues.email,
          text: url + token.dataValues.token,
        });

        return res.send({ message: "please check your email" });
      } else {
        throw new Error("user is not found");
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  generateTokenByEmailVerify: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              Status: "FORGOT-PASSWORD",
            },
          }
        );
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(60, "minutes").format(),
          token: generateToken,
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT-PASSWORD",
        });

        mailer({
          subject: "hello,",
          to: user.dataValues.email,
          text: urlVerify + token.dataValues.token,
        });

        return res.send({ message: "please check your email" });
      } else {
        throw new Error("user is not found");
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      console.log(req.body);
      const { token } = req.query;
      const { password } = req.body.user;
      const { id } = req.user;
      console.log(id);

      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );

      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );

      res.send({
        message: "password successfully updated",
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { fullname, username, pronouns, gender, bio } = req.body;
      await db.User.update(
        {
          fullname,
          username,
          pronouns,
          gender,
          bio,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).send({
        message: "your account has been updated",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await db.User.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.User.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },

  uploadAvatar: async (req, res) => {
    try {
      const { filename } = req.filename;
      await db.User.update(
        {
          avatar_url: image_url + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ),
        await db.User.findOne({
          where: {
            id: req.params.id,
          },
        }).then((result) => res.send(result));
    } catch (err) {}
  },
  uploadAvatarv2: async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize(25, 25)
        .png()
        .toBuffer();
      console.log(buffer);

      var fullUrl =
        req.protocol +
        "://" +
        req.get("host") +
        "/auth/image/render/" +
        req.params.id +
        "_" +
        Date.parse(new Date());
      console.log(fullUrl);
      await db.User.update(
        {
          avatar_url: fullUrl,
          avatar: buffer,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    } catch (err) {}

    // await db.User.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    // }).then((result) => res.send(result));
    res.send("berhasil upload");
  },
  renderAvatar: async (req, res) => {
    try {
      let { id } = req.params;
      // console.log(req.params.id);\
      id = id.toString().split("_")[0];
      console.log(id);
      await db.User.findOne({
        where: {
          id,
        },
      }).then((result) => {
        console.log(result.dataValues.avatar);

        res.set("Content-type", "image/png");
        res.send(result.dataValues.avatar);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
