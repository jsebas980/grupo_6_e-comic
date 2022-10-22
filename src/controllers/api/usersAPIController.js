const path = require("path");
const db = require("../../database/models/");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

//---------------------------
//Dentro del usersAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const usersAPIController = {
  list: (req, res) => {
    db.usuario_model
      .findAll({
        attributes: { exclude: ["contraseña"] },
        include: [{ association: "pais" }, { association: "provincia" }],
      })
      .then((users) => {
        let respuesta = {
          meta: {
            status: 200,
            total: users.length,
            url: "api/users",
          },
          data: users,
        };
        res.json(respuesta);
      });
  },

  detail: (req, res) => {
    db.usuario_model.findByPk(req.params.id).then((user) => {
      let respuesta = {
        meta: {
          status: 200,
          total: user.length,
          url: "/api/users/:id",
        },
        data: user,
      };
      res.json(respuesta);
    });
  },
};

module.exports = usersAPIController;
