function initialize() {

    var coordenadas = [
        {'lat' : '-13.543673359570183', 'lon' : '-71.88880708298066'},
        {'lat' : '-13.543946251683693', 'lon' : '-71.88694082063958'},
        {'lat' : '-13.543238206633413', 'lon' : '-71.8866146040515'},
        {'lat' : '-13.543061195041526', 'lon' : '-71.88781326035186'},
        {'lat' : '-13.543090696982645', 'lon' : '-71.88853397141854'},
        {'lat' : '-13.543393091668259', 'lon' : '-71.88873880509013'},
        {'lat' : '-13.544182266232063', 'lon' : '-71.8884277613666'},
        {'lat' : '-13.543570103013172', 'lon' : '-71.88895122519399'},
        {'lat' : '-13.544049508077418', 'lon' : '-71.88701668496239'},
        {'lat' : '-13.544418280546244', 'lon' : '-71.8868497834522'},
        {'lat' : '-13.543134949887486', 'lon' : '-71.88813189050767'},
        {'lat' : '-13.542751424438748', 'lon' : '-71.88854155785083'},
        {'lat' : '-13.543216080191634', 'lon' : '-71.88895122519399'},
        {'lat' : '-13.543429969042654', 'lon' : '-71.88824568699187'},
        {'lat' : '-13.543879872549763', 'lon' : '-71.88926985534978'},        
        {'lat' : '-13.543024317612387', 'lon' : '-71.88757049451753'},
        {'lat' : '-13.543503723776686', 'lon' : '-71.88750221662701'},
        {'lat' : '-13.543901998932217', 'lon' : '-71.88820775482911'},
        {'lat' : '-13.544396154216663', 'lon' : '-71.88764635884034'},
        {'lat' : '-13.543975753517476', 'lon' : '-71.88836706990702'},
        {'lat' : '-13.5442633961814', 'lon' : '-71.88835948347474'},
        {'lat' : '-13.544543663057812', 'lon' : '-71.88780567391824'},
        {'lat' : '-13.54443303143553', 'lon' : '-71.88875397795334'},
        {'lat' : '-13.544278147077874', 'lon' : '-71.88885260157299'},
        {'lat' : '-13.543813493399727', 'lon' : '-71.8882153412614'},
    ];


    var centroPunto = new google.maps.LatLng(-13.543348838811458, -71.88804843975257);

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