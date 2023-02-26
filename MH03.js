// 1 INITIALISATION DE LA CARTE
let initcoord = [5, 12];/*Point de départ*/
let map = L.map('map').setView(initcoord, 8);/*Initialisation de la carte au point de départ avec un niveau de zoom*/
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);/*Chargement du fond openstreetmap*/

// 2 CHARGEMENT DES DONNEES DE BASE (A L'OUVERTURE DE LA PAGE)
let pokdata = 'pokemon=';
fetch('MH03.php', {
    method: 'post',
    body: pokdata,/*type de recherche php*/
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(r => r.json())/*sortie en json*/
.then(r => {
    for (i = 0; i < 1000; i++) {
        let item = r[i];/*un élément du json correspondant à un pokémon*/
        let nom = item['pokemon'].split(' ')[0];/*extraction du nom du pokemon*/
        let str_coord = item['coordinates'];/*extraction des coordonées du pokemon*/
        str_coord = str_coord.slice(1, -1);/*séparation des coordonnées*/
        let lon = str_coord.split(',')[0];/*longitude du pokemon*/
        let lat = str_coord.split(',')[1];/*latitude du pokemon*/
        AllMarker(lat, lon, nom);/*cf initialisation marker*/
    }
})

// 3 INITIALISATION DES LAYERS AFFICHABLES
let layerALL = L.layerGroup();/*layer de base avec tous les markers*/
let layerSELECT = L.layerGroup();/*layer des entités séklectionnées précedemment*/
let layerSTRONG = L.layerGroup();/*layer des pokémons de type faible par rapport au sélectionné*/
let layerWEAK = L.layerGroup();/*layer des pokémons de type fort par rapport au selectionné*/
map.addLayer(layerALL);/*affichage du layer de base*/

// 4 INITIALISATION DES MARKERS
let pokSelect = "";/*variable qui contient le nom du pokémon sélectionné*/
function AllMarker(latitude, longitude, nompokemon){

    var marker = new L.Marker([latitude, longitude],{
        opacity: 0.5,
    });/*création du marker (lon, lat, opacité)*/
    marker.bindPopup(nompokemon);/*popup assigné au marker*/
    layerALL.addLayer(marker);/*ajout du marker au layer de base*/

    marker.on('click', function(e) {
        layerSELECT.addLayer(this);
        this.setOpacity(1);
        fetchSelect(nompokemon,layerSELECT);
        map.removeLayer(layerALL);
        map.addLayer(layerSELECT);
        map.setView([latitude, longitude], 9);
        pokSelect = nompokemon;
    });/*ajout d'un listener click pour sélectionner les pokémons semblable au marker*/

    marker.on('mouseover', function (e) {
        this.openPopup();
    });
      marker.on('mouseout', function (e) {
        this.closePopup();
    });/*gestion de l'oiuverture du popup quand l'utilisateur passe la souris au dessu du marker*/
}

// 5 SELECTION DE TOUT LES POKEMONS SEMBLABLES
function fetchSelect(nompokemon,layer){  
    let select = "select="+nompokemon;/*input du nom du pokemon à selectionner*/
    fetch('MH03.php', {
        method: 'post',
        body: select,/*type de recherche php*/
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())/*sortie en json*/
    .then(r => {
        for (i = 0; i < r.length; i++) {
            let item = r[i];/*un élément du json correspondant à un pokemon*/
            let nom = item['pokemon'].split(' ')[0];/*nom du pokemon*/
            let str_coord = item['coordinates'];/*coordonnées du pokemon*/
            str_coord = str_coord.slice(1, -1);
            let lon = str_coord.split(',')[0];/*longitude du pokemon*/
            let lat = str_coord.split(',')[1];/*latitude du pokemon*/
            if (layer == layerSTRONG){
                var marker = new L.Circle([lat, lon], {
                    color: 'green',
                    radius: 500
                })/*marker pour un pokemon faible face au pokemon sélectionné*/
            }
            else if(layer == layerWEAK){
                var marker = new L.Circle([lat, lon], {
                    color: 'red',
                    radius: 500
                })/*marker pour un pokemon fort face au pokemon sélectionné*/
            }else{
                var marker = new L.Marker([lat, lon]);/*création du marker du pokemon*/
            }
            marker.bindPopup(nom);/*création du popup du marker*/
            layer.addLayer(marker);/*ajout du marker au layer des pokemons sélectionnés*/
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
              marker.on('mouseout', function (e) {
                this.closePopup();
            });/*gestion de l'oiuverture du popup quand l'utilisateur passe la souris au dessu du marker*/
        }
    }) 
}

// 6 SELECTION PAR SAISIE DE TEXTE 
let values = [];/*liste des valeurs suggérables*/
let form = 'form=';
fetch('MH03.php', {
    method: 'post',
    body: form,/*type de requête php*/
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(r => r.json())/*résultat en json*/
.then(r => {
    for (i = 0; i < r.length; i++) {
        let item = r[i];/*élément du json correspondant à un pokemon*/
        let nom = item['name'];/*nom du pokemon*/
        values.push(nom);/*ajout du pokemon à la liste des valeurs suggérables*/
    }
    var liste = document.getElementById("pokemons");/*recherche de l'élément html des valeurs suggérées*/
    for (i = 0; i < values.length; i++){
        var val = values[i];
        var option = document.createElement("option");/*création de la valeur dans la liste suggérable*/
        option.value = val;
        liste.appendChild(option);/*ajout du pokémon à la liste*/
    };
})

// 7 FONCTIONS DE BOUTONS
function seePokemon(){
    /*fonction pour valider la sélection du pokemon saisi*/
    layerSELECT.clearLayers();/*réinitialisation du layer de sélection*/
    var nompokemon = document.getElementById('select').value;/*récupération de la valeur saisie*/
    fetchSelect(nompokemon,layerSELECT);/*cf sélection de tous les pokémons semblables*/
    map.removeLayer(layerALL);/*efface le layer complet si affiché*/
    map.addLayer(layerSELECT);/*affiche le layer des entités sélectionnées*/
    pokSelect = nompokemon;
}

function resetMap(){
    /*fonction qui permet de revenir à la carte de base*/
    map.removeLayer(layerWEAK);/*efface le layer des entités fortes*/
    map.removeLayer(layerSTRONG);/*efface le layer des entités faibles*/
    map.removeLayer(layerSELECT);/*efface le layer des entités sélectionnées*/
    map.addLayer(layerALL);/*affiche le layer de base*/
}

function getStrong(){
    /*fonction qui sélectionne les pokémons faible face au pokémon sélectionné*/
    let pok2type = 'pok2type='+pokSelect;/*input du pokémon à convertir*/
    fetch('MH03.php', {
        method: 'post',
        body: pok2type,/*type de requête php*/
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())/*résultat en json*/
    .then(r => {
        let typePok = r[0]['Type 1'];/*récupération dut type du pokémon sélectionné*/
        let strongType = [''];/*initialisation de la liste des types faibles face au type selectionné*/

        /*remplissage de la liste des types faibles*/
        if (typePok = 'Grass'){strongType = ['Water','Ground','Rock'];}
        else if (typePok = 'Fire'){strongType = ['Grass','Bug','Ice'];}
        else if (typePok = 'Water'){strongType = ['Fire','Ground','Rock'];}
        else if (typePok = 'Bug'){strongType = ['Grass','Psychic'];}
        else if (typePok = 'Normal'){strongType = [];}
        else if (typePok = 'Poison'){strongType = ['Grass','Fairy'];}
        else if (typePok = 'Electric'){strongType = ['Water'];}
        else if (typePok = 'Ground'){strongType = ['Fire','Poison','Electric','Rock'];}
        else if (typePok = 'Fairy'){strongType = ['Fighting','Dragon'];}
        else if (typePok = 'Fighting'){strongType = ['Normal','Rock','Ice'];}
        else if (typePok = 'Psychic'){strongType = ['Poison','Fighting'];}
        else if (typePok = 'Rock'){strongType = ['Fire','Bug','Ice'];}
        else if (typePok = 'Ghost'){strongType = ['Psychic','Ghost'];}
        else if (typePok = 'Ice'){strongType = ['Grass','Ground','Dragon'];}
        else if (typePok = 'Dragon'){strongType = ['Dragon'];}

        for (i = 0; i < strongType.length; i++){
            let type2pok = 'type2pok='+strongType[i];/*input du type à convertir*/
            fetch('MH03.php', {
                method: 'post',
                body: type2pok,/*type de requête php*/
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(r => r.json())/*résultat en json*/
            .then(r => {
                let poklist = [];/*initialisation de la liste des pokémons correspondant au type(s) faible(s)*/
                for (i = 0; i < r.length; i++){
                    let item = r[i];/*un nom de pokémon*/
                    poklist.push(item['Name']);/*remplissage de la liste des pokémons du type faible*/
                }
                for (i = 0; i < poklist.length; i++){
                    fetchSelect(poklist[i],layerSTRONG);/*sélection des pokémons du type faible et insertion dans le layer
                    des pokémons faibles face au pokémon sélectionné*/
                }
            })
        }
    })
    map.addLayer(layerSTRONG);/*affichhage des pokémons faibles face au pokémon sélectionné*/
}

function getWeak(){
    /*fonction qui sélectionné les pokémons forts face au pokémon sélectionné*/
    let pok2type = 'pok2type='+pokSelect;
    fetch('MH03.php', {
        method: 'post',
        body: pok2type,/*type de requête php*/
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())/*résultat en json*/
    .then(r => {
        let typePok = r[0]['Type 1'];/*récupération du type du pokémon sélecrtionné*/
        let weakType = [];/*initialisation de la liste des types forts face au type selectionné*/

        /*remplissage de la liste des types forts*/
        if (typePok = 'Grass'){weakType = ['Fire','Bug','Poison','Ice'];}
        else if (typePok = 'Fire'){weakType = ['Water','Ground','Rock'];}
        else if (typePok = 'Water'){weakType = ['Grass','Electric'];}
        else if (typePok = 'Bug'){weakType = ['Fire','Rock'];}
        else if (typePok = 'Normal'){weakType = ['Fighting'];}
        else if (typePok = 'Poison'){weakType = ['Ground','Psychic'];}
        else if (typePok = 'Electric'){weakType = ['Ground'];}
        else if (typePok = 'Ground'){weakType = ['Grass','Water','Ice'];}
        else if (typePok = 'Fairy'){weakType = ['Poison'];}
        else if (typePok = 'Fighting'){weakType = ['Fairy','Psychic'];}
        else if (typePok = 'Psychic'){weakType = ['Bug','Ghost'];}
        else if (typePok = 'Rock'){weakType = ['Grass','Water','Ground','Fighting'];}
        else if (typePok = 'Ghost'){weakType = ['Ghost'];}
        else if (typePok = 'Ice'){weakType = ['Fire','Fighting','Rock'];}
        else if (typePok = 'Dragon'){weakType = ['Dragon','Ice','Fairy'];}


        for (i = 0; i < weakType.length; i++){
            let type2pok = 'type2pok='+weakType[i];/*input du type à convertir*/
            fetch('MH03.php', {
                method: 'post',
                body: type2pok,/*type de requête php*/
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(r => r.json())/*résultat en json*/
            .then(r => {
                let poklist = [];/*initialisation de la liste des pokémons correspondant au type(s) fort(s)*/
                for (i = 0; i < r.length; i++){
                    let item = r[i];/*un nom de pokémon*/
                    poklist.push(item['Name']);/*remplissage de la liste des pokémons du type fort*/
                }
                for (i = 0; i < poklist.length; i++){
                    fetchSelect(poklist[i],layerWEAK);/*sélection des pokémons du type fort et insertion dans le layer
                    des pokémons forts face au pokémon sélectionné*/
                }
            })
        }
    })
    map.addLayer(layerWEAK);/*affichhage des pokémons forts face au pokémon sélectionné*/
}