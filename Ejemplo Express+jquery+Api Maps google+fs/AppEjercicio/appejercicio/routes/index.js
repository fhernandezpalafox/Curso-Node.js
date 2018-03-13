var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Framework Express' });
});


router.get('/sumar', function(req, res, next) {
  var num1,num2,resultado;
  num1 = 8;
  num2 = 9;
  resultado = num1 + num2;

  res.send('El resultado de la suma es :'+resultado);
});


router.post('/restar', function(req, res, next) {
  var num1,num2,resultado;
  num1 = 8;
  num2 = 9;
  resultado = num1 - num2;

  res.send('El resultado de la resta es :'+resultado);
});


router.get('/direccion', function(req, res, next) {
 res.redirect("/users/holamundo");
});

module.exports = router;
