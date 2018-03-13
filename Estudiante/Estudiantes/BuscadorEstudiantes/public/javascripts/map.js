var map;
var infowindow;
var laSalleBajio = {lat: 21.150908, lng: -101.71110470000002};
var currentMarkers = [];
var felipeMarker = null;


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: laSalleBajio,
        zoom: 15
    });


    felipeMarker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: laSalleBajio,
        icon: "/images/felipe.jpg"
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