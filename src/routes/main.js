var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.index);
router.get('/productDetail', mainController.productDetail);
router.get('/productCart', mainController.productCart);
router.get('/productEdit', mainController.productEdit);
router.get('/productList', mainController.productList);
router.get('/productload', mainController.productload);
router.get('/login', mainController.login);
router.get('/register', mainController.register);

module.exports = router;