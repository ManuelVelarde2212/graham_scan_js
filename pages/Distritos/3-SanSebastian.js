function initialize() {

    var coordenadas = [
        {'lat' : '-13.531930116012777', 'lon' : '-71.9286360501562'},
        {'lat' : '-13.532451109451534', 'lon' : '-71.92877639703781'},
        {'lat' : '-13.532786033202914', 'lon' : '-71.9300395189723'},
        {'lat' : '-13.532376681887225', 'lon' : '-71.93134091732902'},
        {'lat' : '-13.531880497530583', 'lon' : '-71.93113677641033'},
        {'lat' : '-13.532599964510313', 'lon' : '-71.93201713412225'},
        {'lat' : '-13.531657214232697', 'lon' : '-71.9314685054032'},
        {'lat' : '-13.53130988424197', 'lon' : '-71.93143022898097'},
        {'lat' : '-13.530850911691319', 'lon' : '-71.93116229402516'},
        {'lat' : '-13.53103698175092', 'lon' : '-71.9302564186984'},
        {'lat' : '-13.532612369094347', 'lon' : '-71.92797259217042'},
        {'lat' : '-13.53228984969946', 'lon' : '-71.92783224528881'},
        {'lat' : '-13.532947292618864', 'lon' : '-71.92904433199362'},
        {'lat' : '-13.53343107021127', 'lon' : '-71.92858501492653'},
        {'lat' : '-13.531595191057225', 'lon' : '-71.93057538888388'},
        {'lat' : '-13.531533167865597', 'lon' : '-71.93100918833615'},
        {'lat' : '-13.531806069787873', 'lon' : '-71.92954192548295'},
        {'lat' : '-13.532475918634457', 'lon' : '-71.92878915584524'},
        {'lat' : '-13.532426300266014', 'lon' : '-71.92884019107491'},
        {'lat' : '-13.532525536992544', 'lon' : '-71.9288274322675'},
        {'lat' : '-13.532029352946159', 'lon' : '-71.9300395189723'},
        {'lat' : '-13.531905306772957', 'lon' : '-71.9296439959423'},
        {'lat' : '-13.532066566785506', 'lon' : '-71.9296439959423'},
        {'lat' : '-13.532066566785506', 'lon' : '-71.93057538888388'},
    ];


    var centroPunto = new google.maps.LatLng(-13.531446335370182, -71.93132815852161);

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