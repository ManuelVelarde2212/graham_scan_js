function initialize() {

    var coordenadas = [
        {'lat' : '-13.526720', 'lon' : '-71.973094'},
        {'lat' : '-13.526680', 'lon' : '-71.973633'},
        {'lat' : '-13.526807', 'lon' : '-71.973568'},
        {'lat' : '-13.527444', 'lon' : '-71.972513'},
        {'lat' : '-13.528065', 'lon' : '-71.973275'},
        {'lat' : '-13.527517', 'lon' : '-71.974208'},
        {'lat' : '-13.526823', 'lon' : '-71.974154'},
        {'lat' : '-13.527350', 'lon' : '-71.973247'},
        {'lat' : '-13.527183', 'lon' : '-71.973129'},
        {'lat' : '-13.526620', 'lon' : ' -71.972775'},
        {'lat' : '-13.527345', 'lon' : ' -71.973322'},
        {'lat' : '-13.527470', 'lon' : ' -71.972796'},
        {'lat' : '-13.526927', 'lon' : ' -71.972539'},
    ];


    var centroPunto = new google.maps.LatLng(-13.527079, -71.973091);

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