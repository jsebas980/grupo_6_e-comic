const fs = require("fs");
let archivo = "./database/products.json";
let comicProductos = JSON.parse(fs.readFileSync(archivo, "utf-8"));

const productController = {
  /* CONTROLLER productos */

  /*** Obtener un producto ***/
  productDetail: (req, res) => {
    let producto = comicProductos.find(
      (producto) => producto.id == req.params.comicId
    );
    res.render("products/productDetail", { producto: producto });
  },
  /*** Carrito de compras ***/
  productCart: (req, res) => {
    res.render("products/productCart");
  },
  /*** Editar un producto OK***/
  productEdit: (req, res) => {
    let id = req.params.id;
    let productToEdit = comicProductos.find((product) => product.id == id);
    res.render("products/productEdit", { productToEdit });
  },

  productUpdate: (req, res) => {
    let id = req.params.id;
    let productToEdit = comicProductos.find((product) => product.id == id);
    let image;
    console.log(req.files[0]);
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
      img: "01.jpg",
    };

    let newProducts = comicProductos.map((product) => {
      if (product.id == id) {
        return (product = { ...productToEdit });
      }
      return product;
    });

    fs.writeFileSync(archivo, JSON.stringify(newProducts, null, " "));
    res.render("products/productCart");
  },
  /*** Eliminar un producto OK***/
  productDelete: (req, res) => {
    let id = req.params.id;
    let finalProducts = comicProductos.filter((product) => product.id != id);
    fs.writeFileSync(archivo, JSON.stringify(finalProducts, null, " "));
    res.redirect("/");
  },
  /*** Imprimir todos los productos OK***/
  productList: (req, res) => {
    res.render("products/productList", { comicProductos });
  },

  /*** Crear un producto OK***/
  productCreate: (req, res) => {
    res.render("products/productLoad");
  },

  productload: (req, res) => {
    let image;
    if (req.files[0] != undefined) {
      image = req.files[0].filename;
    } else {
      image = "default.jpg";
    }
    let newProduct = {
      id: comicProductos[comicProductos.length - 1].id + 1,
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
      img: image,
    };
    comicProductos.push(newProduct);
    fs.writeFileSync(archivo, JSON.stringify(comicProductos, null, " "));
    res.redirect("index");
  },
};

module.exports = productController;
