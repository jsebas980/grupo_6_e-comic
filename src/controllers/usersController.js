const fs = require('fs');
let archivoUsers = './database/users.json';
let comicUsers = JSON.parse(fs.readFileSync(archivoUsers, 'utf-8'))

const userController = {
    login: (req, res) => {
        res.render("./users/login");
    },
    register: (req, res) => {
        res.render("./users/register");
    },

    /*** Obtener un usuario ***/
    userDetail: (req, res) => {
        let usuario = comicUsers.find(user => user.id == req.params.userId);
        res.render("users/userDetail", {
            usuario: usuario
        });
    },

    /*** Editar un usuario***/
    userEdit: (req, res) => {
        let id = req.params.id
        let userToEdit = comicUsers.find(user => user.id == id)
        res.render('users/userEdit', {
            userToEdit
        })
    },

    userUpdate: (req, res) => {
        let id = req.params.id
        let userToEdit = comicUsers.find(user => user.id == id)

        // let image
        // if (req.files[0] != undefined) {
        //     image = req.files[0].filename
        // } else {
        //     image = productToEdit.image
        // }

        userToEdit = {
            id: Number(id),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
            city: req.body.city,
            gender: req.body.gender,
            category: req.body.category,
            img: req.file.originalname
        };

        let newUsers = comicUsers.map(user => {
            if (user.id == id) {
                return user = {
                    ...userToEdit
                };
            }
            return user;
        })

        fs.writeFileSync(archivoUsers, JSON.stringify(newUsers, null, ' '));
        let usuario = comicUsers.find(user => user.id == id);
       res.render("users/userDetail", { usuario: usuario })
    },

    /*** Eliminar un usuario***/
    userDelete: (req, res) => {
        let id = req.params.id
        let userToEdit = comicUsers.find(user => user.id == id)
        res.render('users/userDelete', {
            userToEdit
        })
    },

    userDestroy: (req, res) => {
        let id = req.params.id;
        let finalUsers = comicUsers.filter(user => user.id != id);

        fs.writeFileSync(archivoUsers, JSON.stringify(finalUsers, null, ' '));
        res.send('Se ha eliminando el usuario');
    },

    /*** Imprimir todos los usuarios***/
    userList: (req, res) => {
        res.render("users/userList", { comicUsers });
    },

    /*** Crear un producto OK***/
    userCreate: (req, res) => {
        res.render('users/userLoad')
    },

    userload: (req, res) => {
        let image
        let idUser = comicUsers[comicUsers.length - 1].id + 1;
        console.log(req.file);
       if(req.file != undefined){
       image = req.file.originalname
       } else {
       image = 'default.jpg'
       }
       let newUser = {
           id: idUser,
           firstname: req.body.firstname,
           lastname: req.body.lastname,
           email: req.body.email,
           password: req.body.password,
           phonenumber: req.body.phonenumber,
           city: req.body.city,
           gender: req.body.gender,
           category: req.body.category,
           img: image
       };
       comicUsers.push(newUser)
       fs.writeFileSync(archivoUsers, JSON.stringify(comicUsers, null, ' '));
       let usuario = comicUsers.find(user => user.id == idUser);
       res.render("users/userDetail", { usuario: usuario })
   },
};

module.exports = userController;