var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../public/images/imgUsers/');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
var uploadFile = multer({storage: storage})

/* GET home page. */
router.get('/login', userController.login);
router.get('/register', userController.register);

/*** Obtener un usuario***/
router.get('/userDetail/:userId', userController.userDetail);

/*** Editar un producto OK***/
router.get('/userEdit/:id', userController.userEdit);
router.patch('/userEdit/:id', uploadFile.single('img'), userController.userUpdate);

/*** Eliminar un producto OK***/
router.get('/userDelete/:id', userController.userDelete);
router.delete('/userDelete/:id', userController.userDestroy);

/*** Imprimir todos los productos OK***/
router.get('/userList', userController.userList);

/*** Crear un producto OK***/
router.get('/userLoad', userController.userCreate);
router.post('/userLoad', uploadFile.single('img'), userController.userload);

module.exports = router;