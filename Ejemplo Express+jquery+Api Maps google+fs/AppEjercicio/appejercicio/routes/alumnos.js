var express = require('express');
var router = express.Router();
var fs  = require("fs");

var app = express();
var path = require('path');



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Framework Express' });
  res.send("Alumnos");
});


router.get('/leerArchivo', function(req, res, next) {
    
    var datosArchivo = "";
        //console.log(path.join(__dirname)+'/informacion.txt');
        fs.readFile(path.join(__dirname)+'/informacion.txt',function(error,datos){
            if (error) 
            {
                console.log(error)
            }else{
                datosArchivo = datos.toString();
                res.send(datosArchivo);
            }
        });

    
  });

  router.get('/escribirArchivo', function(req, res, next) {
    
    var datosArchivo = "";
    fs.writeFile('./archivoPrueba.txt','Este es un texto un poco largo\nRealizado por' +
                'felipe HP',function(error){
                if (error) 
                {
                    console.log(error)
                }else{
                    console.log('Se creo el archivo correctamente');
                }

                res.send("Se creo el archivo");
            });


    
  });



  router.get('/escribirArchivoFormulario', function(req, res, next) {
    
    var datosArchivo = "";
    
    var param =  req.query.param;

    fs.writeFile('./archivoCreado.txt', param,function(error){
                if (error) 
                {
                    console.log(error)
                }else{
                    console.log('Se creo el archivo correctamente');
                }

                res.send("Se creo el archivo");
            });


    
  });


  router.get('/mapa', function(req, res, next) {

    fs.readFile(path.join(__dirname)+'/informacion.txt',function(error,datos){
        if (error) 
        {
            console.log(error)
        }else{
            datosArchivo = datos.toString();
            res.render('mapa', { informacion: datosArchivo });
        }
    });

   
  });
  

module.exports = router;