var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productsController');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/img'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  });

const uploadFile = multer({ storage });

/* GET home page. */
router.get('/productDetail/:comicId', productController.productDetail);
router.get('/productCart', productController.productCart);
router.get('/productEdit', productController.productEdit);
router.get('/productList', productController.productList);
router.get('/productload', productController.productload);
router.post('/productload', uploadFile.single('img'), productController.productCreated);

module.exports = router;