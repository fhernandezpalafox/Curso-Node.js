var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('esta es mi pagina principal');
});

app.get('/sobre', function (req, res) {
  res.send('sobre la pagina');
});

app.get('/autor', function (req, res) {
  res.send('felipe hernandez');
});

app.get('/hola', function (req, res) {
  res.send('<html><head></head><body>Pagina que dice hola</body></html>');
});


app.post('/datos', function (req, res) {
  res.send('felipe hernandez');
});

app.listen(3000, function () {
  console.log('Servidor iniciado');
});