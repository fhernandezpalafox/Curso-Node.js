var map;
var infowindow;
var laSalleBajio = {lat: 21.150908, lng: -101.71110470000002};
var currentMarkers = [];
var felipeMarker = null;

var locations = [];

function  initMap2(){

     map = new google.maps.Map(document.getElementById('map'), {
        center: laSalleBajio,
        zoom: 4
    });

     $.ajax({
        type: "POST",
        url: "/getpointsAll",
        data: {},
        success: function (data) {

            data.forEach(p => {
                locations.push({lat:p.location.coordinates[1],
                                lng:p.location.coordinates[0],
                                icon : "/images/Estudiantes/"+p.photos[0],
                                title: p.name,});
            });

            //console.log(locations);
            var markers = locations.map(function(location, i) {
                //console.log(location);
                 var l  = new google.maps.Marker({
                    position: location,
                    icon: location.icon,
                    title:location.title
                  });

                  crearEvento(l);
                  return l;
                });

            //console.log(markers);

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
        },
        dataType: "json"
    });

}

function crearEvento(markers){

            var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">' + markers.title + '</h1>' +
            '<div id="bodyContent">' +
            '<img src="' + markers.icon + '"/>' +
            '</div>' +
            '</div>';


            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(markers, 'click', function () {
                infowindow.setContent(contentString);
                infowindow.open(map, this);
            });
}



