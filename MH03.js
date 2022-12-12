console.log("bonjour");

let ensg = [48.8410837, 2.5875354];/*Point de départ*/
let map = L.map('map').setView(ensg, 10);/*Initialisation de la carte au point de départ*/

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);/*Chargement du fond openstreetmap*/

let pokdata = 'pokemon=';
fetch('MH03.php', {
    method: 'post',
    body: pokdata,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(r => r.json())
.then(r => {
    for (i = 0; i < 152; i++) {
        let item = r[i];
        let nom = item['pokemon'];
        let str_coord = item['coordinates'];
        str_coord = str_coord.slice(1, -1);
        let lon = str_coord.split(',')[0];
        let lat = str_coord.split(',')[1];
        AllMarker(lat, lon, nom);
    }
})

let layerALL = L.layerGroup();
map.addLayer(layerALL);

function AllMarker(latitude, longitude, nompokemon){
    var marker = new L.Marker([latitude, longitude]);
    marker.bindPopup(nompokemon);
    layerALL.addLayer(marker);
    marker.on('click',click(nompokemon));
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
      marker.on('mouseout', function (e) {
        this.closePopup();
    });
}

let layerSELECT = L.layerGroup();

function click(nompokemon){
    var select = 'select=' + nompokemon;
    fetch('MH03.php', {
        method: 'post',
        body: select,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())
    .then(r => {
        for (i = 0; i < r.length; i++) {
            let item = r[i];
            let nom = item['pokemon'];
            let str_coord = item['coordinates'];
            str_coord = str_coord.slice(1, -1);
            let lon = str_coord.split(',')[0];
            let lat = str_coord.split(',')[1];
            SelectMarker(lat, lon, nom);
        }
    })
    map.removeLayer(layerALL);
    map.addLayer(layerSELECT);
}

function SelectMarker(latitude, longitude, nompokemon){
    var marker = new L.Marker([latitude, longitude]);
    marker.bindPopup(nompokemon);
    layerSELECT.addLayer(marker);
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
      marker.on('mouseout', function (e) {
        this.closePopup();
    });
}