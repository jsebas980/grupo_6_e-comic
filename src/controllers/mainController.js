// ? Variables y Requiere
const fs = require('fs');
let archivo = './database/products.json';
let comicProductos = JSON.parse(fs.readFileSync(archivo, 'utf-8'))

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
};

module.exports = mainController;