var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/pages'));
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/acceso', function (req, res) {  

    var usuario  =  req.body.usuario;
    var password = req.body.pass;

     var pagina = "<html><head></head><body>"+
     "Nombre de usuario: "+usuario+"<br/>"+
     "Clave: "+password+""+
     "</body>/html>";
    
     res.send(pagina);
});


app.get('/acceso2', function (req, res) {   

    var usuario  =  req.query.usuario;
    var password = req.query.pass;

     var pagina = "<html><head></head><body>"+
     "Nombre de usuario: "+usuario+"<br/>"+
     "Clave: "+password+""+
     "</body></html>";
    
     res.send(pagina);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});