var express = require('express');
var router = express.Router();

//var http = require('http').Server(app);
//var io = require('socket.io')(http);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Google Maps' });
});


router.get('/iniciandoMapa', function(req, res, next) {
  res.render('mapa1');
});

router.get('/geolocalizacion', function(req, res, next) {
  res.render('mapa2');
});


router.get('/busquedas', function(req, res, next) {
  res.render('mapa3');
});

router.get('/trazoRutas', function(req, res, next) {
  res.render('mapa4');
});

router.get('/trazoRutas2', function(req, res, next) {
  res.render('mapa5');
});


router.get('/panel', function(req, res, next) {
  res.render('mapa6');
});


router.get('/vistaPanoramica', function(req, res, next) {
  res.render('mapa7');
});

router.get('/lugaresMarcados', function(req, res, next) {
  res.render('mapa8');
});



module.exports = router;
