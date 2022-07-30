var express = require('express');
var router = express.Router();
const productController = require('../controllers/productsController');

/* GET home page. */
router.get('/productDetail/:comicId', productController.productDetail);
router.get('/productCart', productController.productCart);
router.get('/productEdit', productController.productEdit);
router.get('/productList', productController.productList);
router.get('/productload', productController.productload);

module.exports = router;