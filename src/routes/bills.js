// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const billController = require('../controllers/billsController');
const { body, check, validationResult } = require('express-validator');
const path = require('path');
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

// /*** Ejecucion del express validator de un Factura ***/
// //.isIn(['user', 'admin']).withMessage('Debes completar la Ciudad/Provincia válida'),
// const validateFactura = [
//    body('titulo').notEmpty().withMessage('Debes completar el Titulo').bail()
//       .isLength({ min: 5 }).withMessage('El Titulo debe ser más largo'),
//    body('temporada').notEmpty().withMessage('Debes completar la Temporada').bail()
//       .isLength({ min: 3 }).withMessage('El Temporada debe ser más largo'),
//    body('volumen').notEmpty().withMessage('Debes completar el Volumen').bail()
//       .isLength({ min: 3 }).withMessage('El Volumen debe ser más largo'),
//    body('stock').notEmpty().withMessage('Debes completar el Stock').bail()
//       .isInt().withMessage('El Stock debe ser númerico'),
//    body('descontinuado').notEmpty().withMessage('Debes completar el Descontinuado').bail()
//       .isInt().withMessage('El Descontinuado debe ser númerico'),
//    body('precionormal').notEmpty().withMessage('Debes completar el Precio').bail()
//       .isInt().withMessage('El Precio debe ser númerico'),
//    body('precio').notEmpty().withMessage('Debes completar el Precio').bail()
//       .isInt().withMessage('El Precio debe ser númerico'),
//    body('id_categoria').notEmpty().withMessage('Debes completar la Categoria').bail()
//       .isLength({ min: 1 }).withMessage('Debes ser una Categoria válida'),
//    body('id_pais').notEmpty().withMessage('Debes completar el Pais').bail()
//       .isLength({ min: 1 }).withMessage('Debes ser un Pais válido'),
//    body('publicacion').notEmpty().withMessage('Debes completar la Fecha de publicación').bail()
//       .isDate().withMessage('Debes ser una fecha valida'),
//    body('descripcioncorta').notEmpty().withMessage('Debes completar la Descripción corta').bail()
//       .isLength({ min: 10 }).withMessage('Debes ser más larga, mínimo 10 letras'),
//    body('descripciondetallada').notEmpty().withMessage('Debes completar la Descripcion detallada').bail()
//       .isLength({ min: 20 }).withMessage('Debes ser más larga, mínimo 20 letras'),
//    body('imagen')
//       .custom((value, { req }) => {
//          let file = req.file;
//          let extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
//          if (!file) {
//             null;
//          } else {
//             let fileExtension = path.extname(file.originalname);
//             if (!extensionesValidas.includes(fileExtension)) {
//                throw new Error('Solo se aceptan archivos JPG, JPEG, PNG y GIF');
//             }
//          }
//          return true;
//       })
// ];

// function productsValidationErrors(req, res, next) {
//    const errors = validationResult(req)
//    if (!errors.isEmpty()) {
//       return res.status(422).jsonp(errors.array());
//       const alert = errors.array()
//       res.render('./products/productLoadCRUD', {
//          alert
//       })
//    } else {
//       next();
//    }
// };

// // ! PENDIENTE REVISAR LA EDICION Factura

// const validateFacturaEdit = [
//    body('titulo').notEmpty().withMessage('Debes completar el Titulo').bail()
//       .isLength({ min: 5 }).withMessage('El Titulo debe ser más largo'),
//    body('temporada').notEmpty().withMessage('Debes completar la Temporada').bail()
//       .isLength({ min: 3 }).withMessage('El Temporada debe ser más largo'),
//    body('volumen').notEmpty().withMessage('Debes completar el Volumen').bail()
//       .isLength({ min: 3 }).withMessage('El Volumen debe ser más largo'),
//    body('stock').notEmpty().withMessage('Debes completar el Stock').bail()
//       .isInt().withMessage('El Stock debe ser númerico'),
//    body('descontinuado').notEmpty().withMessage('Debes completar el Descontinuado').bail()
//       .isInt().withMessage('El Descontinuado debe ser númerico'),
//    body('precionormal').notEmpty().withMessage('Debes completar el Precio').bail()
//       .isInt().withMessage('El Precio debe ser númerico'),
//    body('precio').notEmpty().withMessage('Debes completar el Precio').bail()
//       .isInt().withMessage('El Precio debe ser númerico'),
//    body('id_categoria').notEmpty().withMessage('Debes completar la Categoria').bail()
//       .isLength({ min: 1 }).withMessage('Debes ser una Categoria válida'),
//    body('id_pais').notEmpty().withMessage('Debes completar el Pais').bail()
//       .isLength({ min: 1 }).withMessage('Debes ser un Pais válido'),
//    body('publicacion').notEmpty().withMessage('Debes completar la Fecha de publicación').bail()
//       .isDate().withMessage('Debes ser una fecha valida'),
//    body('descripcioncorta').notEmpty().withMessage('Debes completar la Descripción corta').bail()
//       .isLength({ min: 10 }).withMessage('Debes ser más larga, mínimo 10 letras'),
//    body('descripciondetallada').notEmpty().withMessage('Debes completar la Descripcion detallada').bail()
//       .isLength({ min: 20 }).withMessage('Debes ser más larga, mínimo 20 letras'),
//    body('imagen')
//       .custom((value, { req }) => {
//          let file = req.file;
//          let extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
//          if (!file) {
//             null;
//          } else {
//             let fileExtension = path.extname(file.originalname);
//             if (!extensionesValidas.includes(fileExtension)) {
//                throw new Error('Solo se aceptan archivos JPG, JPEG, PNG y GIF');
//             }
//          }
//          return true;
//       })
// ];

// function FacturaEditValidationErrors(req, res, next) {
//    const errors = validationResult(req)
//    if (!errors.isEmpty()) {
//       return res.status(422).jsonp(errors.array());
//       const alert = errors.array()
//       res.render("/", {
//          alert
//       })
//    } else {
//       next();
//    }
// };

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
router.get('/billListCRUD', authMiddleware, billController.listCRUD);
router.get('/billDetailCRUD/:id', authMiddleware, billController.billDetailCRUD);

router.get('/billCreateCRUD', authMiddleware, billController.billCreateCRUD);
router.post('/billInsertCRUD', validateFactura, productsValidationErrors, billController.createCRUD);

router.get('/billEditCRUD/:id', authMiddleware, billController.editCRUD);
router.patch('/billEditCRUD/:id', validateFacturaEdit, FacturaEditValidationErrors, billController.updateCRUD);

module.exports = router;