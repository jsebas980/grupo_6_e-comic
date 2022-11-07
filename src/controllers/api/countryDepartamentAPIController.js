const path = require("path");
const dbd = require("../../database/models");
const sequelize = dbd.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

//---------------------------
//Dentro del countryDepartamentAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const countryDepartamentAPIController = {
  listCountry: (req, res) => {
    dbd.pais_model
      .findAll()
      .then((country) => {
        let respuesta = {
          meta: {
            status: 200,
            total: country.length,
            url: "api/countryApi",
          },
          data: country,
        };
        res.json(respuesta);
      });
  },

  listDepartament: (req, res) => {
    dbd.provincia_model
      .findAll()
      .then((departament) => {
        let respuesta = {
          meta: {
            status: 200,
            total: departament.length,
            url: "api/departamentApi",
          },
          data: departament,
        };
        res.json(respuesta);
      });
  },

};

module.exports = countryDepartamentAPIController;
