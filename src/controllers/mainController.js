// ? Variables y Requiere
<<<<<<< HEAD
//import {palabras} from '../../public/js/search2.js';
//const palabras= require('../../public/js/search2.js').default
var Sequelize = require("sequelize");
=======
const fs = require('fs');
let archivo = './database/products.json';
let comicProductos = JSON.parse(fs.readFileSync(archivo, 'utf-8'))
//import {palabras} from '../../public/js/search2.js';
//const palabras= require('../../public/js/search2.js').default
>>>>>>> a9efbc54e62ff3446c39ff139a50452e5b8b0d1d
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
<<<<<<< HEAD
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
=======
        dbp.productos_model.findAll({
            where: {
               titulo: {[Op.like]: '%' + req.body.palabra + '%'}
            }
         })
            .then(producto => {
                return res.render("indexCRUD", { producto: producto });
            });
    },

>>>>>>> a9efbc54e62ff3446c39ff139a50452e5b8b0d1d
};

module.exports = mainController;
