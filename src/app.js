const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

const routerMain = require('./routes/main');
const routerProducts = require('./routes/products');
const routerUsers = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '..','public')));

app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride("_method"))

app.use('/', routerMain);
app.use('/products', routerProducts);
app.use('/users', routerUsers);

app.use((req, res, next) => {
  res.status(404).render("Servidor no encuentra");
});

app.listen(3000, () => {
  console.log("Servidor grupo_6_OK");
});