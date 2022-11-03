// ? Variables y Requiere
const { validationResult } = require("express-validator");
const dbd = require("../database/models");
const sequelize = dbd.sequelize;
//console.log(sequelize.models.factura_model.findByPk(8));

const billController = {
  // ! CRUD de los facturas
  listCRUD: async (req, res) => {
    dbd.factura_model
      .findAll({
        include: [
          { association: "estadofactura" },
          { association: "modopagofactura" },
          { association: "usuariofactura" },
        ],
      })
      .then((facturaCrud) => {
        return res.render("bills/billListcrud", { facturaCrud });
      });
  },

  billDetailCRUD: async (req, res) => {
    dbd.factura_model.findByPk(req.params.id).then((facturaCrud) => {
      return res.render("bills/billDetailcrud", { facturaCrud });
    });
  },

  billCreateCRUD: async (req, res) => {
    let promEstado = dbd.estado_factura_model.findAll();
    let promModoPago = dbd.modo_pago_model.findAll();
    let promPais = dbd.pais_model.findAll();
    let promProvincia = dbd.provincia_model.findAll();
    Promise.all([promEstado, promModoPago, promPais, promProvincia])
      .then(function ([promEstado, promModoPago, promPais, promProvincia]) {
        return res.render("bills/billLoadCRUD", {
          promEstado: promEstado,
          promModoPago: promModoPago,
          promPais: promPais,
          promProvincia: promProvincia,
        });
      })
      .catch((error) => res.send(error));
  },

  createCRUD: function (req, res) {
    const resultValidation = validationResult(req);
    //console.log(req.body);
    //console.log(resultValidation);
    const alert = resultValidation.array();
    if (resultValidation.errors.length > 0) {
      return res.render("bills/billLoadCRUD", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        alert
      });
    } else {
      dbd.factura_model.create({
        id_usuario: req.body.id_usuario,
        id_estadofactura: req.body.id_estadofactura,
        envio: req.body.envio,
        impuesto: req.body.impuesto,
        total: req.body.total,
        id_modopago: req.body.id_modopago,
        fecha: req.body.fecha,
        nombrecompleto: req.body.nombrecompleto,
        correoelectronico: req.body.correoelectronico,
        direccion: req.body.direccion,
        numerotelefono: req.body.numerotelefono,
        id_pais: req.body.id_pais,
        id_provincia: req.body.id_provincia,
        ciudad: req.body.ciudad,
        detalleadicionales: req.body.detalleadicionales,
      });
      return res.redirect("/");
    }
  },

  editCRUD: function (req, res) {
    let promEstado = dbd.estado_factura_model.findAll();
    let promModoPago = dbd.modo_pago_model.findAll();
    let promPais = dbd.pais_model.findAll();
    let promProvincia = dbd.provincia_model.findAll();
    let facturaCrud = dbd.factura_model.findByPk(req.params.id);
    Promise.all([promEstado, promModoPago, promPais, promProvincia, facturaCrud])
      .then(function ([promEstado, promModoPago, promPais, promProvincia, facturaCrud]) {
        return res.render("bills/billEditcrud", {
          promEstado: promEstado,
          promModoPago: promModoPago,
          promPais: promPais,
          promProvincia: promProvincia,
          facturaCrud: facturaCrud,
          oldData: facturaCrud,
        });
      })
      .catch((error) => res.send(error));
  },

  updateCRUD: function (req, res) {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      dbd.factura_model
        .findByPk(req.params.id)
        .then((facturaCrud) => {
          //console.log(facturaCrud);
          //console.log(req.body);
          //console.log(resultValidation);
          const alert = resultValidation.array();
          return res.render("bills/billEditcrud", {
            facturaCrud,
            errors: resultValidation.mapped(),
            oldData: req.body,
            alert
          });
        })
        .catch((error) => res.send(error));
    } else {
      dbd.factura_model
        .update(
          {
            id_usuario: req.body.id_usuario,
            id_estadofactura: req.body.id_estadofactura,
            envio: req.body.envio,
            impuesto: req.body.impuesto,
            total: req.body.total,
            id_modopago: req.body.id_modopago,
            fecha: req.body.fecha,
            nombrecompleto: req.body.nombrecompleto,
            correoelectronico: req.body.correoelectronico,
            direccion: req.body.direccion,
            numerotelefono: req.body.numerotelefono,
            id_pais: req.body.id_pais,
            id_provincia: req.body.id_provincia,
            ciudad: req.body.ciudad,
            detalleadicionales: req.body.detalleadicionales,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => res.send(error));
    }
  },
};

module.exports = billController;
