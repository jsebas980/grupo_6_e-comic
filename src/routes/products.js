const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productController = require('../controllers/productsController');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../public/images/img/');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
var uploadFile = multer({storage: storage})

/* ROUTER productos */

/*** Obtener un producto OK***/
router.get('/productDetail/:comicId', productController.productDetail);

/*** Carrito de compras ***/
router.get('/productCart', productController.productCart);

/*** Editar un producto OK***/
router.get('/productEdit/:id', productController.productEdit);
router.patch('/productEdit/:id', uploadFile.single('img'), productController.productUpdate);

/*** Eliminar un producto OK***/
router.get('/productDelete/:id', productController.productDelete);
router.delete('/productDelete/:id', productController.productDestroy);

/*** Imprimir todos los productos OK***/
router.get('/productList', productController.productList);

/*** Crear un producto OK***/
router.get('/productLoad', productController.productCreate);
router.post('/productLoad', uploadFile.single('img'), productController.productload);

module.exports = router;