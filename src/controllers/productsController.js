// ? Variables y Requiere
const fs = require("fs");
let archivo = "./database/products.json";
let comicProductos = JSON.parse(fs.readFileSync(archivo, "utf-8"));

const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Productos = db.ProductosModel;

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
        console.log(req.file);
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
list: (req, res) => {
    Movies.findAll()
        .then(movies => {
            return res.render('moviesList.ejs', {movies})
        })
},
detail: (req, res) => {
    Movies.findByPk(req.params.id)
        .then(movie => {
            return res.render('moviesDetail.ejs', {movie});
        });
},
new: (req, res) => {
    Movies.findAll({
        order : [
            ['release_date', 'DESC']
        ],
        limit: 5
    })
        .then(movies => {
            return res.render('newestMovies', {movies});
        });
},
recomended: (req, res) => {
    Movies.findAll({
        where: {
            rating: {[db.Sequelize.Op.gte] : 8}
        },
        order: [
            ['rating', 'DESC']
        ]
    })
        .then(movies => {
            return res.render('recommendedMovies.ejs', {movies});
        });
},
//Aqui dispongo las rutas para trabajar con el CRUD
add: function (req, res) {
    Genres.findAll()
    .then(allGenres => {
        return res.render("moviesAdd", {allGenres:allGenres})
    })
    .catch(error => res.send(error))
},

create: function (req,res) {
    Movies.create({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id
    });
    return res.redirect('/movies');
},

edit: function(req,res) {
    let promMovies = Movies.findByPk(req.params.id);
    let promGenres = Genres.findAll();
    Promise
    .all([promMovies, promGenres])
    .then(function([Movie, allGenres]) {
        return  res.render('moviesEdit', {Movie:Movie, allGenres:allGenres})})
    .catch(error => res.send(error))
},

update: function (req,res) {
    db.Movie.update({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id
    },{
        where: {
            id: req.params.id
        }
    })
    .then(()=>{
        return res.redirect('/movies')})
    .catch(error => res.send(error));
},

delete: function (req,res) {
    let Movie = Movies.findByPk(req.params.id)
    return res.redirect(('/moviesDelete'), {Movie:Movie})
},
destroy: function (req,res) {
    Movies.destroy({
        where: {id: req.params.id},
        force: true
        })
        .then(()=>{
            return res.redirect('/movies');
        })
        .catch(error => res.send(error))         
}


};

module.exports = productController;
