// ? Variables y Requiere
const fs = require("fs");
let archivo = "./database/products.json";
let comicProductos = JSON.parse(fs.readFileSync(archivo, "utf-8"));

const dbp = require("../database/models/");
const sequelize = dbp.sequelize;
//console.log(sequelize);

const productController = {
    /* CONTROLLER productos */

    /*** Muestra el detalle de un producto ***/
    productDetail: (req, res) => {
        let producto = comicProductos.find(
            (producto) => producto.id == req.params.comicId
        );
        res.render("products/productDetail", { producto: producto });
    },

    /*** Muestra el carrito de compra de un producto ***/
    productCart: (req, res) => {
        res.render("products/productCart");
    },

    /*** Muestra la pagina de edicion de un producto ***/
    productEdit: (req, res) => {
        let id = req.params.id;
        let productToEdit = comicProductos.find((product) => product.id == id);
        res.render("products/productEdit", { productToEdit });
    },

    /*** Ejecuta la actualizacion de un producto ***/
    productUpdate: (req, res) => {
        let id = req.params.id;
        let productToEdit = comicProductos.find((product) => product.id == id);

        // let image
        // if (req.files[0] != undefined) {
        //     image = req.files[0].filename
        // } else {
        //     image = productToEdit.image
        // }

        productToEdit = {
            id: Number(id),
            titulo: req.body.titulo,
            temporada: req.body.temporada,
            volumen: req.body.volumen,
            descripcionCorta: req.body.descripcionCorta,
            descripcionDetallada: req.body.descripcionDetallada,
            precioNormal: Number(req.body.precioNormal),
            autor: req.body.autor,
            illustrador: req.body.illustrador,
            categoria: req.body.categoria,
            publicacion: req.body.publicacion,
            paisOrigen: req.body.paisOrigen,
            img: req.file.originalname,
        };

        let newProducts = comicProductos.map((product) => {
            if (product.id == id) {
                return (product = { ...productToEdit });
            }
            return product;
        });

        fs.writeFileSync(archivo, JSON.stringify(newProducts, null, " "));
        res.redirect("/");
    },

    /*** Muestra la pagina de eliminacion de un producto ***/
    productDelete: (req, res) => {
        let id = req.params.id;
        let productToEdit = comicProductos.find((product) => product.id == id);
        res.render("products/productDelete", { productToEdit });
    },

    /*** Ejecuta la eliminacion de un producto ***/
    productDestroy: (req, res) => {
        let id = req.params.id;
        let finalProducts = comicProductos.filter((product) => product.id != id);

        fs.writeFileSync(archivo, JSON.stringify(finalProducts, null, " "));
        res.send("Se ha elimiando el registro");
    },

    /*** Imprimir todos los productos en una lista ***/
    productList: (req, res) => {
        res.render("products/productList", { comicProductos });
    },

    /*** Muestra la pagina de creacion de un producto ***/
    productCreate: (req, res) => {
        let productToId = comicProductos[comicProductos.length - 1].id + 1;
        res.render("products/productLoad", {
            productToId,
        });
    },

    /*** Ejecuta la creacion de un producto ***/
    productload: (req, res) => {
        let image;
        let idComic = comicProductos[comicProductos.length - 1].id + 1;
        //console.log(req.file);
        if (req.file != undefined) {
            image = req.file.originalname;
        } else {
            image = "default.jpg";
        }
        let newProduct = {
            id: idComic,
            titulo: req.body.titulo,
            temporada: req.body.temporada,
            volumen: req.body.volumen,
            descripcionCorta: req.body.descripcionCorta,
            descripcionDetallada: req.body.descripcionDetallada,
            precioNormal: req.body.precioNormal,
            autor: req.body.autor,
            illustrador: req.body.illustrador,
            categoria: req.body.categoria,
            publicacion: req.body.publicacion,
            paisOrigen: req.body.paisOrigen,
            img: image,
        };
        comicProductos.push(newProduct);
        fs.writeFileSync(archivo, JSON.stringify(comicProductos, null, " "));
        let producto = comicProductos.find((producto) => producto.id == idComic);
        res.render("products/productDetail", { producto: producto });
    },

    // ! CRUD de los productos
    listCRUD: (req, res) => {
        dbp.productos_model.findAll({ include: [{ association: 'paisproductos' },{ association: 'categorias' }] }).then((productoCrud) => {
            return res.render("products/productListcrud", { productoCrud });
        });
    },

    productDetailCRUD: (req, res) => {
        dbp.productos_model.findByPk(req.params.id).then((productoCrud) => {
            return res.render("products/productDetailcrud", { productoCrud });
        });
    },

    productCreateCRUD: (req, res) => {
        let promPais = dbp.pais_model.findAll();
        let promCategoria = dbp.categoria_model.findAll();
        Promise
            .all([promPais, promCategoria])
            .then(function ([promPais, promCategoria]) {
                return res.render("products/productLoadCRUD", { promPais: promPais, promCategoria: promCategoria })
            }).catch(error => res.send(error));
    },

    createCRUD: function (req, res) {
        console.log(req.body);
        // dbp.productos_model.create({
        //     titulo: req.body.titulo,
        //     temporada: req.body.temporada,
        //     volumen: req.body.volumen,
        //     precionormal: req.body.precionormal,
        //     publicacion: req.body.publicacion,
        //     precio: req.body.precio,
        //     descontinuado: req.body.descontinuado,
        //     stock: req.body.stock,
        //     id_categoria: req.body.id_categoria,
        //     id_pais: req.body.id_pais,
        //     descripcioncorta: req.body.descripcioncorta,
        //     descripciondetallada: req.body.descripciondetallada,
        //     imagen: req.body.imagen,
        // });
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
        console.log(req.body);
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
                    id_pais: req.body.id_pais
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
