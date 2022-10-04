// ? Variables y Requiere
const fs = require('fs');
const { validationResult } = require('express-validator');
let archivoUsers = "./database/users.json";
let comicUsers = JSON.parse(fs.readFileSync(archivoUsers, "utf-8"));
const bcrypt = require("bcryptjs");
const User = require('../models/user.js');
const { Console } = require('console');

const db = require("../database/models/");
const sequelize = db.sequelize;
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

    /*** Ejecuta el login de usuario ***/
    loginProcess: (req, res) => {
        let userToLogin = User.findByField("email", req.body.email);
        if (userToLogin) {
            let isOKThePassword = bcrypt.compareSync(
                req.body.password,
                userToLogin.password
            );
            if (isOKThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                //console.log(req.body);
                if (req.body.remember) {
                    res.cookie("userEmail", req.body.email, {
                        maxAge: 60 * 1000,
                        httpOnly: true,
                    });
                }
                return res.redirect("profile");
            }
            return res.render("users/login", {
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas",
                    },
                },
            });
        }
        return res.render("users/login", {
            errors: {
                email: {
                    msg: "No se encuentra este email en nuestra base de datos",
                },
            },
        });
    },

    loginProcessCRUD: (req, res) => {
        db.usuario_model.findOne({ 
            where: { 
                correoelectronico: req.body.email 
            } })
            .then(function (userToLogin) {
            //if (userToLogin) {
                // console.log('user id is ' + userToLogin.id);
                // console.log('userObject id is ' + userToLogin.nombre + ' ' + userToLogin.apellido);
                // console.log('password is ' + req.body.password);
                // console.log('contraseña is ' + userToLogin.contraseña);
                let isOKThePassword = bcrypt.compareSync(
                    req.body.password,
                    userToLogin.contraseña
                );
                // console.log('isOKThePassword is ' + isOKThePassword);
                if (isOKThePassword) {
                    delete userToLogin.contraseña;
                    req.session.userLogged = userToLogin;
                    //console.log(req.body);
                    if (req.body.remember) {
                        res.cookie("userEmail", req.body.email, {
                            maxAge: 60 * 1000,
                            httpOnly: true,
                        });
                    }
                    console.log('Connection has been established successfully.');
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
        }).catch((error) => {
            //console.log('unknown user');
            //console.log('Not found!');
            //console.error('loginProcessCRUD : ', error);
            return res.render("users/login", {
                errors: {
                    email: {
                        msg: "No se encuentra este email en nuestra base de datos",
                    },
                },
            })
         });
    },

    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/");
    },

    /*** Muestra el detalle de un usuario ***/
    profile: (req, res) => {
        //console.log("Cookies :  ", req.cookies);
        let usuario = comicUsers.find(
            (user) => user.id == req.session.userLogged.id
        );
        res.render("users/userProfile", { usuario: usuario });
    },

    profileCRUD: (req, res) => {
        console.log("Cookies :  ", req.cookies);
        console.log("Session :  ", req.session);
        db.usuario_model.findOne({ 
            where: { 
                id: req.session.userLogged.id 
            } })
            .then(function (usuario) {
                res.render("users/userProfilecrud", { usuario: usuario });
            });
        
    },

    /*** Pagina de registro de un usuario ***/
    register: (req, res) => {
        return res.render("./users/register");
    },

    /*** Muestra el detalle de un usuario ***/
    userDetail: (req, res) => {
        let usuario = comicUsers.find((user) => user.id == req.params.userId);
        res.render("users/userDetail", { usuario: usuario });
    },

    /*** Muestra la pagina de edicion de un usuario ***/
    userEdit: (req, res) => {
        let id = req.params.id;
        let userToEdit = comicUsers.find((user) => user.id == id);
        return res.render("users/userEdit", { userToEdit });
    },

    /*** Ejecuta la actualizacion de un usuario ***/
    userUpdate: (req, res) => {
        let errors = validationResult(req);
        //! res.send(req.body);
        //! res.send(errors);
        if (errors.isEmpty()) {
            // No hay errores, seguimos adelante
            let id = req.params.id;
            let userToEdit = comicUsers.find((user) => user.id == id);
            userToEdit = {
                id: Number(id),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                phonenumber: req.body.phonenumber,
                city: req.body.city,
                role: req.body.category,
                img: req.file.originalname,
            };
            let newUsers = comicUsers.map((user) => {
                if (user.id == id) {
                    return (user = {
                        ...userToEdit,
                    });
                }
                return user;
            });
            fs.writeFileSync(archivoUsers, JSON.stringify(newUsers, null, " "));
            let usuario = comicUsers.find((user) => user.id == id);
            return res.render("users/userDetail", { usuario: usuario });
        } else {
            // Si hay errores, volvemos al formulario con los mensajes
            return res.render("users/userEdit", {
                errors: errors.array(),
                old: req.body,
            });
        }
    },

    /*** Muestra la pagina de eliminacion de un usuario ***/
    userDelete: (req, res) => {
        let id = req.params.id;
        let userToEdit = comicUsers.find((user) => user.id == id);
        return res.render("users/userDelete", {
            userToEdit,
        });
    },

    /*** Ejecuta la eliminacion de un usuario ***/
    userDestroy: (req, res) => {
        let id = req.params.id;
        let finalUsers = comicUsers.filter((user) => user.id != id);
        fs.writeFileSync(archivoUsers, JSON.stringify(finalUsers, null, " "));
        res.send("Se ha eliminando el usuario");
    },

    /*** Imprimir todos los usuarios en una lista ***/
    userList: (req, res) => {
        return res.render("users/userList", { comicUsers });
    },

    /*** Muestra la pagina de creacion de un usuario ***/
    userCreate: (req, res) => {
        let userToId = comicUsers[comicUsers.length - 1].id + 1;
        return res.render("users/userLoad", {
            userToId,
        });
    },

    /*** Ejecuta la creacion de un usuario ***/
    userload: (req, res) => {
        let errors = validationResult(req);
        //! res.send(req.body);
        //! res.send(errors);
        if (errors.isEmpty()) {
            // No hay errores, seguimos adelante
            let idUser = comicUsers[comicUsers.length - 1].id + 1;
            let newUser = {
                id: Number(idUser),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                phonenumber: req.body.phonenumber,
                city: req.body.city,
                role: req.body.category,
                img: req.file.originalname,
            };
            comicUsers.push(newUser);
            fs.writeFileSync(archivoUsers, JSON.stringify(comicUsers, null, " "));
            let usuario = comicUsers.find((user) => user.id == idUser);
            return res.render("users/userDetail", { usuario: usuario });
        } else {
            // Si hay errores, volvemos al formulario con los mensajes
            return res.render("users/userLoad", {
                errors: errors.array(),
                old: req.body,
            });
        }
    },

    // ! Codigo para actualizar los registros de los usuarios
    //   userPassRole: (req, res) => {
    //       comicUsers.forEach(user => {
    //           user.password = bcrypt.hashSync(user.password, 10);
    //           user.role =  "user";
    //       });

    // ! CRUD de los usuarios
    listCRUD: (req, res) => {
        db.usuario_model.findAll({
            attributes: { exclude: ['contraseña'] },
            include: [{ association: 'pais' }, { association: 'provincia' }]
        }).then((usuarioCrud) => {
            return res.render("users/userListcrud", { usuarioCrud });
        });
    },

    userDetailCRUD: (req, res) => {
        db.usuario_model.findByPk(req.params.id).then((usuarioCrud) => {
            return res.render("users/userDetailcrud", { usuarioCrud });
        });
    },

    userCreateCRUD: (req, res) => {
        return res.render("users/userLoadCRUD");
    },

    createCRUD: function (req, res) {
        //console.log(req.body);
        db.usuario_model.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correoelectronico: req.body.correoelectronico,
            contraseña: req.body.contraseña,
            numerotelefono: req.body.numerotelefono,
            id_pais: req.body.id_pais,
            id_provincia: req.body.id_provincia,
            imagen: req.body.imagen,
        });
        return res.redirect("/");
    },

    editCRUD: function (req, res) {
        db.usuario_model
            .findByPk(req.params.id)
            .then((usuarioCrud) => {
                return res.render("users/userEditcrud", { usuarioCrud });
            })
            .catch((error) => res.send(error));
    },

    updateCRUD: function (req, res) {
        db.usuario_model
            .update(
                {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    correoelectronico: req.body.correoelectronico,
                    contraseña:  bcrypt.hashSync(req.body.contraseña, 10),
                    numerotelefono: req.body.numerotelefono,
                    id_pais: req.body.id_pais,
                    id_provincia: req.body.id_provincia,
                    imagen: req.body.imagen,
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
    },

    userPassRole: (req, res) => {
        //console.log(req.body.contraseña);
        db.usuario_model.update({
            contraseña: bcrypt.hashSync(req.body.contraseña, 10)
        },
            {
                where: {
                    id: req.params.id,
                },
            })
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
