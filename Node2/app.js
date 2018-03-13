//Modulos
var http = require('http');

var Oper = require('./Operaciones.js');

var servidor = http.createServer(function(req,resp){

   resp.writeHead(200,{'Content-Type':'text/html'});

   resp.write('<html><head></head><body>El resultado de la operacion de 2 * 2 es '
   	+Oper.multiplicacion(2,2)+'</body></html>');

   resp.end();

});


servidor.listen(8000);

console.log("Servidor Iniciado");
