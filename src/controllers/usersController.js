// ? Variables y Requiere
const fs = require('fs');
const { validationResult } = require('express-validator');
let archivoUsers = "./database/users.json";
let comicUsers = JSON.parse(fs.readFileSync(archivoUsers, "utf-8"));
const bcrypt = require("bcryptjs");
const User = require('../models/user.js');

const userController = {
    /* CONTROLLER usuarios */

    /*** Pagina de login de usuario ***/
    login: (req, res) => {
        res.render("./users/login");
    },

    /*** Ejecuta el login de usuario ***/
    loginProcess: (req, res) => {
        
        let userToLogin = User.findByField('email', req.body.email)
        //! res.send(userToLogin);
        if (userToLogin){
            let isOKThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (isOKThePassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                console.log(req.session);
                res.render("users/userDetail", { usuario: userToLogin });
            }
            return res.render('users/login', {
                errors:{
                    email:{
                        msg:'Las credenciales son inválidas'
                    }
                }
            })

        }
        return res.render('users/login', {
            errors:{
                email:{
                    msg:'No se encuentra este email en nuestra base de datos'
                }
            }
        })
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/");
    },

    /*** Pagina de registro de un usuario ***/
    register: (req, res) => {
        res.render("./users/register");
    },

    /*** Muestra el detalle de un usuario ***/
    userDetail: (req, res) => {
        let usuario = comicUsers.find((user) => user.id == req.params.userId);
        res.render("users/userDetail", { usuario: usuario, });
    },

    /*** Muestra la pagina de edicion de un usuario ***/
    userEdit: (req, res) => {
        let id = req.params.id;
        let userToEdit = comicUsers.find((user) => user.id == id);
        res.render("users/userEdit", { userToEdit, });
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
            res.render("users/userDetail", { usuario: usuario });
        } else {
            // Si hay errores, volvemos al formulario con los mensajes
            res.render("users/userEdit", { errors: errors.array(), old: req.body });
        }
    },

    /*** Muestra la pagina de eliminacion de un usuario ***/
    userDelete: (req, res) => {
        let id = req.params.id;
        let userToEdit = comicUsers.find((user) => user.id == id);
        res.render("users/userDelete", {
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
        res.render("users/userList", { comicUsers });
    },

    /*** Muestra la pagina de creacion de un usuario ***/
    userCreate: (req, res) => {
        let userToId = comicUsers[comicUsers.length - 1].id + 1;
        res.render("users/userLoad", {
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
            res.render("users/userDetail", { usuario: usuario });
        } else {
            // Si hay errores, volvemos al formulario con los mensajes
            res.render("users/userLoad", { errors: errors.array(), old: req.body });
        }
    },

    // ! Codigo para actualizar los registros de los usuarios
    //   userPassRole: (req, res) => {
    //       comicUsers.forEach(user => {
    //           user.password = bcrypt.hashSync(user.password, 10);
    //           user.role =  "user";
    //       });

};

module.exports = userController;
