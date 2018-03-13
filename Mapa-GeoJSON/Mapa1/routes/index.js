var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/OpenLayersGeoJSON', function(req, res, next) {
  res.render('OpenLayersGeoJSON');
});

router.get('/GoogleMapsGeoJSON', function(req, res, next) {
  res.render('GoogleMapsGeoJSON');
});

module.exports = router;
