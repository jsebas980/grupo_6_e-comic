// ? Variables y Requiere
const { validationResult } = require("express-validator");
const dbp = require("../database/models/");
//const sequelize = dbp.sequelize;

const productController = {
  /*** Muestra el carrito de compra de un producto ***/
  productCart: (req, res) => {
    //console.log(req.session.userLogged);      
    dbp.usuario_model.findByPk(req.session.userLogged.id, 
      {
        attributes: { exclude: ["contraseña"] },
        include: [{ association: "pais" }, { association: "provincia" }],
      }).then((usuarioCrud) => {
        //console.log(usuarioCrud);  
      return res.render("products/productCart", { promUser: usuarioCrud });
    });
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
    let promAutor = dbp.productos_personas_model.findOne({
      where: {
        id_productos: req.params.id,
        id_rol: 1,
      },
      include: [
        { association: "personas" },
      ]
    });
    let promIllustrador = dbp.productos_personas_model.findOne({
      where: {
        id_productos: req.params.id,
        id_rol: 2,
      },
      include: [
        { association: "personas" },
      ]
    });
    let productoCrud = dbp.productos_model.findByPk(req.params.id,{
      include: [
        { association: "paisproductos" },
        { association: "categorias" },
      ],
    });
    Promise.all([promAutor, promIllustrador, productoCrud])
      .then(function ([promAutor, promIllustrador, productoCrud]) {
        return res.render("products/productDetailcrud", {
          promAutor: promAutor,
          promIllustrador: promIllustrador,
          productoCrud: productoCrud,
        });
      })
      .catch((error) => res.send(error));
  },

  productCreateCRUD: async (req, res) => {
    let promPais = dbp.pais_model.findAll();
    let promCategoria = dbp.categoria_model.findAll();
    let promPersonas = dbp.personas_model.findAll();
    Promise.all([promPais, promCategoria, promPersonas])
      .then(function ([promPais, promCategoria, promPersonas]) {
        return res.render("products/productLoadCRUD", {
          promPais: promPais,
          promCategoria: promCategoria,
          promPersonas: promPersonas,
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
      }).then(function(product) {
        console.log(product.id);
        console.log(req.body);
        dbp.productos_personas_model.create({
          id_productos: product.id,
          id_personas: req.body.id_autor,
          id_rol: 1,
        });
        dbp.productos_personas_model.create({
          id_productos: product.id,
          id_personas: req.body.id_illustrador,
          id_rol: 2,
        });
      });  
      
      return res.redirect("/");
    }
  },

  editCRUD: function (req, res) {
    let promPais = dbp.pais_model.findAll();
    let promCategoria = dbp.categoria_model.findAll();
    let promPersonas = dbp.personas_model.findAll();
    let promAutor = dbp.productos_personas_model.findOne({
      where: {
        id_productos: req.params.id,
        id_rol: 1,
      },
      include: [
        { association: "personas" },
      ]
    });
    let promIllustrador = dbp.productos_personas_model.findOne({
      where: {
        id_productos: req.params.id,
        id_rol: 2,
      },
      include: [
        { association: "personas" },
      ]
    });
    let productoCrud = dbp.productos_model.findByPk(req.params.id,{
      include: [
        { association: "paisproductos" },
        { association: "categorias" },
      ]
    });
    Promise.all([promPais, promCategoria, promAutor, promIllustrador, promPersonas, productoCrud])
      .then(function ([promPais, promCategoria, promAutor, promIllustrador, promPersonas, productoCrud]) {
        return res.render("products/productEditcrud", {
          promPais: promPais,
          promCategoria: promCategoria,
          productoCrud: productoCrud,
          promAutor: promAutor,
          promIllustrador: promIllustrador,
          promPersonas: promPersonas,
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
        cascade: false,
        force: true
      })
      .then(() => {
        return res.redirect("/404");
      })
      .catch((error) => res.send(error));
  },
};

module.exports = productController;
