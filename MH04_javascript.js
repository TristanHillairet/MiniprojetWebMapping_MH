// initialisation map

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


//Déclaration des variables
let tableau = document.getElementById('tableau');


//Récupération des données du lieu (la totalité)
fetch('MH04_server.php', {
    method: 'post'
    })
.then(results => results.json())
.then(results => {
    results.forEach(function (result) {
		let coordinates = result.coordinates; //De type str
		coordinates = coordinates.slice(1, -1);
    	let lon = coordinates.split(',')[1];
    	let lat = coordinates.split(',')[0];

		let marker = L.marker([lat, lon]);
    	marker.addTo(groupmarker);
	
		let querie = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+ lat +"&lon="+ lon;
		console.log(querie);

    	fetch(querie)
    	.then(results_2 => results_2.json())
    	.then(results_2 => {
			results_2.forEach(function (result_2) {
				let adresse = result_2.data.address.road;
    
				let new_line = tableau.appendChild(document.createElement('tr'));
				let colonne_1 = new_line.appendChild(document.createElement('td'));
				let colonne_2 = new_line.appendChild(document.createElement('td'));
				let colonne_3 = new_line.appendChild(document.createElement('td'));
				colonne_1.appendChild(document.createTextNode(lon));
				colonne_2.appendChild(document.createTextNode(lat));
				colonne_3.appendChild(document.createTextNode(adresse));
			})
		})
    })
})