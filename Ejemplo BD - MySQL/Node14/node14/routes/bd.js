var mysql=require('mysql');

var conexion=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'sistema',
    port:'8889'
});

conexion.connect(function (error){
    console.log(error);

    if (error)
        console.log('Problemas de conexion con mysql');
    else
        console.log('se inicio conexion');
});


module.exports=conexion;