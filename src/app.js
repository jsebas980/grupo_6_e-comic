const express = require('express');
const favicon = require('serve-favicon');
const path = require('path')

const app = express();

const indexMain = require('./routes/main');

// view engine setup
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, '../public')));

app.use(favicon(__dirname + '/favicon.ico'));

app.use('/', indexMain);

app.listen(3030, () => {
  console.log("Servidor grupo_6_OK");
});