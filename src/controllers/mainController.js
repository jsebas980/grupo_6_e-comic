// ? Variables y Requiere
var { Sequelize, Op } = require("sequelize");
const dbp = require("../database/models/");

const mainController = {
    /* CONTROLLER general */

    /*** Muestra la pagina de inicio general ***/
    index: (req, res) => {
        res.render("index", { producto: comicProductos });
    },

    /*** Muestra la pagina no encuentra pagina general ***/
    notFound: (req, res) => {
        res.render("404");
    },

    indexCRUD: (req, res) => {
        dbp.productos_model
            .findAll({ order: [Sequelize.literal("RAND()")], limit: 10 })
            .then((producto) => {
                return res.render("indexCRUD", { producto: producto });
            });
    },

    searchCRUD: (req, res) => {
        dbp.productos_model
            .findAll({
                where: {
                    titulo: { [Op.like]: "%" + decodeURI(req.params.id) + "%" },
                },
            })
            .then((producto) => {
                if (producto.length === 0){
                    const alert = 'Producto no encontrado';
                    dbp.productos_model
                    .findAll({ order: [Sequelize.literal("RAND()")], limit: 10 })
                    .then((producto) => {
                        return res.render("indexCRUD", { producto: producto , alert });
                    });
                } else {
                    return res.render("indexCRUD", { producto: producto });
                }
                
            });
    },
};

module.exports = mainController;
