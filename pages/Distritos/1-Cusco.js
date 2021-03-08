function initialize() {

    var coordenadas = [
        {'lat' : '-13.516662599663146', 'lon' : '-71.97961907915501'},
        {'lat' : '-13.51617752658703', 'lon' : '-71.97927575639964'},
        {'lat' : '-13.516709542166513', 'lon' : '-71.97902899316922'},
        {'lat' : '-13.516240116716844', 'lon' : '-71.97968881658969'},
        {'lat' : '-13.516323570197683', 'lon' : '-71.98020916514079'},
        {'lat' : '-13.516036698734874', 'lon' : '-71.97986047796736'},
    ];


    var centroPunto = new google.maps.LatLng(-13.516813712132624, -71.97889646074974);

    var mapaOpciones = {
        zoom: 19,
        center: centroPunto,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    var map = new google.maps.Map(document.getElementById('map-canvas'), mapaOpciones);

    var poligono;
    var poligonoHull;
    var convexHull = new ConvexHullGrahamScan();


    poligono = new google.maps.Polygon({
        paths: coordenadas.map(function(item){
            return new google.maps.LatLng(item.lat, item.lon);
        }),
        strokeColor: '#000',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#000',
        fillOpacity: 0.1
    });


    coordenadas.forEach(function (item) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.lat, item.lon),
            map: map
        });
        convexHull.añadirPunto(item.lon, item.lat);
    });


    if (convexHull.puntos.length > 0) {
        var hullPuntos = convexHull.getHull();

        // Convertir a objetos lat-lng de Google 
        hullPuntos = hullPuntos.map(function (item) {
            return new google.maps.LatLng(item.y, item.x);
        });

        console.log(hullPuntos);

        poligonoHull = new google.maps.Polygon({
            paths: hullPuntos,
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'red',
            fillOpacity: 0.35
        });

        poligonoHull.setMap(map);

    }
}

google.maps.event.addDomListener(window, 'load', initialize);  