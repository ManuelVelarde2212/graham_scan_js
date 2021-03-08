function initialize() {

    var coordenadas = [
        {'lat' : '-13.584985362701994', 'lon' : '-72.0595750973281'},
        {'lat' : '-13.58521027520211', 'lon' : '-72.05935509079195'},
        {'lat' : '-13.585136533422313', 'lon' : '-72.05955613124739'},
        {'lat' : '-13.584915797049373', 'lon' : '-72.05966854340525'},
        {'lat' : '-13.585135178981181', 'lon' : '-72.0595850926449'},
        {'lat' : '-13.585354560709979', 'lon' : '-72.05957181638756'}
    ];


    var centroPunto = new google.maps.LatLng(-13.585125472153347, -72.06001511040039);

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