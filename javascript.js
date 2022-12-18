// Création de la carte
var map = L.map('map').setView([48.274513, 1.512569], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Délimitation de l'emprise
var corner1 = L.latLng(-90, -180);
var corner2 = L.latLng(90, 180);
var bounds = L.latLngBounds(corner1, corner2);
map.setMaxBounds(bounds)

// On met la carte au niveau de la géolocalisation de la personne (si possible)
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(vueEcran);
}

// Variable globale du marker sur la carte
groupe = new L.FeatureGroup();
map.addLayer(groupe);
// Variable globale des coordonnées
coordonnees = null;

// Enlève les popups sur la carte
function removePop() {
    map.closePopup(popup);
}

// Enlève les markers sur la carte (et réinitialise les coordonnées)
function removeMark() {
    groupe.clearLayers();
    coordonnees = null;
}

function vueEcran(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    map.setView([lat, lon], 12);
}

// Affiche les pokemons dans le formulaire
affichePokemon();

// Récupération du formulaire
var formulaire = document.getElementById('formChoixPkm');
formulaire.addEventListener('submit', validForm);

var pokemonForm = formulaire.elements['pokemon'];
pokemonForm.addEventListener('change', changePokemon);

var heure = formulaire.elements['heure'];
heure.addEventListener('change', heureForm);
var localisation = formulaire.elements['localisation'];
// event listener sur le premier bouton (géolocalisation)
localisation[0].addEventListener('change', geolocForm);
// event listener sur le deuxième bouton (choix sur la carte)
localisation[1].addEventListener('change', locForm);

// Affiche les pokemon dispo lorsque l'on clique sur la balise
function affichePokemon() {
    fetch('pokedex.php')
    .then(result => result.json())
    .then(function(result) {
        var len = result.length;
        var option = document.createElement('option');
        var nom = '';
        option.setAttribute('value', nom);
        option.innerText = "--- Choix du Pokemon ---";
        pokemonForm.appendChild(option);
        for (i=0; i<len; i++) {
            elem = result[i];
            var option = document.createElement('option');
            var nom = elem.name;
            option.setAttribute('value', nom);
            option.innerText = nom;
            pokemonForm.appendChild(option);
        }
    })
}

function changePokemon(event) {
    let layers = groupe.getLayers();
    layers.forEach(function(layer) {
        let lat = layer._latlng.lat;
        let lon = layer._latlng.lng;
        let nom = pokemonForm.value;
        let marker = afficheBonPkm(nom, lat, lon);
        if (nom!='') {
            marker.bindPopup("Vous avez vu un "+nom+" à cet endroit");
        }
        else {
            marker.bindPopup("Vous avez vu un pokemon à cet endroit");
        }
        groupe.removeLayer(layer);
        groupe.addLayer(marker);
        marker.openPopup();
    })
}

// Affiche un formulaire pour rentrer l'heure (et l'enlève si on décoche l'élèment)
function heureForm(event) {
    if (heure.checked) {
        let pHeure = document.getElementById('pHeure');
        var pFormHeure = document.createElement('p');
        pFormHeure.setAttribute('id', 'pFormHeure');
        let date = new Date();
        let yyyy = date.getFullYear();
        // On fait mm+1 car getMonth nous renvoie une valeur entre 0(janvier) et 11 (décembre)
        let mm = date.getMonth()+1;
        let jj = date.getDate();
        let hh = date.getHours();
        let min = date.getMinutes();

        // On vérifie que les nombres aient le bon nombre de chiffres ('07' pour '7' par exemple)
        if (mm<10) {
            mm="0"+mm;
        }
        if (jj<10) {
            jj="0"+jj;
        }
        if (hh<10) {
            hh="0"+hh;
        }
        if (min<10) {
            min = "0"+min;
        }

        let max = yyyy+"-"+mm+"-"+jj+'T'+hh+":"+min;
        let contenu = "<p><label>Heure : <input type='datetime-local' name='heureVue' min='2016-07-06T00:00' max='"+max+"' required></label></p>";
        pFormHeure.innerHTML = contenu;
        pHeure.insertAdjacentElement('afterend', pFormHeure);
    }
    else {
        var pFormHeure = document.getElementById('pFormHeure');
        pFormHeure.parentNode.removeChild(pFormHeure);
    }
}

// Permet à l'utilisateur de cliquer sur la carte pour choisir un endroit dessus
function locForm(event) {
    map.off('click', geolocClick);
    map.on('click', locClick);
    coordonnees=null;
    groupe.clearLayers();
    map.closePopup(popup);
}

function geolocForm(event) {
    map.closePopup(popup);
    groupe.clearLayers();
    map.on('click', geolocClick);
    map.off('click', locClick)
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function coord(pos) {
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;
            coordonnees={lat:lat, lon:lon};
            let nom = pokemonForm.value;
            let marker = afficheBonPkm(nom, lat, lon);
            if (nom!='') {
                marker.bindPopup("Vous avez vu un "+nom+" à cet endroit");
            }
            else {
                marker.bindPopup("Vous avez vu un pokemon à cet endroit");
            }
            groupe.addLayer(marker);
            marker.openPopup();
        });
    } else {
        alert("Géolocalisation impossible à obtenir. Merci de choisir l'option 'Choisir sur la carte'")
    }
}

function locClick(e) {
    lat = e.latlng.lat;
    lon = e.latlng.lng;
    coordonnees = {lat:lat, lon:lon};
    groupe.clearLayers();
    let nom = formulaire.elements['pokemon'].value;
    marker = afficheBonPkm(nom, lat, lon);
    if (nom!='') {
        marker.bindPopup("Vous avez vu un "+nom+" à cet endroit");
    }
    else {
        marker.bindPopup("Vous avez vu un pokemon à cet endroit");
    }
    groupe.addLayer(marker);
    marker.openPopup();
}

//Création du Marker en fonction du type de pokémon
function afficheBonPkm(nom, lat, lon) {
    let coord = [lat, lon];
    if (nom!='') {
        var icon = L.icon({iconUrl: './Pokemons/'+nom+'.png', iconSize: [50,50]});
    }
    else {
        var icon = L.icon({iconUrl: './Pokemons/pokeball.png', iconSize: [50,50]});
    }
    let marker = L.marker(coord, {icon: icon});
    return marker;
}

// Fonction d'affichage du popup quand l'option géolocalisation est activée
function geolocClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Choisissez l'option 'Choix de l'emplacement sur la carte' pour pouvoir sélectionner l'endroit où vous avez vu le pokemon")
        .openOn(map);
}

// fonction permettant de valider le formulaire
function validForm(event) {
    var formOk = true;

    // Récupération des élèments du formulaire
    var pokemonForm = formulaire.elements['pokemon'];
    var nomForm = formulaire.elements['username'];
    var locForm = formulaire.elements['localisation'];
    var heureForm = formulaire.elements['heureVue'];

    var pokemon = null;
    var nom = null;
    var loc = null;
    var heure = null;

    // Récupération des erreurs liés à chaque paramètre
    var errorPokemon = document.getElementById('spanPokemon');
    var errorNom = document.getElementById('spanName');
    var errorLoc = document.getElementById('spanLoc');
    var errorGeoloc = document.getElementById('spanGeoloc');
    var errorCarte = document.getElementById('spanCarte');

    // On vérifie chaque paramètre obligatoire
    // Choix du pokemon
    if (pokemonForm.value=='') {
        errorPokemon.innerHTML = "Choix du pokemon obligatoire";
        errorPokemon.className = "error active";
        formOk = false;
    }
    else {
        pokemon = pokemonForm.value;
        errorPokemon.innerHTML = "";
        errorPokemon.className = "error";
    }
    // Nom utilisateur
    if (nomForm.value=='') {
        errorNom.innerHTML = "Nom obligatoire";
        errorNom.className = "error active";
        formOk = false;
    }
    else {
        nom = nomForm.value;
        errorNom.innerHTML = "";
        errorNom.className = "error";
    }
    // Localisation
    if (locForm.value=='') {
        // La personne n'a coché aucun bouton
        errorLoc.innerHTML = "Méthode de localisation obligatoire";
        errorLoc.className = "error active";
        formOk = false;
    }
    else if (coordonnees==null && !navigator.geolocation) {
        // On ne peut accéder à la géolocalisation de la personne
        errorGeoloc.innerHTML = "Géolocalisation impossible. Choisir l'autre option";
        errorGeoloc.className = "error active";
        // Réinitialisation de l'erreur de choix
        errorLoc.innerHTML = "";
        errorLoc.className = "error";
        // Réinitialisation de l'erreur de marker
        errorCarte.innerHTML = "";
        errorCarte.className = "error";
        formOk = false;
    }
    else if (coordonnees==null) {
        // La personne n'a pas mis de marker sur la carte
        errorCarte.innerHTML = "Merci de placer un marker sur la carte";
        errorCarte.className = "error active";
        // Réinitialisation de l'erreur de choix
        errorLoc.innerHTML = "";
        errorLoc.className = "error";
        // Réinitialisation de l'erreur de géoloc
        errorGeoloc.innerHTML = "";
        errorGeoloc.className = "error";
        formOk = false;
    }
    else {
        // Tout est ok : on réinitialise les erreurs
        // Réinitialisation de l'erreur de choix
        errorLoc.innerHTML = "";
        errorLoc.className = "error";
        // Réinitialisation de l'erreur de géoloc
        errorGeoloc.innerHTML = "";
        errorGeoloc.className = "error";
        // Réinitialisation de l'erreur de marker
        errorCarte.innerHTML = "";
        errorCarte.className = "error";
    }

    // On vérifie si l'heure est rentrée par l'utilisateur ou non
    if (heureForm!=null) {
        var date = heureForm.value;
        date = date.replace("T", " ");
        date+=":00";
    }
    else {
        var date = new Date();
        let yyyy = date.getFullYear();
        // On fait mm+1 car getMonth nous renvoie une valeur entre 0(janvier) et 11 (décembre)
        let mm = date.getMonth()+1;
        let jj = date.getDate();
        let hh = date.getHours();
        let min = date.getMinutes();
        let ss = date.getSeconds();
        date = yyyy+"-"+mm+"-"+jj+" "+hh+":"+min+":"+ss;
    }
    // Si le form est ok, on envoie les données
    if (formOk) {
        event.preventDefault();
        var data = new FormData();
        data.append('pokemon', pokemon);
        data.append('nom', nom);
        coord = "["+coordonnees.lat+","+coordonnees.lon+"]";
        data.append('coord', coord);
        data.append('time', date);
        saveData(data);
    }
    // Sinon, on ne les envoie pas et on indique les pb
    else {
        event.preventDefault();
    }
}

// Fonction sauvegardant les données et réinitialisant la page
function saveData(data) {
    fetch("pokedex.php", {
        method : 'post',
        body : data
    })
    .then(formulaire.submit())
}

var popup = L.popup();

map.on('click', geolocClick);