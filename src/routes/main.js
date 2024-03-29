// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const palabras= require('../../public/js/search2.js').default
/*** Muestra la pagina de inicio ***/
router.get('/', mainController.indexCRUD);

/*** validacion de busqueda ***/
if(palabras!=undefined){
    router.get('/', mainController.indexCRUD);
    router.post('/', palabras, mainController.searchCRUD);
}


/*** Muestra la pagina de inicio CRUD ***/
//router.get('/CRUD', mainController.indexCRUD);

/*** Muestra la pagina no encuentra pagina ***/
router.get('/404', mainController.notFound);

module.exports = router;