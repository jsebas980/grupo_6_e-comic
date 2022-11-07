// ? Variables y Requiere
const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override");
const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

const routerMain = require("./routes/main");
const routerProducts = require("./routes/products");
const routerUsers = require("./routes/users");
const routerBills = require("./routes/bills");

//Aquí llamo a la ruta de las api
const apiUsersRouter = require('./routes/api/users')
const apiProductsRouter = require('./routes/api/products')
const apiBillsRouter = require('./routes/api/bills')
const apiCountryDepartamentsRouter = require('./routes/api/country_departament')

//! Ejecución de la session */
app.use(
  session({
    secret: "eComic - secret!",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookies());
app.use(userLoggedMiddleware); /*middleware de aplicación que tienen que colocarse después de session*/

//! Visualizacion de las vista EJS */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//! Configuracion de la carpeta publica */
app.use(express.static(path.join(__dirname, "..", "public")));

//! Visualizacion del icono Favicon de la pestaña del navegador */
app.use(favicon(__dirname + "/favicon.ico"));

//! Configuracion del method-override */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

//! Configuracion de los router generales */
app.use("/", routerMain);
app.use("/404", routerMain);
app.use("/products", routerProducts);
app.use("/users", routerUsers);
app.use("/bills", routerBills);

//! Configuracion de las conexiones API */
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/bills', apiBillsRouter);
app.use('/api/countryDepartaments', apiCountryDepartamentsRouter);

//! Configuracion de la pagina 404 */
app.use((req, res, next) => {
  res.status(404).render("404");
});

//! Configuracion del puerto 3000 */
app.listen(PORT, () => {
  console.log("-----------------------------------------------------------*");
  console.log("Servidor ejecutandose en el puerto" + PORT);
  console.log("Grupo 6 - ir a http://localhost:3000/");
  console.log("eComic - Connection successfully!");
  console.log("-----------------------------------------------------------*");
});
