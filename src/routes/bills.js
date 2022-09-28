// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

const billController = require('../controllers/billsController');

/*** Ejecucion del multer de una imagen de un billo ***/
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../public/images/img/');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
var uploadFile = multer({ storage: storage })

// ! CRUD de los facturas

/*** Muestra la pagina del listado de los usuarios con CRUD DB ***/
router.get('/billListCRUD', billController.listCRUD);
router.get('/billDetailCRUD/:id', billController.billDetailCRUD);

router.get('/billCreateCRUD', billController.billCreateCRUD);
router.post('/billInsertCRUD', billController.createCRUD);

router.get('/billEditCRUD/:id', billController.editCRUD);
router.patch('/billEditCRUD/:id', billController.updateCRUD);

module.exports = router;