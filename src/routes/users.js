// ? Variables y Requiere
const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { body, check, validationResult } = require("express-validator");
const path = require("path");
const multer = require("multer");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/*** Ejecucion del multer de una imagen de un usuario ***/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images/imgUsers/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var uploadFile = multer({ storage: storage });

/*** Ejecucion del express validator de un usuario ***/
//.isIn(['user', 'admin']).withMessage('Debes completar la Ciudad/Provincia válida'),
const validateUsuario = [
  body("nombre")
    .notEmpty()
    .withMessage("Debes completar el nombre")
    .bail()
    .isLength({ min: 2 })
    .withMessage(
      "El nombre debe ser más largo, deberá tener al menos 2 caracteres."
    ),
  body("apellido")
    .notEmpty()
    .withMessage("Debes completar los apellidos")
    .bail()
    .isLength({ min: 2 })
    .withMessage(
      "Los apellidos debe ser más largo, deberá tener al menos 2 caracteres."
    ),
  body("correoelectronico")
    .notEmpty()
    .withMessage("Debes completar el correo electrónico")
    .bail()
    .isEmail()
    .withMessage("El correo electrónico debe ser válido"),
  body("numerotelefono")
    .notEmpty()
    .withMessage("Debes completar el teléfono o celular")
    .bail()
    .isInt()
    .isLength({ min: 7 })
    .withMessage(
      "El teléfono o celular debe ser minimo de 7 caracteres y debe ser númerico"
    ),
  body("id_pais")
    .notEmpty()
    .withMessage("Debes completar el país")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Debes completar un país válido"),
  body("id_provincia")
    .notEmpty()
    .withMessage("Debes completar la ciudad / provincia")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Debes completar una ciudad o provincia válida"),
  body("contrasena")
    .notEmpty()
    .withMessage("Debes completar la contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Debes ser más larga la contraseña, mínimo 8 caracteres.")
    .bail()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      "Debe contener mínimo una letra mayúscula, una letra mayúscula, un número y un carácter especial."
    ),
  body("imagenuser").custom((value, { req }) => {
    let file = req.file;
    let extensionesValidas = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
      null;
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!extensionesValidas.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${extensionesValidas.join(
            ", "
          )}`
        );
      }
    }
    return true;
  }),
];

// function usersValidationErrors(req, res, next) {
//   console.log(req.url);
//   console.log(req.body);
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(req.url);
//     console.log(req.body);
//     //console.log(validationResult(req).mapped());
//     const alert = errors.array();
//     if (req.url.indexOf("/userInsertCRUD") >= 0) {
//       //return res.status(422).jsonp(errors.array());
//       res.render("users/userLoadCRUD", {
//         alert,
//       });
//     }
//     if (req.url.indexOf("/userEditCRUD") >= 0) {
//       return res.status(422).jsonp(errors.array());
//       res.render("users/userEditCRUD/" + req.params.id, {
//         alert,
//       });
//     }
//   } else {
//     console.log("no hay errores: " + errors);
//     next();
//   }
// }
// usersValidationErrors,

const validation = [
  check("email")
    .exists()
    .withMessage("El correo electrónico es requerido")
    .bail()
    .isLength({ min: 8 })
    .withMessage(
      "Debes completar el correo electrónico al cual debe ser más largo, mínimo 8 letras"
    )
    .bail()
    .isEmail()
    .withMessage("El correo electrónico debe ser válido"),
  check("password")
    .exists()
    .withMessage("La contraseña es requerida")
    .bail()
    .isLength({ min: 8 })
    .withMessage(
      "Debes completar la contraseña al cual debe ser más larga, mínimo 8 letras, y este debe contener mayúscula, un número y un carácter especial."
    ),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
    const alert = errors.array();
    res.render("./users/login", {
      alert,
    });
  } else {
    next();
  }
}

/*** Muestra la pagina de login de un usuario ***/
router.get("/login", guestMiddleware, userController.login);
router.post(
  "/login",
  validation,
  handleValidationErrors,
  userController.loginProcessCRUD
);
router.get("/forgot", guestMiddleware, userController.forgot);
/*** Muestra la pagina registro de un usuario ***/
router.get("/profileCRUD", authMiddleware, userController.profileCRUD);
/*** Muestra la pagina registro de un usuario ***/
router.get("/register", guestMiddleware, userController.register);
/*** Muestra la pagina logout de un usuario ***/
router.get("/logout", userController.logout);
/*** Muestra la pagina encritar la contraseña de un usuario ***/ router.patch(
  "/userPassRole/:id",
  userController.userPassRole
);
/*** Muestra la pagina registro de un usuario ***/
router.get("/reportADMIN", authMiddleware, userController.reportADMIN);

// ! CRUD de los usuarios

/*** Muestra la pagina del listado de los usuarios con CRUD DB ***/
router.get("/userListCRUD", authMiddleware, userController.listCRUD);
router.get(
  "/userDetailCRUD/:id",
  authMiddleware,
  userController.userDetailCRUD
);
/*** Muestra la pagina de insertar los usuarios con CRUD DB ***/
router.get("/userCreateCRUD", userController.userCreateCRUD);
router.post(
  "/userInsertCRUD",
  uploadFile.single("imagenuser"),
  validateUsuario,  
  userController.createCRUD
);
/*** Muestra la pagina de modificar los usuarios con CRUD DB ***/
router.get("/userEditCRUD/:id", userController.editCRUD);
router.patch(
  "/userEditCRUD/:id",
  uploadFile.single("imagenuser"),
  validateUsuario,
  userController.updateCRUD
);
/*** Muestra la pagina de eliminar los usuarios con CRUD DB ***/
router.get("/userDeleteCRUD/:id", authMiddleware, userController.deleteCRUD);
router.delete("/userDeleteCRUD/:id", userController.destroyCRUD);

module.exports = router;
