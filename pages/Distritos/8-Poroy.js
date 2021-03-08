function initialize() {

    var coordenadas = [
        {'lat' : '-13.494745388682812', 'lon' : '-72.04202903388351'},
        {'lat' : '-13.494756354630768', 'lon' : '-72.04284776584683'},
        {'lat' : '-13.494874786836723', 'lon' : '-72.04317029662025'},
        {'lat' : '-13.494798025228455', 'lon' : '-72.04343644089482'},
        {'lat' : '-13.495144548864298', 'lon' : '-72.0435063601534'},
        {'lat' : '-13.495313424124795', 'lon' : '-72.04297858252416'},
        {'lat' : '-13.495462560619169', 'lon' : '-72.04261094255166'},
        {'lat' : '-13.495684072005018', 'lon' : '-72.04211023044185'},
        {'lat' : '-13.495339742336455', 'lon' : '-72.04186889622679'},
        {'lat' : '-13.494966900734072', 'lon' : '-72.04212601866153'},
        {'lat' : '-13.494675206603896', 'lon' : '-72.04236509741666'},
        {'lat' : '-13.494879173213599', 'lon' : '-72.04290415234567'}
    ];


    var centroPunto = new google.maps.LatLng(-13.495089719208572, -72.04276431382853);

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