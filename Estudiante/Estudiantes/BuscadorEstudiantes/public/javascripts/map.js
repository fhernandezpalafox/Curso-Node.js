var map;
var infowindow;
var laSalleBajio = {lat: 21.150908, lng: -101.71110470000002};
var currentMarkers = [];
var felipeMarker = null;

var socket = io();

function crearNuevaVentanaChat(tipo, uiidMsg, idUsuario){ // tipo =  E (Emisor), R (Receptor)------- uiidMsg para poderChatear

    var uuidChat =  UUID.generate();

    var uuidMensaje = "";

    if (uiidMsg != null){  //Esto es para el receptor en el supuesto de que el no iniciara el dialogo con el chat
        uuidMensaje =  uiidMsg;
    }else {
        uuidMensaje =  UUID.generate();
    }

    var TemplateHtmlChat =  ' <div class="borderChat boxShadowChat" id="'+uuidChat+'" style="width: 225px;height: 230px;border:0px solid #ccc;position:relative;bottom:  0px;z-index: 9;background: #fff;max-height: 230px;-webkit-transition: max-height 0.8s;-moz-transition: max-height 0.8s;transition: max-height 0.8s;float:left;margin-left: 20px;">'+
                        ' <div class="borderChat" style="border: 0px solid #ccc;height: 35px;background-color: rgb(51, 122, 183);"> '+
                        '     <span style="padding-left: 25px;padding-top: 9px;position: absolute;color: #FFF;">Usuarios</span>'+
                        ' <span class="glyphicon glyphicon-user" style="font-size: 15px;padding-top: 10px;position: absolute;padding-left: 5px;color: #FFF;"></span>'+
                        '     <span  onclick=\"eliminarChat(\''+uuidChat+'\');\" id="barraChatUsuarios" data-abierto="1" class="glyphicon glyphicon-remove" style="color: #fff;position: absolute;right: 0px;padding-top: 10px;padding-right: 10px;cursor: pointer;"></span>'+
                        ' </div>'+
                        ' <div id="'+uuidMensaje+'" style="height: 100%;padding-top: 5px;padding-left: 5px;overflow-y:  scroll;max-height: 160px;">'+
                        ' </div>'+
                        ' <div style="border-top: 1px solid #ccc;"> '+
                        '    <input id="msg-'+uuidMensaje+'" type="text" style="width: 70%;font-size: 22px;border: 0px solid #ccc;"> '+
                        '        <input type="button" name="btnEnviar" value="Enviar" style="border: 1px solid #ccc;font-size: 15px;padding-top: 5px;" onclick=\"MandarMensaje(\''+uuidMensaje+'\');\"> '+
                        '    </div>'+
                        ' <input type="hidden" id="idChat" data-idMensaje="'+uuidMensaje+'" /> '+
                        ' <input type="hidden" id="idUsuario-'+uuidMensaje+'" data-idUsuario="'+idUsuario+'" /> '+
                        ' </div>';

                        $("#contenidoChat").append(TemplateHtmlChat);
                   
}

function eliminarChat(id){
    $("#"+id).remove();
}


function IniciarChatCon(idUsuarioDestino){
    crearNuevaVentanaChat("E",null,idUsuarioDestino);
}

function MandarMensaje(_idMensaje){

    var mensaje =  document.getElementById("msg-"+_idMensaje).value;
    var usuarioDestino =  document.getElementById("idUsuario-"+_idMensaje).getAttribute("data-idUsuario");
    var usuario  =  sessionStorage.getItem("matricula");
    var idMensaje = _idMensaje;

    socket.emit("mensaje",usuario,mensaje,usuarioDestino,idMensaje);

        var msg = '<div class="row msg_container base_sent"> '+
        ' <div class="col-md-10 col-xs-10"> '+
        '     <div class="messages msg_sent"> '+
        '         <p>'+usuario+':'+mensaje+'  </p> '+
        '         <time datetime="2009-11-13T20:00">Timothy • 51 min</time> '+
        '     </div> '+
        ' </div> '+
        ' <div class="col-md-2 col-xs-2 avatar"> '+
        '   <span class="glyphicon glyphicon-user" aria-hidden="true" style="font-size: 35px;"></span> '+
        ' </div> '+
        ' </div> ';

      $('#'+_idMensaje)
        .append(msg)
        .animate({scrollTop: $('#'+_idMensaje).prop('scrollHeight')}, 0);

        document.getElementById("msg-"+_idMensaje).value = "";
}

function mostrarDialogo(){
    BootstrapDialog.show({
        size: BootstrapDialog.SIZE_SMALL,
        title: 'Buscador de alumnos',
        message: $('<textarea id="txtMatricula" class="form-control" placeholder="Captura tu matricula..."></textarea>'),
        buttons: [{
            label: 'Consultar',
            cssClass: 'btn-primary',
            hotkey: 13, // Enter.
            action: function(dialog) {
                
               var  matricula =  document.getElementById("txtMatricula").value;
               //alert('Tu capturaste '+matricula);
               consultaMatricula(matricula, dialog);
               
            }
        }]
    });
}

function initMap() {

    mostrarDialogo();

    map = new google.maps.Map(document.getElementById('map'), {
        center: laSalleBajio,
        zoom: 15
    });

    //Evento de agregar marcador por el usuario logeado
    google.maps.event.addListener(map, 'click', function(event) {

        BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            title: 'Agregar marcador',
            message: $('<input type="text" id="txtTitulo" class="form-control" placeholder="Captura un titulo..."/> </br><input type="text" id="txtDescripcion" class="form-control" placeholder="Captura tu descripcion..."/>'),
            buttons: [{
                label: 'Insertar',
                cssClass: 'btn-primary',
                hotkey: 13, // Enter.
                action: function(dialog) {
                    
                   var  titulo =  document.getElementById("txtTitulo").value;
                   var  descripcion =  document.getElementById("txtDescripcion").value;
                   
                   agregarMarcadorEnLinea(event.latLng, map, titulo,descripcion,dialog);
                   
                }
            }]
        });

    });

    InicializadorToast();

/*
    //saber quien esta cercas de mi ubicacion ubicacion
    setInterval(function () {
        try {
            navigator.geolocation.getCurrentPosition(function (position) {
                let coords = {lng: position.coords.longitude, lat: position.coords.latitude};
                felipeMarker.setPosition(new google.maps.LatLng(coords.lat, coords.lng));
                getPoints(coords.lng,coords.lat,  800, 'all');
            });
        } catch (e) {
            console.log("without position");
        }

    }, 1000);
*/
}

function agregarMarcadorEnLinea(latlng, map,titulo,descripcion,dialog){

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: titulo
    });

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + descripcion+ '</h1>' +
        '<div id="bodyContent">' +
        '</div>' +
        '</div>';


    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
    });


     //Clases para emitirlo
     class Marcador{
        constructor(latlng,titulo,descripcion) {
            this.latlng = latlng;
            this.titulo = titulo;
            this.descripcion = descripcion;
          }
    }

    var usuario  =  sessionStorage.getItem("matricula");
    socket.emit("agregar marcador", usuario, new Marcador(latlng,titulo,descripcion));

    dialog.close();
}

function InicializadorToast(){
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = 3000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;
}

function consultaMatricula(matricula, dialog){

    $.ajax({
        type: "POST",
        url: "/getDatosAlumno",
        data: {matricula: matricula},
        success: function (data) {

            dialog.close();

            console.log(data);

            sessionStorage.setItem("matricula",matricula);

            class Usuario{
                constructor(img,nombre,matricula) {
                    this.nombre = nombre;
                    this.matricula = matricula;
                    this.img = img;
                  }
            }

            socket.emit('agrega usuario', new Usuario(data[0].photos[0],
                                                      data[0].name,
                                                      matricula));

            felipeMarker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: laSalleBajio,
                icon: "/images/Estudiantes/"+data[0].photos[0]
            });
        
            felipeMarker.addListener('click', function (event) {
                if (felipeMarker.getAnimation() !== null) {
                    felipeMarker.setAnimation(null);
                } else {
                    felipeMarker.setAnimation(google.maps.Animation.BOUNCE);
                }
            });
        
            felipeMarker.addListener('dragend', function (event) {
                clearMarkers();
                //console.log(event);
                getPoints(event.latLng.lng(), event.latLng.lat(), 800, 'all');
        
            });
        },
        dataType: "json"
    });

}

socket.on('usuarios', (data) => {

    $("#usuariosLinea").html("");

    data.forEach(d => {

        //si hay uno repetido no lo agregue

        if (d.matricula != sessionStorage.getItem("matricula")){

            //onclick=\"eliminarChat(\''+uuidChat+'\');\" 
            $("#usuariosLinea").append("<div onclick=\"IniciarChatCon(\'"+d.matricula+"\');\" id='"+d.matricula+"' style='height: 30px;border-bottom: 1px solid #d7dadc;cursor: pointer;'>"+
                                        "  <div style='float:left'>"+
                                        "  <img src='/images/Estudiantes/"+d.img+"' style='width: 28px;border-radius: 50%;'> "+
                                        "  </div> "+
                                        "  <div style='float: left;padding-left: 5px;line-height: 25px;'>"+d.nombre+"</div> "+
                                        "  <div style='clear:both'></div> "+
                                        "  </div>");
        }
       
    });
    console.log(data);
});

socket.on("usuarioLogeado", (data)=> {

    console.log(data);

    if(sessionStorage.getItem("matricula")!=null){
    
        if(sessionStorage.getItem("matricula") != data.matricula){

            toastr.success('Entro el usuario '+data.nombre, 'Usuarios');
        }
    }else {
        toastr.success('Entro el usuario '+data.nombre, 'Usuarios');
    }
    
});

socket.on("agregar marcador",(usuario, marcador)=>{

    //console.log(usuario);
    //console.log(marcador);

    var marker = new google.maps.Marker({
        map: map,
        position: marcador.latlng,
        title: marcador.titulo
    });

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + marcador.descripcion+ '</h1>' +
        '<div id="bodyContent">' +
        '</div>' +
        '</div>';


    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
    });


});

socket.on('disconnect', () => {
   console.log('you have been disconnected');
});

socket.on("marcadores",(data) => {
 console.log(data);
});

socket.on("mensaje",(usuario,mensaje,usuarioDestino,idMensaje) => {

    if(sessionStorage.getItem("matricula")!=null){

        if(usuarioDestino == sessionStorage.getItem("matricula")){

            //Verifica si ya existe un elemento del chat
            if (document.getElementById(idMensaje)==null){
                
                crearNuevaVentanaChat("R", idMensaje,usuario);

                var msg = '<div class="row msg_container base_receive"> '+
                ' <div class="col-md-2 col-xs-2 avatar"> '+
                '   <span class="glyphicon glyphicon-user" aria-hidden="true" style="font-size: 35px;"></span> '+
                ' </div> '+
                ' <div class="col-md-10 col-xs-10"> '+
                '     <div class="messages msg_receive"> '+
                '         <p>'+usuario+':'+mensaje+'  </p> '+
                '         <time datetime="2009-11-13T20:00">Timothy • 51 min</time> '+
                '     </div> '+
                ' </div> '+
                ' </div> ';
            
                $('#'+idMensaje)
                    .append(msg)
                    .animate({scrollTop: $('#'+idMensaje).prop('scrollHeight')}, 0);

            }else {

                var msg = '<div class="row msg_container base_receive"> '+
                ' <div class="col-md-2 col-xs-2 avatar"> '+
                '     <span class="glyphicon glyphicon-user" aria-hidden="true" style="font-size: 35px;"></span>  '+
                ' </div> '+
                ' <div class="col-md-10 col-xs-10"> '+
                '     <div class="messages msg_receive"> '+
                '         <p>'+usuario+':'+mensaje+'  </p> '+
                '         <time datetime="2009-11-13T20:00">Timothy • 51 min</time> '+
                '     </div> '+
                ' </div> '+
                ' </div> ';
        
            $('#'+idMensaje)
                .append(msg)
                .animate({scrollTop: $('#'+idMensaje).prop('scrollHeight')}, 0);

            }
        }

    }
    console.log(usuario);
    console.log(mensaje);
    console.log(usuarioDestino);
    console.log(idMensaje);
});

function salirSistema(){

    if(sessionStorage.getItem("matricula")!=null){

        sessionStorage.removeItem("matricula");

        socket.emit('disconnect', socket);

        window.location.reload();
    }
}

function getPoints(long, lat, distance, type) { 

    if (long == 0) long = laSalleBajio.lng;
    if (lat == 0) lat = laSalleBajio.lat;
    if (distance == 0) distance = 1000000000;

    /*
    console.log(long);
    console.log(lat);
    console.log(distance);
    console.log(type);
   */

    $.ajax({
        type: "POST",
        url: "/getpoints",
        data: {long: long, lat: lat, distance: distance, type: type},
        success: function (data) {

            data.forEach(p => {
                p.location.lng = p.location.coordinates[0];
                p.location.lat = p.location.coordinates[1];
                let icon;
                if (p.type == "Estudiante") {
                    p.photos[0] = "/images/Estudiantes/" + p.photos[0];
                    icon = p.photos[0];
                }
                createMarker(p, icon);
            });
        },
        dataType: "json"
    });
}

function clearMarkers() {
    currentMarkers.forEach(m=> m.setMap(null));
    currentMarkers = [];
}

function createMarker(item, icon) {
    var marker = new google.maps.Marker({
        map: map,
        position: item.location,
        title: item.name,
        icon: icon
    });

    currentMarkers.push(marker);
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + item.name + '</h1>' +
        '<div id="bodyContent">' +
        '<img src="' + item.photos[0] + '"/>' +
        '</div>' +
        '</div>';


    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
    });


}