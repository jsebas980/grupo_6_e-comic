// ? Variables y Requiere
//import {palabras} from '../../public/js/search2.js';
//const palabras= require('../../public/js/search2.js').default
var Sequelize = require("sequelize");
const dbp = require("../database/models/");
//const sequelize = dbp.sequelize;
//console.log(sequelize.models.productos_model.findByPk(8));

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
                    titulo: { [Op.like]: "%" + req.body.palabra + "%" },
                },
            })
            .then((producto) => {
                return res.render("indexCRUD", { producto: producto });
            });
    },
};

module.exports = mainController;
