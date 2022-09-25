// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

/*** Muestra la pagina de inicio ***/
router.get('/', mainController.index);

/*** Muestra la pagina de inicio CRUD ***/
router.get('/CRUD', mainController.indexCRUD);

/*** Muestra la pagina no encuentra pagina ***/
router.get('/404', mainController.notFound);

module.exports = router;