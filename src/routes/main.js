// ? Variables y Requiere
const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const mainController = require("../controllers/mainController");
const palabras = require("../../public/js/search2.js").default;
=======
const mainController = require('../controllers/mainController');
const palabras= require('../../public/js/search2.js').default
>>>>>>> a9efbc54e62ff3446c39ff139a50452e5b8b0d1d
/*** Muestra la pagina de inicio ***/
router.get("/", mainController.indexCRUD);

/*** validacion de busqueda ***/
<<<<<<< HEAD
if (palabras != undefined) {
  router.get("/", mainController.indexCRUD);
  router.post("/", palabras, mainController.searchCRUD);
}
=======
if(palabras!=undefined){
    router.get('/', mainController.indexCRUD);
    router.post('/', palabras, mainController.searchCRUD);
}


/*** Muestra la pagina de inicio CRUD ***/
//router.get('/CRUD', mainController.indexCRUD);
>>>>>>> a9efbc54e62ff3446c39ff139a50452e5b8b0d1d

/*** Muestra la pagina no encuentra pagina ***/
router.get("/404", mainController.notFound);

module.exports = router;
