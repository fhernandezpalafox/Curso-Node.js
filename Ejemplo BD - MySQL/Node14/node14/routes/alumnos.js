var express = require('express');
var router = express.Router();

var bd=require('./bd');

router.get('/', function(req, res, next) {
    bd.query('SELECT id,nombre,apellido,edad FROM usuarios', function(error, results, fields){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('alumnos',{alumnos:results,page:"alumnos"});
    });
});


router.get('/getDatosAlumnos', function(req, res, next) {
    bd.query('SELECT id,nombre,apellido,edad FROM usuarios', function(error, results, fields){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.json(results);
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

	 bd.query('SELECT id,nombre,apellido,edad FROM usuarios WHERE id = '+req.params.id+' ', function(error, results, fields){
        if (error) {            
            console.log('error en el listado');
            return;
           }
           console.log(results);
           
            var string=JSON.stringify(results);
	        console.log('>> string: ', string );
	        var json =  JSON.parse(string);

           res.render('frmusuario',{alumnos:json,page:"alumnos",ope:"u"});
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

        query = "INSERT INTO usuarios (nombre,apellido,edad) VALUES('"+nombre+"','"+apellido+"',"+edad+");";

     }else if(tipoOperacion == "u"){
     	nombre = req.body.nombre;
      	apellido = req.body.apellido;
      	edad = req.body.edad;
      	id = req.body.id;

        query = "UPDATE usuarios SET nombre = '"+nombre+"', apellido = '"+apellido+"', edad="+edad+" WHERE id = "+id+" ";
     }else if(tipoOperacion == "d"){

     	id = req.body.id;
        query = "DELETE FROM usuarios WHERE id = "+id+" ";
     }
     //console.log("la consulta es: "+query);

      bd.query(query, function (error, results, fields){
          if (error){
              console.log(error);
              return res.send(error);
          }
         console.log(results);
        // console.log(results.affectedRows.toString());
        return res.send(results.affectedRows.toString());
      }); 

});

module.exports = router;