const express = require('express');
const path = require('path')

const app = express();

var indexMain = require('./routes/main');

// view engine setup
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, '../public')))

app.use('/', indexMain);

app.listen(3000, () => {
  console.log("Servidor grupo_6_OK");
});