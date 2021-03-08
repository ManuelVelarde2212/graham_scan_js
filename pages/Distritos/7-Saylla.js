function initialize() {
    //7 saylla
    var coordenadas = [
        {'lat' : '-13.568365809698799', 'lon' : '-71.8276162954174'},
        {'lat' : '-13.569163882560813', 'lon' : '-71.8286808725157'},
        {'lat' : '-13.56998826270005', 'lon' : '-71.82820271500545'},
        {'lat' : '-13.56973393296247', 'lon' : '-71.8291770737056'},
        {'lat' : '-13.569795322924081', 'lon' : '-71.82754412069887'},
        {'lat' : '-13.570391681724887', 'lon' : '-71.8278959724517'},
        {'lat' : '-13.570821409931945', 'lon' : '-71.82729150918401'},
        {'lat' : '-13.570944189276796', 'lon' : '-71.82803130004895'},
        {'lat' : '-13.569067412357407', 'lon' : '-71.82783281957299'},
    ];
    
    var centroPunto = new google.maps.LatLng(-13.56950591296607, -71.82804934372858);

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