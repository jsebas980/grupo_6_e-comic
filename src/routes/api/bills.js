const express = require('express');
const router = express.Router();
const billsAPIController = require('../../controllers/api/billsAPIController');

//Rutas
//Listado de todos los usuarios
router.get('/', billsAPIController.list);
//Detalle del usuario
router.get('/:id', billsAPIController.detail);

module.exports = router;