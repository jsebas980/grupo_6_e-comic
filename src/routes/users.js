// ? Variables y Requiere
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/usersController');
const path = require('path');
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

/*** Ejecucion del express validator de un usuario ***/
const validateUsuario = [
   body('firstname').notEmpty().withMessage('Debes completar el nombre').bail()
      .isLength({ min: 3 }).withMessage('El nombre debe ser más largo'),
   body('lastname').notEmpty().withMessage('Debes completar los apellidos').bail()
      .isLength({ min: 3 }).withMessage('El nombre debe ser más largo'),
   body('email').notEmpty().withMessage('Debes completar el correo electronico').bail()
      .isEmail().withMessage('Debes completar un correo electronico válido'),
   body('phonenumber').notEmpty().withMessage('Debes completar el teléfono o celular').bail()
      .isInt().isLength({ min: 7 }).withMessage('Debes completar un teléfono o celular válido'),
   body('city').notEmpty().withMessage('Debes completar la ciudad').bail()
      .isLength({ min: 3 }).withMessage('Debes completar la ciudad válida'),
   body('category').notEmpty().withMessage('Debes completar la categoria').bail()
      .isIn(['user', 'admin']).withMessage('Debes completar la categoria válida'),
   body('password').notEmpty().withMessage('Debes completar la contraseña').bail()
      .isLength({ min: 8 }).withMessage('Debes completar la contraseña, debe ser más larga, mínimo 8 letras, y debe contener mayúscula, un número y un carácter especial.'),
   body('img')
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
router.post('/login', userController.loginProcess);

/*** Muestra la pagina registro de un usuario ***/
router.get('/profile', authMiddleware, userController.profile);

/*** Muestra la pagina registro de un usuario ***/
router.get('/register', guestMiddleware, userController.register);

/*** Muestra la pagina logout de un usuario ***/
router.get('/logout', userController.logout);

/*** Muestra la pagina del detalle de un usuario ***/
router.get('/userDetail/:userId', authMiddleware, userController.userDetail);

/*** Muestra la pagina de la edicion de un usuario ***/
router.get('/userEdit/:id', authMiddleware, userController.userEdit);
router.patch('/userEdit/:id', uploadFile.single('img'), validateUsuario, userController.userUpdate);

/*** Muestra la pagina de la eliminacion de un usuario ***/
router.get('/userDelete/:id', authMiddleware, userController.userDelete);
router.delete('/userDelete/:id', userController.userDestroy);

/*** Muestra la pagina del listado de los usuarios ***/
router.get('/userList', authMiddleware, userController.userList);

/*** Muestra la pagina de la creacion de un usuario ***/
router.get('/userCreate', authMiddleware, userController.userCreate);
router.post('/userLoad', uploadFile.single('img'), validateUsuario, userController.userload);

module.exports = router;