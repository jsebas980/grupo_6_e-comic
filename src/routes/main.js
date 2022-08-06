var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.index);
router.get('/404', mainController.notFound);

module.exports = router;