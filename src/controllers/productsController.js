// ? Variables y Requiere
const dbp = require("../database/models/");
//const sequelize = dbp.sequelize;

const productController = {
  /* CONTROLLER productos */

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
      imagen: req.body.imagen,
    });
    return res.redirect("/");
  },

  editCRUD: function (req, res) {
    dbp.productos_model
      .findByPk(req.params.id)
      .then((productoCrud) => {
        return res.render("products/productEditcrud", { productoCrud });
      })
      .catch((error) => res.send(error));
  },

  updateCRUD: function (req, res) {
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
          imagen: req.body.imagen,
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
