const fs = require('fs');
let archivo = './database/products.json';
let comicProductos = JSON.parse(fs.readFileSync(archivo, 'utf-8'))

const productController = {
    productDetail: (req, res) => {
        let producto = comicProductos.find(producto => producto.id == req.params.comicId);
        res.render("products/productDetail", { producto: producto });
    },
    productCart: (req, res) => {
        res.render("products/productCart");
    },
    productEdit: (req, res) => {
        res.render("products/productEdit");
    },
    productList: (req, res) => {
        res.render("products/productList");
    },
    productload: (req, res) => {
        res.render("products/productload");
    },
};

module.exports = productController;