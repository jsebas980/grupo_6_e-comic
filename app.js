const express = require('express');
const path = require('path')
const app = express();

app.use('/static', express.static(__dirname + '/public'));

app.listen(3000, ()=>{
    console.log('Servidor grupo_6_OK');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});