var express = require('express');
var router = express.Router();

var mongoCliente = require("mongodb").MongoClient;
var url  = "mongodb://localhost:27017/alumnosSalle";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/clusteres', function(req, res, next) {
  res.render('indexClusteres');
});


router.get('/alumnosTodos', function(req, res, next) {
  res.render('indexTodos');
});


router.post("/getpoints", (req, res)=> {

    //debug("/getpoints called: ", JSON.stringify(req.body.query));

    console.log("parametros");
    //console.log(JSON.stringify(req.body.query));
    console.log(req.body);
    //console.log("l");
    
    //console.log(req.body.long);
    //console.log(req.body.lat);


    //https://docs.mongodb.com/manual/reference/operator/query/near/
    let query = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(req.body.long), 
                                  parseFloat(req.body.lat)]
                },
                $maxDistance: parseInt(req.body.distance)
            }
        }
    };

    if(req.body.type && req.body.type!='all') type = req.body.type;


    mongoCliente.connect(url, function(err,db){
    if (err) throw err;

    db.collection("alumnos").find(query).toArray(function(err,result){
        
        if (err) throw err;
        console.log(result);

        res.json(result); 
        
        db.close();
    });
    
   });

});


router.post("/getpointsAll", (req, res)=> {



    //https://docs.mongodb.com/manual/reference/operator/query/near/
    let query = {};


    mongoCliente.connect(url, function(err,db){
    if (err) throw err;

    db.collection("alumnos").find(query).toArray(function(err,result){
        
        if (err) throw err;
        console.log(result);

        res.json(result); 
        
        db.close();
    });
    
   });

});


router.post("/getDatosAlumno", (req, res)=> {

    let query = { photos: {'$regex': req.body.matricula} };

    mongoCliente.connect(url, function(err,db){
    if (err) throw err;

    db.collection("alumnos").find(query).toArray(function(err,result){
        
        if (err) throw err;
        console.log(result);

        res.json(result); 
        
        db.close();
    });
    
   });

});
module.exports = router;
