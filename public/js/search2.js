// ? Variables y Requiere
<<<<<<< HEAD
let palabra = "";
if (typeof window !== "undefined") {
  window.addEventListener("load", function () {
    let control = document.querySelector("#search");
    //let control= document.querySelector("input")
    console.log(control);
    control.addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        console.log("Presionaste enter");
        alert("Se presionó la tecla: " + e.key);
        palabra = control.value;
        return palabra;
        //router.get('/', mainController.searchCRUD);
      }
    });
  });
}
console.log(palabra);
//insertar en una variable el valor y exportar el resultado
//export default palabra
module.exports = { palabra };
=======
//const express = require('express');
//const router = express.Router();
//const mainController = require('../../src/controllers/mainController');

//const { body } = require("express-validator")
//const req = require("express/lib/request")
let palabra =''
if(typeof window !== 'undefined') {

    window.addEventListener("load",function(){
        let control= document.querySelector("#search")
        //let control= document.querySelector("input")
        console.log(control)
        control.addEventListener("keypress",function(e){
            if (e.key=="Enter"){
                console.log("Presionaste enter")
                alert("Se presionó la tecla: "+ e.key)
                palabra=control.value
                return palabra
                //router.get('/', mainController.searchCRUD);
            }
        })
    })
}
console.log(palabra)
//insertar en una variable el valor y exportar el resultado
//export default palabra
module.exports = {palabra}
>>>>>>> a9efbc54e62ff3446c39ff139a50452e5b8b0d1d
