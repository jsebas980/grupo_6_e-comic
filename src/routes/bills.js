// ? Variables y Requiere
const express = require("express");
const router = express.Router();
const billController = require("../controllers/billsController");
const { body, validationResult } = require("express-validator");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/*** Ejecucion del express validator de un Factura ***/
//.isIn(['user', 'admin']).withMessage('Debes completar la Ciudad/Provincia válida'),
const validateFactura = [
  body("id_usuario")
    .notEmpty()
    .withMessage("Debes completar el Usuario")
    .bail()
    .isLength({ min: 1 })
    .withMessage("El Usuario debe ser más largo"),
  body("id_estadofactura")
    .notEmpty()
    .withMessage("Debes completar el Estado factura")
    .bail()
    .isInt()
    .withMessage("El Estado factura debe ser númerico"),
  body("envio")
    .notEmpty()
    .withMessage("Debes completar el Envio")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El Envio debe ser más largo"),
  body("impuesto")
    .notEmpty()
    .withMessage("Debes completar el Impuesto")
    .bail()
    .isInt()
    .withMessage("El Impuesto debe ser númerico"),
  body("total")
    .notEmpty()
    .withMessage("Debes completar el Total")
    .bail()
    .isInt()
    .withMessage("El Total debe ser númerico"),
  body("id_modopago")
    .notEmpty()
    .withMessage("Debes completar el Modo de pago")
    .bail()
    .isInt()
    .withMessage("El Modo de pago debe ser númerico"),
  body("fecha")
    .notEmpty()
    .withMessage("Debes completar la Fecha")
    .bail()
    .isDate()
    .withMessage("Debes ser una fecha valida"),
  body("id_pais")
    .notEmpty()
    .withMessage("Debes completar el Pais")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Debes ser un Pais válido"),
  body("id_provincia")
    .notEmpty()
    .withMessage("Debes completar la Provincia")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Debes ser una Provincia válida"),
  body("ciudad")
    .notEmpty()
    .withMessage("Debes completar la Ciudad")
    .bail()
    .isLength({ min: 1 })
    .withMessage("La Ciudad debe ser más largo"),
  body("nombrecompleto")
    .notEmpty()
    .withMessage("Debes completar el Nombre completo")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Debes ser más largo"),
  body("correoelectronico")
    .notEmpty()
    .withMessage("Debes completar el Correo electronico")
    .bail()
    .isEmail()
    .withMessage("Debes completar un Correo electronico válido"),
  body("direccion")
    .notEmpty()
    .withMessage("Debes completar la Dirección")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Debes ser más larga"),
  body("numerotelefono")
    .notEmpty()
    .withMessage("Debes completar el Teléfono / Celular")
    .bail()
    .isAlphanumeric()
    .withMessage("Debes completar un Teléfono / Celular válido"),
  body("detalleadicionales")
    .notEmpty()
    .withMessage("Debes completar la Descripcion detallada")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Debes ser más larga, mínimo 10 letras"),
];

// function FacturaValidationErrors(req, res, next) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(req.url);
//     console.log(req.body);
//     //console.log(validationResult(req).mapped());
//     const alert = errors.array();
//     if (req.url.indexOf("/billInsertCRUD") >= 0) {
//       //return res.status(422).jsonp(errors.array());
//       res.render("bills/billLoadCRUD", {
//         alert,
//       });
//     }
//     if (req.url.indexOf("/billEditCRUD") >= 0) {
//       return res.status(422).jsonp(errors.array());
//       res.render("bills/billEditCRUD/" + req.params.id, {
//         alert,
//       });
//     }
//   } else {
//     console.log("no hay errores: " + errors);
//     next();
//   }
// }
//FacturaValidationErrors,

// ! CRUD de los facturas

/*** Muestra la pagina del listado de los facturas con CRUD DB ***/
router.get("/billListCRUD", authMiddleware, billController.listCRUD);
router.get(
  "/billDetailCRUD/:id",
  authMiddleware,
  billController.billDetailCRUD
);
/*** Muestra la pagina de insertar las facturas con CRUD DB ***/
router.get("/billCreateCRUD", billController.billCreateCRUD);
router.post(
  "/billInsertCRUD",
  validateFactura,
  billController.createCRUD
);
/*** Muestra la pagina de modificar las facturas con CRUD DB ***/
router.get("/billEditCRUD/:id", billController.editCRUD);
router.patch(
  "/billEditCRUD/:id",
  validateFactura,
  billController.updateCRUD
);

module.exports = router;
