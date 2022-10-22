const path = require("path");
const dbp = require("../../database/models/");
const sequelize = dbp.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

//---------------------------
//Dentro del productsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const productsAPIController = {
  list: (req, res) => {
    dbp.productos_model
      .findAll({
        include: [
          { association: "paisproductos" },
          { association: "categorias" },
        ],
      })
      .then((products) => {
        let respuesta = {
          meta: {
            status: 200,
            total: products.length,
            url: "api/products",
          },
          data: products,
        };
        res.json(respuesta);
      });
  },

  detail: (req, res) => {
    dbp.productos_model.findByPk(req.params.id).then((product) => {
      let respuesta = {
        meta: {
          status: 200,
          total: product.length,
          url: "/api/products/:id",
        },
        data: product,
      };
      res.json(respuesta);
    });
  },
};

module.exports = productsAPIController;
