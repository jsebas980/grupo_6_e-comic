const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

let carpetas = "views";
let enlaces = [];

app.use("/static", express.static(__dirname + "/public"));

fs.readdirSync("./" + carpetas).forEach((file) => {
  enlaces.push(file);
});

enlaces.forEach((enlace) => {
  enlaceCorto = enlace.substring(0, enlace.length - 5);
  if (enlaceCorto === "index") {
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "/views/index.html"));
    });
  } else {
    app.get("/" + enlaceCorto, (req, res) => {
      res.sendFile(path.join(__dirname, "/views/" + enlace));
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor grupo_6_OK");
});
