console.log("bonjour");

let ensg = [10, 20];/*Point de départ*/
let map = L.map('map').setView(ensg, 4);/*Initialisation de la carte au point de départ*/

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
        let nom = item['pokemon'].split(' ')[0];
        let str_coord = item['coordinates'];
        str_coord = str_coord.slice(1, -1);
        let lon = str_coord.split(',')[0];
        let lat = str_coord.split(',')[1];
        AllMarker(lat, lon, nom);
    }
})

let layerALL = L.layerGroup();
let layerSELECT = L.layerGroup();
map.addLayer(layerALL);

function AllMarker(latitude, longitude, nompokemon){
    var marker = new L.Marker([latitude, longitude],{
        opacity: 0.5,
    });
    marker.bindPopup(nompokemon);
    layerALL.addLayer(marker);
    marker.on('click', function(e) {
        layerSELECT.addLayer(this);
        this.setOpacity(1);
        var nomselect = nompokemon;
        fetchSelect(nompokemon);
        map.removeLayer(layerALL);
        map.addLayer(layerSELECT);
        map.setView([latitude, longitude], 9);
    });
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
      marker.on('mouseout', function (e) {
        this.closePopup();
    });
}

function fetchSelect(nompokemon){

    var select = "select="+nompokemon;
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
            let nom = item['pokemon'].split(' ')[0];
            let str_coord = item['coordinates'];
            str_coord = str_coord.slice(1, -1);
            let lon = str_coord.split(',')[0];
            let lat = str_coord.split(',')[1];
            var marker = new L.Marker([lat, lon],{
            });
            marker.bindPopup(nom);
            layerSELECT.addLayer(marker);
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
              marker.on('mouseout', function (e) {
                this.closePopup();
            });
        }
    })    
}

let values = [];
let form = 'form=';
fetch('MH03.php', {
    method: 'post',
    body: form,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(r => r.json())
.then(r => {
    for (i = 0; i < r.length; i++) {
        let item = r[i];
        let nom = item['name'];
        values.push(nom);
    }
    var liste = document.getElementById("pokemons");

    for (let i = 0; i < values.length; i++){
        var val = values[i];
        var option = document.createElement("option");
        option.value = val;
        pokemons.appendChild(option);
    };
})