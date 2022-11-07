const express = require('express');
const router = express.Router();
const countryDepartamentAPIController = require('../../controllers/api/countryDepartamentAPIController');

//Rutas
//Listado de todos los usuarios
router.get('/pais', countryDepartamentAPIController.listCountry);
//Detalle del usuario
router.get('/provincia', countryDepartamentAPIController.listDepartament);

module.exports = router;