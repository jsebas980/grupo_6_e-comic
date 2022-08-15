// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productController = require('../controllers/productsController');

/*** Ejecucion del multer de una imagen de un producto ***/
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../public/images/img/');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
var uploadFile = multer({storage: storage})

/*** Muestra la pagina del detalle de un producto ***/
router.get('/productDetail/:comicId', productController.productDetail);

/*** Muestra la pagina del carrito de compras ***/
router.get('/productCart', productController.productCart);

/*** Muestra la pagina de la edicion de un producto ***/
router.get('/productEdit/:id', productController.productEdit);
router.patch('/productEdit/:id', uploadFile.single('img'), productController.productUpdate);

/*** Muestra la pagina de la eliminacion de un producto ***/
router.get('/productDelete/:id', productController.productDelete);
router.delete('/productDelete/:id', productController.productDestroy);

/*** Muestra la pagina del listado de los usuarios ***/
router.get('/productList', productController.productList);

/*** Muestra la pagina de la creacion de un producto ***/
router.get('/productCreate', productController.productCreate);
router.post('/productLoad', uploadFile.single('img'), productController.productload);

module.exports = router;