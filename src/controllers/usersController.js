const fs = require('fs');
let archivo = './database/users.json';
//let comicUsers = JSON.parse(fs.readFileSync(archivo, 'utf-8'))

const userController = {
    login: (req, res) => {
        res.render("./users/login");
    },
    register: (req, res) => {
        res.render("./users/register");
    },
};

module.exports = userController;