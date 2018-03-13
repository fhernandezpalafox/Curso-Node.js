var express = require('express');
var router = express.Router();
var sql = require('mssql');
var bd  = require('./bd');


router.get('/', function(req, res, next) {

 //console.log(bd.getConfig());

    new sql.ConnectionPool(bd.getConfig()).connect().then(pool => {
      return pool.request().query("SELECT id,nombre,apellido,edad FROM dbo.usuarios")
      }).then(result => {
        let rows = result.recordset

        res.render('alumnos',{alumnos:rows,page:"alumnos"});
        console.log(result);
        sql.close();
      }).catch(err => {
        console.log(err);
        sql.close();
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

   new sql.ConnectionPool(bd.getConfig()).connect().then(pool => {
      return pool.request().query("SELECT id,nombre,apellido,edad FROM dbo.usuarios WHERE id = "+req.params.id+" ")
      }).then(result => {
        let rows = result.recordset

          var string=JSON.stringify(rows);
          console.log('>> string: ', string );
          var json =  JSON.parse(string);

        res.render('frmusuario',{alumnos:json,page:"alumnos",ope:"u"});
        console.log(result);
        sql.close();
      }).catch(err => {
        console.log(err);
        sql.close();
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

        new sql.ConnectionPool(bd.getConfig()).connect().then(pool => {
            return pool.request().query(query)
            }).then(result => {
              let rows = result.recordset
              console.log(result);
              return res.send(result.rowsAffected.toString());
              sql.close();
            }).catch(err => {
              console.log(err);
              return res.send(error);
              sql.close();
            });       

     }else if(tipoOperacion == "u"){
     	nombre = req.body.nombre;
      	apellido = req.body.apellido;
      	edad = req.body.edad;
      	id = req.body.id;

        query = "UPDATE usuarios SET nombre = '"+nombre+"', apellido = '"+apellido+"', edad="+edad+" WHERE id = "+id+" ";

        new sql.ConnectionPool(bd.getConfig()).connect().then(pool => {
          return pool.request().query(query)
          }).then(result => {
            let rows = result.recordset
            console.log(result);
            return res.send(result.rowsAffected.toString());
            sql.close();
          }).catch(err => {
            console.log(err);
            return res.send(error);
            sql.close();
          });

     }else if(tipoOperacion == "d"){

     	id = req.body.id;
        query = "DELETE FROM usuarios WHERE id = "+id+" ";

          new sql.ConnectionPool(bd.getConfig()).connect().then(pool => {
            return pool.request().query(query)
            }).then(result => {
               let rows = result.recordset
            console.log(result);
            return res.send(result.rowsAffected.toString());
              sql.close();
            }).catch(err => {
              console.log(err);
            return res.send(error);
              sql.close();
            });
     }
  
});

module.exports = router;