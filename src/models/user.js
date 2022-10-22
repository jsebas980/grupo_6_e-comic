// // ? Variables y Requiere
// const fs = require("fs");

// /*** Ejecucion de las funciones para la sesion y validaciones internas ***/
// const User = {
//   filename: "./database/users.json",

//   getData: function () {
//     return JSON.parse(fs.readFileSync(this.filename, "utf-8"));
//   },

//   findAll: function () {
//     return this.getData();
//   },

//   findByPk: function (id) {
//     let allUsers = this.findAll();
//     let userFound = allUsers.find((oneUser) => oneUser.id === id);
//     return userFound;
//   },

//   findByField(field, text) {
//     let allUsers = this.findAll();
//     let userFound = allUsers.find((oneUser) => oneUser[field] === text);
//     return userFound;
//   }
// };

// module.exports = User;
