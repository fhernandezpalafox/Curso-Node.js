//Modulos
var http = require('http');
var fs = require('fs');
var url = require('url');


var mime = {
     'html' : 'text/html',
     'css' : 'text/css',
     'js' : 'text/javascript',
     'png' : 'image/png',
     'mov' : 'video/mov',
     'm4a' : 'audio/m4a'
};


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
                     
                     //Se define el tipo de dato cargado


                     console.log(path);

                     var  datosSeparados = path.split('.');
                     console.log(datosSeparados);

                     var extension =  datosSeparados[1]; //.html , .mov, .css

                     var mimeArch = mime[extension];

                     console.log("Mi estension es: "+mimeArch);

                 	resp.writeHead(200,{'Content-Type':mimeArch});
                 	resp.write(contenido);
                 	resp.end();
                 }
         	});
         }else{
         	resp.writeHead(404,{'Content-Type':'text/html'});
         	resp.write('<html><head></head><body>Recurso no existe 404</body>/html>');
         	resp.end();
         }
    });
    

});


servidor.listen(8000);

console.log("Servidor Web Iniciado");
