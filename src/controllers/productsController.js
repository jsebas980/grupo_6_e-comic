// ? Variables y Requiere
const { validationResult } = require("express-validator");
const dbp = require("../database/models/");
//const sequelize = dbp.sequelize;

const productController = {
  /*** Muestra el carrito de compra de un producto ***/
  productCart: (req, res) => {
    res.render("products/productCart");
  },

  // ! CRUD de los productos
  listCRUD: async (req, res) => {
    dbp.productos_model
      .findAll({
        include: [
          { association: "paisproductos" },
          { association: "categorias" },
        ],
      })
      .then((productoCrud) => {
        return res.render("products/productListcrud", { productoCrud });
      });
  },

  productDetailCRUD: async (req, res) => {
    dbp.productos_model.findByPk(req.params.id).then((productoCrud) => {
      return res.render("products/productDetailcrud", { productoCrud });
    });
  },

  productCreateCRUD: async (req, res) => {
    let promPais = dbp.pais_model.findAll();
    let promCategoria = dbp.categoria_model.findAll();
    Promise.all([promPais, promCategoria])
      .then(function ([promPais, promCategoria]) {
        return res.render("products/productLoadCRUD", {
          promPais: promPais,
          promCategoria: promCategoria,
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
      let promPais = dbp.pais_model.findAll();
      let promCategoria = dbp.categoria_model.findAll();
      Promise.all([promPais, promCategoria])
        .then(function ([promPais, promCategoria]) {
          return res.render("products/productLoadCRUD", {
            promPais: promPais,
            promCategoria: promCategoria,
            errors: resultValidation.mapped(),
            oldData: req.body,
            alert,
          });
        })
        .catch((error) => res.send(error));
    } else {
      dbp.productos_model.create({
        titulo: req.body.titulo,
        temporada: req.body.temporada,
        volumen: req.body.volumen,
        precionormal: req.body.precionormal,
        publicacion: req.body.publicacion,
        precio: req.body.precio,
        descontinuado: req.body.descontinuado,
        stock: req.body.stock,
        id_categoria: req.body.id_categoria,
        id_pais: req.body.id_pais,
        descripcioncorta: req.body.descripcioncorta,
        descripciondetallada: req.body.descripciondetallada,
        imagen: req.file.originalname,
      });
      return res.redirect("/");
    }
  },

  editCRUD: function (req, res) {
    let promPais = dbp.pais_model.findAll();
    let promCategoria = dbp.categoria_model.findAll();
    let productoCrud = dbp.productos_model.findByPk(req.params.id);
    Promise.all([promPais, promCategoria, productoCrud])
      .then(function ([promPais, promCategoria, productoCrud]) {
        return res.render("products/productEditcrud", {
          promPais: promPais,
          promCategoria: promCategoria,
          productoCrud: productoCrud,
          oldData: productoCrud
        });
      })
      .catch((error) => res.send(error));
  },

  updateCRUD: function (req, res) {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      dbp.productos_model
        .findByPk(req.params.id)
        .then((productoCrud) => {
          //console.log(productoCrud);
          //console.log(req.body);
          //console.log(resultValidation);
          const alert = resultValidation.array();
          return res.render("products/productEditcrud", {
            productoCrud,
            errors: resultValidation.mapped(),
            oldData: req.body,
            alert,
          });
        })
        .catch((error) => res.send(error));
    } else {
      dbp.productos_model
        .update(
          {
            titulo: req.body.titulo,
            temporada: req.body.temporada,
            volumen: req.body.volumen,
            descripcioncorta: req.body.descripcioncorta,
            descripciondetallada: req.body.descripciondetallada,
            precionormal: req.body.precionormal,
            publicacion: req.body.publicacion,
            imagen: req.file.originalname,
            precio: req.body.precio,
            descontinuado: req.body.descontinuado,
            stock: req.body.stock,
            id_categoria: req.body.id_categoria,
            id_pais: req.body.id_pais,
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

  deleteCRUD: function (req, res) {
    dbp.productos_model.findByPk(req.params.id).then((productoCrud) => {
      return res.render("products/productDeletecrud", { productoCrud });
    });
  },
  destroyCRUD: function (req, res) {
    dbp.productos_model
      .destroy({
        where: { id: req.params.id },
        force: true,
      })
      .then(() => {
        return res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
};

module.exports = productController;
