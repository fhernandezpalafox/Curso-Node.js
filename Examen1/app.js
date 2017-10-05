var http=require('http');
var url=require('url');
var fs=require('fs');

var querystring = require("querystring");

var mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
	 'woff' : 'application/x-font-woff',
   'eot'  : 'application/x-font-eot',
	 'svg'  : 'application/x-font-svg',
	 'ttf'  : 'application/x-font-ttf',
	 'woff2': 'application/x-font-woff2'
};

var servidor=http.createServer(function(req,response){
    var objetourl = url.parse(req.url);
    var path='Page'+objetourl.pathname;

		if (path == 'Page/') {
			 path = 'Page/index.html';
	 }else if (path == "Page/Alta"){
		 path = 'Page/frmusuario.html';
	 }else if (path == "Page/Lista"){
		 Lista(req, response);
		 return false;
	 }else if(path == "Page/Crear"){
		 Crear(req, response);
		 return false;
	 }else if(path == "Page/Eliminar"){
		 Eliminar(req, response);
		 return false;
	 }

    fs.exists(path,function(existe){
        if (existe) {
            fs.readFile(path,function(error,contenido){
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write('Error interno');
                    response.end();
                } else {
									console.log(path);
                    var vec = path.split('.');
                    var extension=vec[vec.length-1];
										console.log(extension);
                    var mimearchivo=mime[extension];
                    response.writeHead(200, {'Content-Type': mimearchivo});
                    response.write(contenido);
                    response.end();
                }
            });
        } else {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
            response.end();
        }
    });
});

function Crear(request, response){
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

       var datos="";

       fs.readFile('./alumnos.txt',function(error,datos){
       if (error) {
           console.log(error);
       }
       else {
          datos  =  datos.toString();

          datos  += formulario["nombre"]+","+formulario["apellido"]+","+formulario["edad"]+"-";
          fs.writeFile('./alumnos.txt',datos,function(error){
               if (error){
                  console.log(error);
               }
               else {
                 response.writeHead(200,{"content-type":"text/html"});
                 response.end("1");
               }
           });
       }
   });




     });

}


function Lista(request, response){
       var edadValidar = 28;
       var pagina ="";
       var css  = "";

       fs.readFile('./alumnos.txt',function(error,datos){
       if (error) {
           console.log(error);
       }
       else {
          datos  =  datos.toString();
          pagina = "<html><head><script type='text/javascript' src='jquery.min.js'></script><script type='text/javascript' src='operaciones.js'></script><link rel='stylesheet' type='text/css' href='bootstrap.min.css'></head><body class='content' style='padding:10px'><h1>Lista</h1><a href='/' class='btn btn-link'>";
          pagina += "<span class='glyphicon glyphicon-chevron-left'></span>";
          pagina	+= "Regresar</a>";

           var  d =  datos.slice(0,-1);
           console.log(d);
           var a = d.split("-");
            pagina += "<table class='table'><tr><td>Nombre</td><td>Apellido</td><td>Edad</td><td></td></tr>";
            console.log(a);
            for (var i = 0; i < a.length; i++) {
              var c =  a[i].split(",");
              console.log(c);
              css = (parseInt(c[2]) >= 28)?"background: #ded6d6":"";
              pagina += "<tr style='"+css+"'><td>"+c[0]+"</td><td>"+c[1]+"</td><td>"+c[2]+"</td><td>";
              pagina += "<button type='button' class='btn btn-danger' aria-label='Left Align' style='margin-bottom: 2px;margin-top: 2px;'";
              pagina +=	"onclick=\"eliminarUsuario('"+c[0]+"')\">";
              pagina +=	"<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>";
              pagina +=	"</button></td></tr>";
            }
          pagina += "</table>";
          pagina += "</body></html>";

          response.writeHead(200,{"content-type":"text/html"});
          response.end(pagina);
        }
      });

}


function Eliminar(request, response){
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

       var datos="";

       fs.readFile('./alumnos.txt',function(error,datos){
       if (error) {
           console.log(error);
       }
       else {
          datos  =  datos.toString();

          //Separacion
          var  d =  datos.slice(0,-1);
          //console.log(d);
          var a = d.split("-");


          var respuesta = "1";
          var AlumnosDatos = "";
          var g ="";
          var e ="";

          for (var i = 0; i < a.length; i++) {
            var c =  a[i].split(",");

           //console.log(c[0]+"+"+formulario["id"]);
            if (c[0] != formulario["id"]) {
               e  += c[0]+","+c[1]+","+c[2]+","+"N"+"-";
             }else {
               e  += c[0]+","+c[1]+","+c[2]+","+"S"+"-";
             }

           }
           //console.log(e);
           //return false;

            var f = e.slice(0,-1);
            var h  = f.split("-");
            for (var i = 0; i < h.length; i++) {
                var k = h[i].split(",");

                if (k[3] == "S" && parseInt(k[2]) >= 28) {
                   respuesta  = "2";
                   g  += k[0]+","+k[1]+","+k[2]+"-";
                }else if (k[3] == "N") {
                   g  += k[0]+","+k[1]+","+k[2]+"-";
                }

            }

            console.log("Respuesta"+respuesta);
            console.log(g);

            e = g;


          fs.writeFile('./alumnos.txt',e,function(error){
               if (error){
                  console.log(error);
               }
               else {
                 response.writeHead(200,{"content-type":"text/html"});
                 response.end(respuesta);
               }
           });
       }
   });




     });

}

servidor.listen(8888);

console.log('Servidor web iniciado');
