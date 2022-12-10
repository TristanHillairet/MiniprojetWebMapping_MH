//Ajout de la map

let map = L.map('map').setView([46.227638, 2.213749], 3); // Valeur par défaut
let groupmarker = L.featureGroup().addTo(map);
groupmarker.bringToFront();

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(map);

// ajout des pokemons sur la carte

fetch('calcul_itineraire.php', {
	method: 'post',
	body: JSON.stringify({["initialisation"] : true}) //Renvoi l'intégralité de la table pour faire tourner la fonction principale en analysant chacune des lignes
})
.then(results => results.json())
.then(results => {
	results.forEach(function (result) {
		
		let coord = JSON.parse(result.coordinates);
		let name = result.pokemon;

		let div = document.createElement('div');
		div.className = "button_recup";
		let button = document.createElement('button');
		button.innerText = 'Récupérer';
		let text = document.createElement('p');
		text.innerText = name;
		div.append(text);
		div.append(button);

		L.marker(coord).addTo(groupmarker).bindPopup(div);
	})
})

// fonctions d'écoute des boutons