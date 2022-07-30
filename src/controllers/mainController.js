const fs = require('fs');
let archivo = './database/products.json';
let comicProductos = JSON.parse(fs.readFileSync(archivo, 'utf-8'))

const mainController = {
    index: (req, res) => {
        res.render("index", { producto: comicProductos });
    },
    productDetail: (req, res) => {
        let producto = comicProductos.find(producto => producto.id == req.params.comicId);
        res.render("./products/productDetail.ejs", { producto: producto });
    },
    productCart: (req, res) => {
        res.render("./products/productCart");
    },
    productEdit: (req, res) => {
        res.render("./products/productEdit");
    },
    productList: (req, res) => {
        res.render("./products/productList");
    },
    productload: (req, res) => {
        res.render("./products/productload");
    },
    login: (req, res) => {
        res.render("./users/login");
    },
    register: (req, res) => {
        res.render("./users/register");
    },
};

module.exports = mainController;