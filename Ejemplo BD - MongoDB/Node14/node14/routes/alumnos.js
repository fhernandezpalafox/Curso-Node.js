var express = require('express');
var router = express.Router();


var mongoCliente = require("mongodb").MongoClient;
var url  = "mongodb://localhost:27017/BDPruebas03";
var ObjectId = require("mongodb").ObjectId;


router.get('/', function(req, res, next) {

   mongoCliente.connect(url, function(err,db){
    if (err) throw err;

    var query = {};
    db.collection("alumnos").find(query).toArray(function(err,result){
        
        if (err) throw err;
        console.log(result);
        res.render('alumnos',{alumnos:result,page:"alumnos"});
        db.close();
    });
    
   });
});

router.get('/datos', function(req, res, next) {

  var datos =  {
        universidad:"DeLaSalle",
        alumnos:[
               {matricula:105597,alumno:"Felipe",edad:28},
               {matricula:105596,alumno:"Oscar",edad:27},
               {matricula:105599,alumno:"Luis",edad:26},
               {matricula:105597,alumno:"Pedro",edad:25}
        ],
        carrera:{web:"si",movil:"no"},
        page:"datos"
  };

  res.render("alumnosestatic",datos);

});

router.get('/alta', function(req, res, next) {
    res.render('frmusuario',{page:"alumnos",ope:"c"});
});


router.get('/modificar/:id', function(req, res, next) {

	console.log(req.params.id);
  var oId = new ObjectId(req.params.id);

  var query = {"_id": oId};

   mongoCliente.connect(url, function(err,db){
    if (err) throw err;

    db.collection("alumnos").findOne(query,function(err,result){
        
          var string=JSON.stringify(result);
          console.log('>> string: ', string );
          var json =  JSON.parse(string);

          res.render('frmusuario',{alumnos:json,page:"alumnos",ope:"u"});
          db.close();
    });
    
   });    

});

//alta,modificar,eliminar
router.post('/operacion', function(req, res, next) {
     
      var tipoOperacion = "";
      var nombre ="";
      var apellido="";
      var edad ="";

      var query = "";

      var id="";

      
      //console.log(req);
      tipoOperacion = req.body.ope;

     if (tipoOperacion == "c") {
      
      	//Ligar los datos con los campos
      	nombre = req.body.nombre;
      	apellido = req.body.apellido;
      	edad = req.body.edad;
 

        mongoCliente.connect(url, function(err,db){
        if (err) throw err;

        var query = {"Nombre":nombre,"Apellido":apellido,"Edad":edad};

        db.collection("alumnos").insertOne(query,function(err,result){
            
            if (err) throw err;
            //console.log(result);

            if (parseInt(result.insertedCount.toString()) > 0) {
                return res.send("1");
            }

            db.close();
        });
        
       });

        //query = "INSERT INTO usuarios (nombre,apellido,edad) VALUES('"+nombre+"','"+apellido+"',"+edad+");";

     }else if(tipoOperacion == "u"){
     	  
        nombre = req.body.nombre;
      	apellido = req.body.apellido;
      	edad = req.body.edad;
      	id = req.body.id;

        mongoCliente.connect(url, function(err,db){
        if (err) throw err;

         var oId = new ObjectId(id);
         var query = {"_id": oId};
         var nuevosValores = {"Nombre":nombre,"Apellido":apellido,"Edad":edad};

        db.collection("alumnos").updateOne(query,nuevosValores,function(err,resul){
            
            if (err) throw err;
            //console.log(result);
            
            if (parseInt(resul.result.nModified.toString()) > 0) {
                return res.send("1");
            }

            db.close();
        });
        
       });

     //   query = "UPDATE usuarios SET nombre = '"+nombre+"', apellido = '"+apellido+"', edad="+edad+" WHERE id = "+id+" ";
     }else if(tipoOperacion == "d"){

     	id = req.body.id;
      
      mongoCliente.connect(url, function(err,db){
        if (err) throw err;

         var oId = new ObjectId(id);
         var query = {"_id": oId};

        db.collection("alumnos").deleteOne(query,function(err,resul){
            
            if (err) throw err;
            
            console.log(resul);
            
            if (parseInt(resul.deletedCount.toString()) > 0) {
                return res.send("1");
            }

            db.close();
        });
        
       });

      //  query = "DELETE FROM usuarios WHERE id = "+id+" ";
     }

});

module.exports = router;