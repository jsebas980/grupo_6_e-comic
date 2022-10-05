// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const util = require('util');
const { body, check, oneOf, validationResult } = require('express-validator');
const userController = require('../controllers/usersController');
const path = require('path');
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

/*** Ejecucion del express validator de un usuario ***/
const validateUsuario = [
   body('nombre').notEmpty().withMessage('Debes completar el Nombre').bail()
      .isLength({ min: 3 }).withMessage('El Nombre debe ser más largo'),
   body('apellido').notEmpty().withMessage('Debes completar los Apellidos').bail()
      .isLength({ min: 3 }).withMessage('El Apellidos debe ser más largo'),
   body('correoelectronico').notEmpty().withMessage('Debes completar el Correo electronico').bail()
      .isEmail().withMessage('Debes completar un Correo electronico válido'),
   body('numerotelefono').notEmpty().withMessage('Debes completar el Teléfono / Celular').bail()
      .isInt().isLength({ min: 7 }).withMessage('Debes completar un Teléfono / Celular válido'),
   body('id_pais').notEmpty().withMessage('Debes completar la Pais').bail()
      .isLength({ min: 3 }).withMessage('Debes completar la Pais válida'),
   body('id_provincia').notEmpty().withMessage('Debes completar la Ciudad/Provincia').bail()
      .isIn(['user', 'admin']).withMessage('Debes completar la Ciudad/Provincia válida'),
   body('contraseña').notEmpty().withMessage('Debes completar la Contraseña').bail()
      .isLength({ min: 8 }).withMessage('Debes completar la Contraseña, debe ser más larga, mínimo 8 letras, y debe contener mayúscula, un número y un carácter especial.'),
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
]

const validation = [
   oneOf([
      check('email')
         .exists()
         .withMessage('Correo electronico es requerido')
         .isLength({ min: 8 })
         .withMessage('Debes completar la Correo electronico, debe ser más larga, mínimo 8 letras'),

      check('email')
         .exists()
         .withMessage('Correo electronico es requerido')
         .isEmail()
         .withMessage('Debes completar un Correo electronico válido'),

   ]),
   check('password')
      .exists()
      .withMessage('Contraseña es requerido')
      .isLength({ min: 8 })
      .withMessage('Debes completar la Contraseña, debe ser más larga, mínimo 8 letras, y debe contener mayúscula, un número y un carácter especial.')

];


function handleValidationErrors(req, res, next) {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      //return res.status(422).jsonp(errors.array());
      const alert = errors.array()
      res.render('./users/login', {
         alert
      })
   }else{
      next();
   }
};

/*** Ejecucion del multer de una imagen de un usuario ***/
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../public/images/imgUsers/');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
var uploadFile = multer({ storage: storage })

/*** Muestra la pagina de login de un usuario ***/
router.get('/login', guestMiddleware, userController.login);
router.post('/login', validation, handleValidationErrors, userController.loginProcessCRUD);


/*** Muestra la pagina registro de un usuario ***/
router.get('/profile', authMiddleware, userController.profile);
router.get('/profileCRUD', authMiddleware, userController.profileCRUD);

/*** Muestra la pagina registro de un usuario ***/
router.get('/register', guestMiddleware, userController.register);

/*** Muestra la pagina logout de un usuario ***/
router.get('/logout', userController.logout);

/*** Muestra la pagina del detalle de un usuario ***/
//router.get('/userDetail/:userId', authMiddleware, userController.userDetail);

/*** Muestra la pagina de la edicion de un usuario ***/
//router.get('/userEdit/:id', authMiddleware, userController.userEdit);
//router.patch('/userEdit/:id', uploadFile.single('img'), validateUsuario, userController.userUpdate);

/*** Muestra la pagina de la eliminacion de un usuario ***/
//router.get('/userDelete/:id', authMiddleware, userController.userDelete);
//router.delete('/userDelete/:id', userController.userDestroy);

/*** Muestra la pagina del listado de los usuarios ***/
//router.get('/userList', authMiddleware, userController.userList);

/*** Muestra la pagina de la creacion de un usuario ***/
//router.get('/userCreate', authMiddleware, userController.userCreate);
//router.post('/userLoad', uploadFile.single('img'), validateUsuario, userController.userload);

// ! CRUD de los usuarios

/*** Muestra la pagina del listado de los usuarios con CRUD DB ***/
router.get('/userListCRUD', authMiddleware, userController.listCRUD);
router.get('/userDetailCRUD/:id', authMiddleware, userController.userDetailCRUD);

router.get('/userCreateCRUD', authMiddleware, userController.userCreateCRUD);
router.post('/userInsertCRUD', uploadFile.single('img'), validateUsuario, handleValidationErrors, userController.createCRUD);

router.get('/userEditCRUD/:id', userController.editCRUD);
router.patch('/userEditCRUD/:id', uploadFile.single('img'), validateUsuario, handleValidationErrors, userController.updateCRUD);

router.get('/userDeleteCRUD/:id', authMiddleware, userController.deleteCRUD);
router.delete('/userDeleteCRUD/:id', userController.destroyCRUD);

router.patch('/userPassRole/:id', userController.userPassRole);

module.exports = router;