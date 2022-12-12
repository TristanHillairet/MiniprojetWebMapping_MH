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


// fonction permettant de remplir la liste des points d'intérêts

function addtolist(lat, lng) {
	//console.log(lat, lng); // permet de tester les paramètres qui vont rentrer dans la liste 
	points_passage.push([lat, lng]);
	console.log(points_passage);
}


// fonctions d'écoute des boutons

let points_passage = [];

function get_depart() {
	map.on('click', function(e){
		newMarker(e);
	});

	function newMarker(e){
		depart.clearLayers();
		L.marker(e.latlng).addTo(depart);
		addtolist(e.latlng.lat, e.latlng.lng);
	}
}


function get_pokemons() {
	pokemon.clearLayers();
	fetch('calcul_itineraire.php', {
		method: 'post',
		body: JSON.stringify({["initialisation"] : true}) //Renvoi l'intégralité de la table pour faire tourner la fonction principale en analysant chacune des lignes
	})
	.then(results => results.json())
	.then(results => {
		results.forEach(function (result) {
			
			let coord = JSON.parse(result.coordinates);
			let lat = coord[0];
			let lng = coord[1];
			let name = result.pokemon;

			//console.log(lat, lng);
	
			let div = document.createElement('div');
			div.className = "button_recup";
			let button = document.createElement('button');
			button.innerText = 'Selectionner';
			let text = document.createElement('p');
			text.innerText = name;
			div.append(text);
			div.append(button);

			pokemon_affiche = L.marker([lat, lng]).addTo(pokemon).bindPopup(div);

			button.addEventListener('click', addtolist.bind(null, lat, lng)); // le bind renvoie le contexte, donc le null premet de dire que je ne veut pas le transmettre à la fonction
		})
	})
}


function do_calculation() {
	
}