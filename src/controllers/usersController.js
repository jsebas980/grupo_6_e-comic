// ? Variables y Requiere
const fs = require('fs');
const { validationResult } = require('express-validator');
let archivoUsers = "./database/users.json";
let comicUsers = JSON.parse(fs.readFileSync(archivoUsers, "utf-8"));
const bcrypt = require("bcryptjs");
const User = require('../models/user.js');
const { Console } = require('console');

const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Usuarios = db.UsuarioModel;

const userController = {
    /* CONTROLLER usuarios */

    /*** Pagina de login de usuario ***/
    login: (req, res) => {
        return res.render("./users/login");
    },

    /*** Ejecuta el login de usuario ***/
    loginProcess: (req, res) => {
        
        let userToLogin = User.findByField('email', req.body.email)
        if (userToLogin){
            let isOKThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (isOKThePassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                console.log(req.body);
                if(req.body.remember){
                    res.cookie('userEmail', req.body.email, { maxAge: 60 * 1000, httpOnly: true });
                }
                return res.redirect('profile');
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
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/");
    },

      /*** Muestra el detalle de un usuario ***/
    profile: (req, res) => {
        console.log("Cookies :  ", req.cookies);
        let usuario = comicUsers.find((user) => user.id == req.session.userLogged.id);
        res.render("users/userProfile", { usuario: usuario });
    },

    /*** Pagina de registro de un usuario ***/
    register: (req, res) => {
        return res.render("./users/register");
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
        return res.render("users/userEdit", { userToEdit, });
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
            return res.render("users/userEdit", { errors: errors.array(), old: req.body });
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
            return res.render("users/userLoad", { errors: errors.array(), old: req.body });
        }
    },

    // ! Codigo para actualizar los registros de los usuarios
    //   userPassRole: (req, res) => {
    //       comicUsers.forEach(user => {
    //           user.password = bcrypt.hashSync(user.password, 10);
    //           user.role =  "user";
    //       });


    // ! CRUD de los usuarios
    list: (req, res) => {
        Usuarios.findAll()
            .then(usuarioCrud => {
                return res.render('users/usuarioListcrud.ejs', {usuarioCrud})
            })
    },
    detail: (req, res) => {
        Movies.findByPk(req.params.id)
            .then(movie => {
                return res.render('moviesDetail.ejs', {movie});
            });
    },
    new: (req, res) => {
        Movies.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                return res.render('newestMovies', {movies});
            });
    },
    recomended: (req, res) => {
        Movies.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                return res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll()
        .then(allGenres => {
            return res.render("moviesAdd", {allGenres:allGenres})
        })
        .catch(error => res.send(error))
    },

    create: function (req,res) {
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        });
        return res.redirect('/movies');
    },

    edit: function(req,res) {
        let promMovies = Movies.findByPk(req.params.id);
        let promGenres = Genres.findAll();
        Promise
        .all([promMovies, promGenres])
        .then(function([Movie, allGenres]) {
            return  res.render('moviesEdit', {Movie:Movie, allGenres:allGenres})})
        .catch(error => res.send(error))
    },

    update: function (req,res) {
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        },{
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            return res.redirect('/movies')})
        .catch(error => res.send(error));
    },

    delete: function (req,res) {
        let Movie = Movies.findByPk(req.params.id)
        return res.redirect(('/moviesDelete'), {Movie:Movie})
    },
    destroy: function (req,res) {
        Movies.destroy({
            where: {id: req.params.id},
            force: true
            })
            .then(()=>{
                return res.redirect('/movies');
            })
            .catch(error => res.send(error))         
    }


};

module.exports = userController;
