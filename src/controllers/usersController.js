// ? Variables y Requiere
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const db = require("../database/models/");
//const sequelize = db.sequelize;
//console.log(db.usuario_model);
// db.usuario_model.findAll().then((usuarioCrud) => {
//     //console.log(usuarioCrud);
//     usuarioCrud.forEach(function (user) {
//         //console.log(user.id)
//         console.log(user.contraseña)
//         //console.log(user);
//         db.usuario_model.update({
//             contraseña: bcrypt.hashSync(user.contraseña, 10)
//         },
//             {
//                 where: {
//                     id: user.id,
//                 },
//             })
//     })
// });

const userController = {
  /* CONTROLLER usuarios */

  /*** Pagina de login de usuario ***/
  login: (req, res) => {
    return res.render("./users/login");
  },

   /*** Pagina de forgot password de usuario ***/
  forgot: (req, res) => {
    return res.render("./users/forgot");
  },

  /*** Ejecuta el login de usuario ***/
  loginProcessCRUD: (req, res) => {
    db.usuario_model
      .findOne({
        where: {
          correoelectronico: req.body.email,
        },
      })
      .then(function (userToLogin) {
        if (userToLogin) {
        console.log('user id is ' + userToLogin);
        console.log('userObject id is ' + userToLogin.nombre + ' ' + userToLogin.apellido);
        }
        let isOKThePassword = bcrypt.compareSync(
          req.body.password,
          userToLogin.contraseña
        );
        if (isOKThePassword) {
          delete userToLogin.contraseña;
          req.session.userLogged = userToLogin;
          if (req.body.remember) {
            res.cookie("userEmail", req.body.email, {
              maxAge: 60 * 1000,
              httpOnly: true,
            });
          }
          console.log("Connection has been established successfully.");
          return res.redirect("profileCRUD");
        }
        return res.render("users/login", {
          errors: {
            email: {
              msg: "Las credenciales son inválidas",
            },
          },
        });
        //}
      })
      .catch((error) => {
        //console.log('unknown user');
        //console.log('Not found!');
        //console.error('loginProcessCRUD : ', error);
        return res.render("users/login", {
          errors: {
            email: {
              msg: "No se encuentra este email en nuestra base de datos",
            },
          },
        });
      });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  /*** Muestra el detalle de un usuario ***/
  profileCRUD: (req, res) => {
    console.log("Cookies :  ", req.cookies);
    console.log("Session :  ", req.session);
    db.usuario_model
      .findOne({
        where: {
          id: req.session.userLogged.id,
        },
      })
      .then(function (usuario) {
        res.render("users/userProfilecrud", { usuario: usuario });
      });
  },

    /*** Pagina de registro de un usuario ***/
   reportADMIN: (req, res) => {
      return res.render("./users/userReportADMIN");
    },

  /*** Pagina de registro de un usuario ***/
  register: (req, res) => {
    return res.render("./users/register");
  },

  // ! CRUD de los usuarios
  listCRUD: (req, res) => {
    db.usuario_model
      .findAll({
        attributes: { exclude: ["contraseña"] },
        include: [{ association: "pais" }, { association: "provincia" }],
      })
      .then((usuarioCrud) => {
        return res.render("users/userListcrud", { usuarioCrud });
      });
  },

  userDetailCRUD: (req, res) => {
    db.usuario_model.findByPk(req.params.id).then((usuarioCrud) => {
      return res.render("users/userDetailcrud", { usuarioCrud });
    });
  },

  userCreateCRUD: (req, res) => {
    let promPais = db.pais_model.findAll();
    let promProvincia = db.provincia_model.findAll();
    Promise.all([promPais, promProvincia])
      .then(function ([promPais, promProvincia]) {
        return res.render("users/userLoadCRUD", {
          promPais: promPais,
          promProvincia: promProvincia,
        });
      })
      .catch((error) => res.send(error));
  },

  createCRUD: function (req, res) {
    const resultValidation = validationResult(req);
    //console.log(req.body);
    //console.log(resultValidation);
    const alert = resultValidation.array();
    if (resultValidation.errors.length > 0) {
      let promPais = db.pais_model.findAll();
      let promProvincia = db.provincia_model.findAll();
      Promise.all([promPais, promProvincia])
        .then(function ([promPais, promProvincia]) {
          return res.render("users/userLoadCRUD", {
            promPais: promPais,
            promProvincia: promProvincia,
            errors: resultValidation.mapped(),
            oldData: req.body,
            alert,
          });
        })
        .catch((error) => res.send(error));
    } else {
      db.usuario_model.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correoelectronico: req.body.correoelectronico,
        contraseña: bcrypt.hashSync(req.body.contrasena, 10),
        numerotelefono: req.body.numerotelefono,
        id_pais: req.body.id_pais,
        id_provincia: req.body.id_provincia,
        imagen: req.file.originalname,
      });
      return res.redirect("/");
    }
  },

  editCRUD: function (req, res) {
    let promPais = db.pais_model.findAll();
    let promProvincia = db.provincia_model.findAll();
    let usuarioCrud = db.usuario_model.findByPk(req.params.id);
    Promise.all([promPais, promProvincia, usuarioCrud])
      .then(function ([promPais, promProvincia, usuarioCrud]) {
        return res.render("users/userEditcrud", {
          promPais: promPais,
          promProvincia: promProvincia,
          usuarioCrud: usuarioCrud,
          oldData: usuarioCrud
        });
      })
      .catch((error) => res.send(error));
  },

  updateCRUD: function (req, res) {
    const resultValidation = validationResult(req);
    console.log(req.body);
    console.log(resultValidation);
    if (resultValidation.errors.length > 0) {
      let promPais = db.pais_model.findAll();
      let promProvincia = db.provincia_model.findAll();
      let usuarioCrud = db.usuario_model.findByPk(req.params.id);
      Promise.all([promPais, promProvincia, usuarioCrud])
        .then(function ([promPais, promProvincia, usuarioCrud]) {
          const alert = resultValidation.array();
          return res.render("users/userEditcrud", {
            promPais: promPais,
            promProvincia: promProvincia,
            usuarioCrud: usuarioCrud,
            errors: resultValidation.mapped(),
            oldData: req.body,
            alert,
          });
        })
        .catch((error) => res.send(error));
    } else {
      db.usuario_model
        .update(
          {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correoelectronico: req.body.correoelectronico,
            contraseña: bcrypt.hashSync(req.body.contrasena, 10),
            numerotelefono: req.body.numerotelefono,
            id_pais: req.body.id_pais,
            id_provincia: req.body.id_provincia,
            imagen: req.file.originalname,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => res.send(error));
    }
  },

  userPassRole: (req, res) => {
    //console.log(req.body.contraseña);
    db.usuario_model.update(
      {
        contraseña: bcrypt.hashSync(req.body.contraseña, 10),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  },

  deleteCRUD: function (req, res) {
    db.usuario_model.findByPk(req.params.id).then((usuarioCrud) => {
      return res.render("users/userDeletecrud", { usuarioCrud });
    });
  },
  destroyCRUD: function (req, res) {
    db.usuario_model
      .destroy({
        where: { id: req.params.id },
        force: true,
      })
      .then(() => {
        return res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
};

module.exports = userController;
