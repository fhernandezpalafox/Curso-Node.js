//Modulos
var http = require('http');
var fs = require('fs');
var url = require('url');


var servidor = http.createServer(function(req,resp){

    var objUrl = url.parse(req.url);

    var path =  'pages'+objUrl.pathname;

    if (path == 'pages/') {
        path = 'pages/index.html';
    }

    //Verificacion de que si esta el archivo en la ruta 
    fs.exists(path, function(existe){
         if (existe) {

         	fs.readFile(path, function(error,contenido){
                 
                 if (error) {

                 	resp.writeHead(500,{'Content-Type':'text/plain'});
                 	resp.write('Error interno');
                 	resp.end();

                 }else{

                 	resp.writeHead(200,{'Content-Type':'text/html'});
                 	resp.write(contenido);
                 	resp.end();
                 }
         	});
         }else{
         	resp.writeHead(404,{'Content-Type':'text/html'});
         	resp.write('<html><head><body>Recurso no existe 404</body></head></html>');
         	resp.end();
         }
    });
    

});


servidor.listen(8000);

console.log("Servidor Web Iniciado");
