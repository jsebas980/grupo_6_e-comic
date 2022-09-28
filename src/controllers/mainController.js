// ? Variables y Requiere
const fs = require('fs');
let archivo = './database/products.json';
let comicProductos = JSON.parse(fs.readFileSync(archivo, 'utf-8'))

const dbp = require("../database/models/");
const sequelize = dbp.sequelize;
var Sequelize = require('sequelize');
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
        dbp.productos_model.findAll({ order: [Sequelize.literal('RAND()')], limit: 10 })
            .then(producto => {
                return res.render("indexCRUD", { producto: producto });
            });
    },

    // recomended: (req, res) => {
    //     Movies.findAll({
    //         where: {
    //             rating: {[db.Sequelize.Op.gte] : 8}
    //         },
    //         order: [
    //             ['rating', 'DESC']
    //         ]
    //     })
    //         .then(movies => {
    //             return res.render('recommendedMovies.ejs', {movies});
    //         });
    // },
};

module.exports = mainController;