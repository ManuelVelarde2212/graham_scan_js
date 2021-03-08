function initialize() {
    //app 5 wanchaq
    var coordenadas = [
        {'lat' : '-13.530564774457712', 'lon' : '-71.96082860816003'},
        {'lat' : '-13.530653438448544', 'lon' : '-71.95994347918182'},
        {'lat' : '-13.530564774457712', 'lon' : '-71.95962697851688'},
        {'lat' : '-13.53121149927989', 'lon' : '-71.9600614963789'},
        {'lat' : '-13.531352318161495', 'lon' : '-71.96089834559469'},
        {'lat' : '-13.531894730853075', 'lon' : '-71.96066767561854'},
        {'lat' : '-13.53225981562274', 'lon' : '-71.96028143751894  '},
        {'lat' : '-13.532322401527034', 'lon' : '-71.95918709623678'},
        {'lat' : '-13.53182171383196', 'lon' : '-71.95876867162887'},
        {'lat' : '-13.530835981855082', 'lon' : '-71.95882768022743'},
        {'lat' : '-13.530314428893645', 'lon' : '-71.95912272322018'}
    ];


    var centroPunto = new google.maps.LatLng(-13.531018525121679, -71.96000248778036);

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