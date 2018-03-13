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
    }else if (path == "pages/tablaMultiplicar"){
      tablaMultiplicar(request, response);
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

function tablaMultiplicar(request, response){
    var  informacion = "";

    var tablaAMultiplicar  = url.parse(request.url,true).query.numero;
    console.log(tablaAMultiplicar);

    var pagina  ="";

   if (!isNaN(tablaAMultiplicar)) //Not a Number =  NaN
    {
         pagina = "<html><head></head><body>";
          for (var i = 1; i <= 10; i++) {
              pagina += ""+tablaAMultiplicar+"x"+i+"="+(tablaAMultiplicar * i)+"<br/>";
          }
         pagina += "</body></html>";
    }else {

           pagina = "<html><head></head><body>No es numero lo que estas pasando</body></html>";
    }


     response.writeHead(200,{"content-type":"text/html"});
     response.end(pagina);

}


servidor.listen(8000);

console.log("Servidor Web Iniciado");
