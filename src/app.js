const express = require('express');
const favicon = require('serve-favicon');
const path = require('path')

const app = express();

const routerMain = require('./routes/main');
const routerProducts = require('./routes/products');
const routerUsers = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '..','public')));

app.use(favicon(__dirname + '/favicon.ico'));

app.use('/', routerMain);
app.use('/products', routerProducts);
app.use('/users', routerUsers);


app.listen(3000, () => {
  console.log("Servidor grupo_6_OK");
});