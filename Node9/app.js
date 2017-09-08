//Modulos
var http = require('http');
const sql = require('mssql');


const config = {
    user: 'sa',
    password: 'felipe',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'MapaBasico1',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

//console.log(config);

//Insert
var nombre = "Felipe2";
var apellido = "Hernandez";
var edad = 28;

//console.log(db);
//Insert
new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query("insert into dbo.persona (nombre,apellido,edad) VALUES('"+nombre+"','"+apellido+"',"+edad+")")
  }).then(result => {
    let rows = result.recordset
    console.log(result);
    sql.close();
  }).catch(err => {
    console.log(err);
    sql.close();
  });


//select
new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query("select * from dbo.persona")
  }).then(result => {
    let rows = result.recordset
    console.log(result);
    sql.close();
  }).catch(err => {
    console.log(err);
    sql.close();
  });

//update
var nombre2  = "Oscar";
new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query("update dbo.persona set nombre = '"+nombre2+"' where id = 1;")
  }).then(result => {
    let rows = result.recordset
    console.log(result);
    sql.close();
  }).catch(err => {
    console.log(err);
    sql.close();
  });


  //delete
  var nombre2  = "Oscar";
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("delete from dbo.persona  where id = 2;")
    }).then(result => {
      let rows = result.recordset
      console.log(result);
      sql.close();
    }).catch(err => {
      console.log(err);
      sql.close();
    });
