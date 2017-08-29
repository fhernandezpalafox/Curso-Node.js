//Modulos
var http = require('http');
var upperCase = require('upper-case');

var servidor = http.createServer(function(req,resp){

   resp.writeHead(200,{'Content-Type':'text/html'});
   resp.write('<html><head><body> Mi nombre es  felipe y en mayusculas es: '+upperCase("felipe")+'</body></head></html>');
    //N(n)
   resp.end();

});


servidor.listen(8000);

console.log("Servidor Iniciado");
