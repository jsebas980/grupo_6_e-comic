const path = require("path");
const dbd = require("../../database/models/");
const sequelize = dbd.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

//---------------------------
//Dentro del billsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const billsAPIController = {
  list: (req, res) => {
    dbd.factura_model
      .findAll({
        include: [
          { association: "estadofactura" },
          { association: "modopagofactura" },
          { association: "usuariofactura" },
        ],
      })
      .then((bills) => {
        let respuesta = {
          meta: {
            status: 200,
            total: bills.length,
            url: "api/bills",
          },
          data: bills,
        };
        res.json(respuesta);
      });
  },

  detail: (req, res) => {
    dbd.factura_model.findByPk(req.params.id).then((bill) => {
      let respuesta = {
        meta: {
          status: 200,
          total: bill.length,
          url: "/api/bills/:id",
        },
        data: bill,
      };
      res.json(respuesta);
    });
  },
};

module.exports = billsAPIController;
