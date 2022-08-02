const fs = require('fs');
let archivo = './database/products.json';
let comicProductos = JSON.parse(fs.readFileSync(archivo, 'utf-8'))

const mainController = {
    index: (req, res) => {
        res.render("index", { producto: comicProductos });
    },
};

module.exports = mainController;