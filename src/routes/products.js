// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const { body, validationResult } = require('express-validator');
const path = require('path');
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/*** Ejecucion del express validator de un producto ***/
//.isIn(['user', 'admin']).withMessage('Debes completar la Ciudad/Provincia válida'),
const validateProducto = [
   body('titulo').notEmpty().withMessage('Debes completar el Titulo').bail()
      .isLength({ min: 5 }).withMessage('El Titulo debe ser más largo'),
   body('temporada').notEmpty().withMessage('Debes completar la Temporada').bail()
      .isLength({ min: 3 }).withMessage('El Temporada debe ser más largo'),
   body('volumen').notEmpty().withMessage('Debes completar el Volumen').bail()
      .isLength({ min: 3 }).withMessage('El Volumen debe ser más largo'),
   body('stock').notEmpty().withMessage('Debes completar el Stock').bail()
      .isInt().withMessage('El Stock debe ser númerico'),
   body('descontinuado').notEmpty().withMessage('Debes completar el Descontinuado').bail()
      .isInt().withMessage('El Descontinuado debe ser númerico'),
   body('precionormal').notEmpty().withMessage('Debes completar el Precio').bail()
      .isInt().withMessage('El Precio debe ser númerico'),
   body('precio').notEmpty().withMessage('Debes completar el Precio').bail()
      .isInt().withMessage('El Precio debe ser númerico'),
   body('id_categoria').notEmpty().withMessage('Debes completar la Categoria').bail()
      .isLength({ min: 1 }).withMessage('Debes ser una Categoria válida'),
   body('id_pais').notEmpty().withMessage('Debes completar el Pais').bail()
      .isLength({ min: 1 }).withMessage('Debes ser un Pais válido'),
   body('publicacion').notEmpty().withMessage('Debes completar la Fecha de publicación').bail()
      .isDate().withMessage('Debes ser una fecha valida'),
   body('descripcioncorta').notEmpty().withMessage('Debes completar la Descripción corta').bail()
      .isLength({ min: 10 }).withMessage('Debes ser más larga, mínimo 10 letras'),
   body('descripciondetallada').notEmpty().withMessage('Debes completar la Descripcion detallada').bail()
      .isLength({ min: 20 }).withMessage('Debes ser más larga, mínimo 20 letras'),
   body('imagen')
      .custom((value, { req }) => {
         let file = req.file;
         let extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
         if (!file) {
            null;
         } else {
            let fileExtension = path.extname(file.originalname);
            if (!extensionesValidas.includes(fileExtension)) {
               throw new Error('Solo se aceptan archivos JPG, JPEG, PNG y GIF');
            }
         }
         return true;
      })
];

function productsValidationErrors(req, res, next) {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      console.log(req.url);
      console.log(req.body);
      //console.log(validationResult(req).mapped());
      const alert = errors.array()
      if (req.url.indexOf('/productInsertCRUD') >= 0){
         //return res.status(422).jsonp(errors.array());
         res.render("products/productLoadCRUD", {
            alert
         })
      }
      if (req.url.indexOf('/productEditCRUD') >= 0){
         return res.status(422).jsonp(errors.array());
         res.render("products/productEditCRUD/"+req.params.id, {
            alert
         })
      }     
   } else {
      console.log("no hay errores: " + errors)
      next();
   }
};

/*** Ejecucion del multer de una imagen de un producto ***/
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../public/images/img/');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
var uploadFile = multer({ storage: storage })

/*** Muestra la pagina del detalle de un producto ***/
//router.get('/productDetail/:comicId', productController.productDetail);

/*** Muestra la pagina del carrito de compras ***/
router.get('/productCart', authMiddleware, productController.productCart);

/*** Muestra la pagina de la edicion de un producto ***/
//router.get('/productEdit/:id', authMiddleware, productController.productEdit);
//router.patch('/productEdit/:id', uploadFile.single('img'), productController.productUpdate);

/*** Muestra la pagina de la eliminacion de un producto ***/
//router.get('/productDelete/:id', authMiddleware, productController.productDelete);
//router.delete('/productDelete/:id', productController.productDestroy);

/*** Muestra la pagina del listado de los usuarios ***/
//router.get('/productList', authMiddleware, productController.productList);

/*** Muestra la pagina de la creacion de un producto ***/
//router.get('/productCreate', authMiddleware, productController.productCreate);
//router.post('/productLoad', uploadFile.single('img'), productController.productload);

// ! CRUD de los productos

/*** Muestra la pagina del listado de los usuarios con CRUD DB ***/
router.get('/productListCRUD', authMiddleware, productController.listCRUD);
router.get('/productDetailCRUD/:id', authMiddleware, productController.productDetailCRUD);

router.get('/productCreateCRUD', productController.productCreateCRUD);
router.post('/productInsertCRUD', uploadFile.single('imagen'), validateProducto, productsValidationErrors, productController.createCRUD);

router.get('/productEditCRUD/:id', productController.editCRUD);
router.patch('/productEditCRUD/:id',uploadFile.single('imagen'), validateProducto, productsValidationErrors, productController.updateCRUD);

router.get('/productDeleteCRUD/:id', authMiddleware, productController.deleteCRUD);
router.delete('/productDeleteCRUD/:id', productController.destroyCRUD);

module.exports = router;