const express = require('express');
const path = require('path');

const app = express();

var indexRouter = require('./routes/main');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log("Servidor grupo_6_OK");
});

module.exports = app;