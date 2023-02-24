// initialisation map

let map = L.map('map').setView([46.227638, 2.213749], 3); // Valeur par défaut

let apiKey = "AAPK1a5da6daf8d74d2381c7bfdbfc9339a7RQ0jTIPkZoOELXdSWsJws89lQQmTUaGwfdfvdFMZ7UPn1sFv4B_ybAoodzMVXjXM";

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
let bouton_next = document.getElementById("b_next");
let bouton_prev = document.getElementById("b_prev");
let page = 1;

var redIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
  });


//Récupération des données du lieu
function recup() {
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
    	})

		for (let i = (page-1)*5; i <= 5*page-1; i++) {
			let coordinates = results[i].coordinates; //De type str
			coordinates = coordinates.slice(1, -1);
    		let lon = coordinates.split(',')[1];
    		let lat = coordinates.split(',')[0];

			let marker = L.marker([lat, lon], {icon: redIcon});
    		marker.addTo(groupmarker);

			const latlngStr = coordinates.split(",", 2);
 			const latlng = {
    			lat: parseFloat(latlngStr[0]),
    			lng: parseFloat(latlngStr[1]),
  			};

			L.esri.Geocoding
				.reverseGeocode({
			  		apikey: apiKey
				})
				.latlng(latlng)
				.run(function (error, result) {
					if (error) {
					  return;
					}
					
					let new_line = tableau.appendChild(document.createElement('tr'));
					let colonne_1 = new_line.appendChild(document.createElement('td'));
					let colonne_2 = new_line.appendChild(document.createElement('td'));
					let colonne_3 = new_line.appendChild(document.createElement('td'));
					colonne_1.appendChild(document.createTextNode(lon));
					colonne_2.appendChild(document.createTextNode(lat));
					colonne_3.appendChild(document.createTextNode(result.address.Match_addr));
 			  	});
		}
	})
}

//Fonctions pour les bouttons
function next_page(event) {
	event.preventDefault();
	groupmarker.clearLayers();

	for (let i = 0; i <= 4; i++) {
		tableau.removeChild(tableau.children[3]);
	}

	page += 1;
	recup();
}
function previous_page(event) {
	event.preventDefault();

	if (page>1) {
		groupmarker.clearLayers();
		for (let i = 0; i <= 4; i++) {
			tableau.removeChild(tableau.children[3]);
		}

		page -= 1;
		recup();
	}
}

// addEvent
bouton_next.addEventListener("click", next_page);
bouton_prev.addEventListener("click", previous_page);

// appel fonction
recup();