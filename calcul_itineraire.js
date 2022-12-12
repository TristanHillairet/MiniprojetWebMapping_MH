//Ajout de la map

let map = L.map('map').setView([46.227638, 2.213749], 3); // Valeur par défaut
let pokemon = L.featureGroup().addTo(map);
let depart = L.featureGroup().addTo(map);
pokemon.bringToFront();
depart.bringToFront();


var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(map);


// appel des boutons et désactivation des boutons des étapes avancées

let bouton_etape1 = document.getElementById("position_depart");
let bouton_etape2 = document.getElementById("selec_pokemon");
let bouton_etape3 = document.getElementById("calcul_itineraire");
//bouton_etape2.disabled = true;
//bouton_etape3.disabled = true;


// personnalisation des marqueurs

let LeafIcon = L.Icon.extend({
	options: {
	   iconSize:     [24, 36],
	   shadowSize:   [0, 0],
	   iconAnchor:   [12, 36],
	   shadowAnchor: [4, 62],
	   popupAnchor:  [0, -20]
	}
});

let start = new LeafIcon({iconUrl: "icon/start.png"});
let pokeball = new LeafIcon({iconUrl: "icon/pokeball.png"});


// fonction permettant de remplir la liste des points d'intérêts

let pt_depart_arrivee = [];
let points_passage = [];

function addtodepartarrivee(lat, lng) {
	//console.log(lat, lng); // permet de tester les paramètres qui vont rentrer dans la liste 
	pt_depart_arrivee.push([lat, lng]);
	console.log(pt_depart_arrivee);
}

function addtopassage(lat, lng) {
	//console.log(lat, lng); // permet de tester les paramètres qui vont rentrer dans la liste 
	points_passage.push([lat, lng]);
	console.log(points_passage);
}


// fonctions d'écoute des boutons

function get_depart() {
	alert('Selectionnez un point de départ en cliquant sur la carte');
	map.addEventListener('click', function(e){
		pt_depart_arrivee.splice(0, pt_depart_arrivee.length);
		newMarker(e);
	});

	function newMarker(e){
		depart.clearLayers();
		L.marker([e.latlng.lat, e.latlng.lng], {icon: start}).addTo(depart);
		addtodepartarrivee(e.latlng.lat, e.latlng.lng);
	}
}


function get_pokemons() {
	alert("Selectionnez dans l'ordre tous les pokemons par lesquels vous souhaitez passer pour les récupérer");
	pokemon.clearLayers();

	fetch('calcul_itineraire.php', {
		method: 'post',
		body: JSON.stringify({["initialisation"] : true}) //Renvoi l'intégralité de la table pour faire tourner la fonction principale en analysant chacune des lignes
	})
	.then(results => results.json())
	.then(results => {
		results.forEach(function (result) {
			
			let coord = JSON.parse(result.coordinates); // les coordonnées sont emprisonnées dans une string, donc on les récupèrent avec un JSON.parse
			let lat = coord[0];
			let lng = coord[1];
			let name = result.pokemon; // on récupère le nom, la latitude et la longitude de chaque pokemon 
	
			let div = document.createElement('div');
			div.className = "button_recup";
			let button = document.createElement('button');
			button.innerText = 'Selectionner';
			let text = document.createElement('p');
			text.innerText = name;
			div.append(text);
			div.append(button);

			pokemon_affiche = L.marker([lat, lng], {icon: pokeball}).addTo(pokemon).bindPopup(div); // chaque pokemon est ajouté en tant que marqueur

			button.addEventListener('click', addtopassage.bind(null, lat, lng)); // le bind renvoie le contexte, donc le null premet de dire que je ne veut pas le transmettre à la fonction
		})
	})
}


function do_calculation() {
	let waypoints = pt_depart_arrivee.concat(points_passage).concat(pt_depart_arrivee); // on obtient un seul et unique tableau avec pt de départ, points de passage, pt d'arrivée
	pokemon.clearLayers();
	depart.clearLayers(); // on enlève de la carte les marqueurs présents lors des étapes de sélection
	
	var routeControl = L.Routing.control({}).addTo(map);
	routeControl.setWaypoints(waypoints); // tous les points de du tableau "points_passage" sont ajoutés en tant qu'étapes de l'itinéraire grâce à leur latitude et longitude
	let error = L.Routing.errorControl(routeControl).addTo(map);
}