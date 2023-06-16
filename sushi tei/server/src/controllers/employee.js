const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const employeeController = {
  getAll: async (req, res) => {
    try {
      const employee = await db.Employee.findAll();
      return res.send(employee);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const employee = await db.Employee.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(employee);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editEmployee: async (req, res) => {
    try {
      const {
        name,
        position,
        worktime_start,
        worktime_end,
        address,
        phone_number,
        salary,
        gender,
      } = req.body;
      await db.Employee.update(
        {
          name,
          position,
          worktime_start,
          worktime_end,
          address,
          phone_number,
          salary,
          gender,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Employee.findOne({
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
  insertEmployee: async (req, res) => {
    try {
      const {
        name,
        position,
        worktime_start,
        worktime_end,
        address,
        phone_number,
        salary,
        gender,
      } = req.body;
      await db.Employee.create({
        name,
        position,
        worktime_start,
        worktime_end,
        address,
        phone_number,
        salary,
        gender,
      });
      return await db.Employee.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      await db.Employee.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Employee.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = employeeController;
