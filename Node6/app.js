//Modulos
var http = require('http');
var fs = require('fs');
var url = require('url');

var querystring = require("querystring");


var mime = {
     'html' : 'text/html',
     'css' : 'text/css',
     'js' : 'text/javascript',
     'png' : 'image/png',
     'mov' : 'video/mov',
     'm4a' : 'audio/m4a'
};



var servidor = http.createServer(function(request,response){

	var objUrl = url.parse(request.url);

    var path =  'pages'+objUrl.pathname;

    console.log(path);

    if (path == 'pages/') {
        path = 'pages/index.html';
    }else if (path == "pages/acceso"){
      acceso(request, response);
      return false;
    }



    //Verificacion de que si esta el archivo en la ruta 
    fs.exists(path, function(existe){

         if (existe) {

         	fs.readFile(path, function(error,contenido){
                 
                 if (error) {

                 	response.writeHead(500,{'Content-Type':'text/plain'});
                 	response.write('Error interno');
                 	response.end();

                 }else{
                     
                     //Se define el tipo de dato cargado

                     //console.log(path);

                     var  datosSeparados = path.split('.');
                     //console.log(datosSeparados);

                     var extension =   datosSeparados[datosSeparados.length - 1]; //.html , .mov, .css

                     var mimeArch = mime[extension];

                     console.log("Mi estension es: "+mimeArch);

                 	response.writeHead(200,{'Content-Type':mimeArch});
                 	response.write(contenido);
                 	response.end();
                 }
         	});
         }else{
         	response.writeHead(404,{'Content-Type':'text/html'});
         	response.write('<html><head></head><body>Recurso no existe 404</body></html>');
         	response.end();
         }
    });


    });


function acceso(request, response){
    var  informacion = "";

  request.on("data", function(datos){
         console.log(datos);
         informacion  += datos;
    });

  console.log(informacion);


     request.on("end", function(){

        var formulario = querystring.parse(informacion);

         console.log(formulario);

       var pagina ="";

        if (formulario["usuario"] != undefined && formulario["pass"] != undefined) {

	           pagina = "<html><head></head><body>"+
	         "Nombre de usuario: "+formulario["usuario"]+"<br/>"+
	         "Clave: "+formulario["pass"]+""+
	         "</body></html>";
        }else {
        	   pagina = "<html><head></head><body>Debes poner tus credenciales primero</body></html>";
        }

        
    
        response.writeHead(200,{"content-type":"text/html"});
        response.end(pagina);
     });

}


servidor.listen(8000);

console.log("Servidor Web Iniciado");






