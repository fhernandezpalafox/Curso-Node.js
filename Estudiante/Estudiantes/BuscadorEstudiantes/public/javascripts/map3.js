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

   getPointsAll();
}


function getPointsAll() { 


    $.ajax({
        type: "POST",
        url: "/getPointsAll",
        data: {},
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