//Modulos
var http = require('http');
var fs = require('fs');


//Creaccion del archivo
fs.writeFile('./archivoPrueba.txt','Este es un texto un poco largo..',
                      function(error){
	if (error) 
	{
		console.log(error)
	}else{
		console.log('Se creo el archivo correctamente');
	}
});



//Leer el archivo 
var  datosArchivo = "";
fs.readFile('./archivoPrueba.txt',function(error,datos){
	if (error) 
	{
		console.log(error)
	}else{
		datosArchivo = datos.toString();
	}
});

var servidor = http.createServer(function(req,resp){

   resp.writeHead(200,{'Content-Type':'text/html'});
   resp.write('<html><head></head><body> Los Datos leidos son: '+datosArchivo+'</body></html>');
   resp.end();

});


servidor.listen(8000);

console.log("Servidor Iniciado");
