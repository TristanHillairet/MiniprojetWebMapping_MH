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

function return_lowest(tab) {
	let lowest = tab[0];
	for (i=1; i < tab.length; i++) {
		if(tab[i]<lowest) {
			lowest = tab[i]
		}
	}
	console.log("liste_distance minimum value = " + lowest);
	return tab.indexOf(lowest)
}

function do_calculation() {

	// trouver le point de passage le plus proche du départ

	/* pt_passage_ordre = [];
	list_distance = [];


	for (var i = 0; i < points_passage.length; i++) {
		console.log('passage dans le for');
		let waypoints = [];
			waypoints.push(pt_depart_arrivee[0]);
			waypoints.push(points_passage[i]);
			//waypoints.push([pt_depart_arrivee[0][0], pt_depart_arrivee[0][1]]);
			//waypoints.push([points_passage[i][0], points_passage[i][1]]);
		console.log(waypoints);
		var routeControl = L.Routing.control({});
		routeControl.setWaypoints(waypoints);
		console.log('test 1a');
		routeControl.on('routesfound', function(e) {
			console.log('test 1b');
			var distance = e.routes[0].summary.totalDistance;
			list_distance.push(distance);
			console.log(list_distance);
		})
	}

	//let min = Math.min(...list_distance);
	//console.log('liste');
	//console.log(list_distance);
	//console.log(min);
	//let indice = list_distance.indexOf(min);
	let indice = return_lowest(list_distance);
	console.log(indice);
	pt_passage_ordre.push(points_passage[indice]);
	//pt_passage_ordre.push([points_passage[indice][0], points_passage[indice][1]]);
	console.log(pt_passage_ordre);
	points_passage.splice(indice, 1);
	list_distance.splice(0, list_distance.lenght); */


	// On fait maintenant de même avec tous les points un par un 

	/* while (points_passage.lenght != 0) {
		console.log('passage dans le while');
		let pt_debut = [];
		pt_debut.push([pt_passage_ordre[points_passage.length-1][0], pt_passage_ordre[points_passage.length-1][1]]);
		console.log('pt_debut :' + pt_debut);
		for (var i = 0; i < points_passage.length; i++) {
			let waypoints = [];
			waypoints.concat(pt_debut);
			waypoints.push([points_passage[i][0], points_passage[i][1]]);
			console.log('waypoints :' + waypoints);
			var routeControl = L.Routing.control({});
			routeControl.setWaypoints(waypoints);
			console.log('test 2a');
			routeControl.on('routesfound', function(e) {
				console.log('test 2b');
				var distance = e.routes[0].summary.totalDistance;
				list_distance.push(distance);
				console.log(distance);
			})
		}
		//console.log(list_distance);
		min = Math.min(list_distance);
		indice = list_distance.indexOf(min);
		pt_passage_ordre.push(points_passage[indice]);
		points_passage.splice(indice, 1);
		list_distance.splice(0, list_distance.lenght);
		//console.log(points_passage);
		break;
	} */

	// Première solution de CHATGPT 

	/*// Fonction pour trouver la distance entre deux points à l'aide de la bibliothèque Leaflet
	function findDistance(point1, point2) {
		let waypoints = [];
		waypoints.push(point1);
		waypoints.push(point2);
		console.log(waypoints);
		// Code pour trouver la distance entre point1 et point2 à l'aide de Leaflet
		var routeControl = L.Routing.control({});
		routeControl.setWaypoints(waypoints);
		routeControl.on('routesfound', function(e) {
			var distance = e.routes[0].summary.totalDistance;
			return distance;
		})
  	}
  
  	// Fonction pour trouver l'itinéraire le plus court
  	function findShortestRoute(points) {
	// Liste des permutations possibles des points de départ
		let permutations = [];
		// Fonction pour trouver toutes les permutations
		function findPermutations(array, current) {
	  		if (array.length === 0) {
				permutations.push(current);
	  		} else {
				for (let i = 0; i < array.length; i++) {
		  			let newArray = array.slice();
		  			let newCurrent = current.slice();
		  			newCurrent.push(array[i]);
		  			newArray.splice(i, 1);
		  			findPermutations(newArray, newCurrent);
				}
	  		}
		}
		findPermutations(points, []);
	
		// Trouver le chemin le plus court parmi toutes les permutations
		let shortestRoute = permutations[0];
		let shortestDistance = 0;
		for (let i = 0; i < permutations.length; i++) {
	  		let currentRoute = permutations[i];
	  		let currentDistance = 0;
	  		for (let j = 0; j < currentRoute.length - 1; j++) {
				currentDistance += findDistance(currentRoute[j], currentRoute[j + 1]);
	  		}
	  		if (i === 0 || currentDistance < shortestDistance) {
				shortestRoute = currentRoute;
				shortestDistance = currentDistance;
	  		}
		}
		return shortestRoute;
  	}
  
  	// Exemple d'utilisation
  	let points = pt_depart_arrivee.concat(points_passage);
  	let shortestRoute = findShortestRoute(points);
  	console.log(shortestRoute); */


	// Troisième solution de ChatGPT 

	/*function tspBruteForce(coords) {
		let n = coords.length;
		let minPath = [];
		let minLength = Infinity;
	
		// Calculer la distance entre deux points
		function dist(a, b) {
			return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
		}
	
		// Générer tous les chemins possible à l'aide d'une récursion
		function generatePaths(path, visited) {
			if (path.length === n) {
				let length = 0;
				for (let i = 0; i < n - 1; i++) {
					length += dist(coords[path[i]], coords[path[i + 1]]);
				}
				length += dist(coords[path[0]], coords[path[n - 1]]);
				if (length < minLength) {
					minPath = path.slice();
					minLength = length;
				}
				return;
			}
			for (let i = 0; i < n; i++) {
				if (!visited[i]) {
					visited[i] = true;
					path.push(i);
					generatePaths(path, visited);
					visited[i] = false;
					path.pop();
				}
			}
		}
	
		generatePaths([], Array(n).fill(false));
		return minPath.map(i => coords[i]);
	}
	
	// on utilise les fonctions ci-dessus pour renvoyer l'itinéraire le plus optimisé
	let optimizedPath = tspBruteForce(points_passage);
	console.log(optimizedPath);
	let waypoints_complete = pt_depart_arrivee.concat(optimizedPath).concat(pt_depart_arrivee);
	console.log(waypoints_complete);

	// on cherche maintenant à afficher l'itinéraire Routing machine associé à l'ordre des points de passage calculé précédemment par bruteforce
	pokemon.clearLayers();
	depart.clearLayers(); // on enleve les affichages précédents pour garder une carte lisible
	var routeControl = L.Routing.control({}).addTo(map);
	routeControl.setWaypoints(waypoints_complete);
	let error = L.Routing.errorControl(routeControl).addTo(map); */


	// Troisième solution de ChatGPT

	// on définit les points de passages pas encore dans le bon ordre
	var coords = pt_depart_arrivee.concat(points_passage);

	// Initialisation du tableau pour stocker l'itinéraire optimisé
	var optimized = [];

	// Fonction pour trouver la distance entre deux points
	function getDistance(start, end) {
    	var distance;
		var waypoints = [];
		waypoints.push(start);
		waypoints.push(end);
		var routeControl = L.Routing.control({}).addTo(map);
		routeControl.setWaypoints(waypoints);
		routeControl.on('routesfound', function(e) {
        	var routes = e.routes;
        	distance = routes[0].summary.totalDistance;
    	});
    	return distance;
	}

	// Boucle pour optimiser l'ordre des points
	var currentPoint = coords[0];
	optimized.push(currentPoint);
	coords.splice(0, 1);
	while (coords.length > 0) {
    	var minDistance = Number.MAX_VALUE;
    	var minIndex;
    	for (var i = 0; i < coords.length; i++) {
        	var distance = getDistance(currentPoint, coords[i]);
        	if (distance < minDistance) {
            	minDistance = distance;
            	minIndex = i;
        	}
    	}
    	currentPoint = coords[minIndex];
    	optimized.push(currentPoint);
    	coords.splice(minIndex, 1);
	}

	// Afficher le résultat
	console.log(optimized);
	let final_optimized = optimized.concat(pt_depart_arrivee); 

	// on cherche maintenant à afficher l'itinéraire Routing machine associé à l'ordre des points de passage calculé précédemment
	pokemon.clearLayers();
	depart.clearLayers(); // on enleve les affichages précédents pour garder une carte lisible
	var routeControl = L.Routing.control({geocoder: L.Control.Geocoder.nominatim()}).addTo(map);
	routeControl.setWaypoints(final_optimized);
	let error = L.Routing.errorControl(routeControl).addTo(map);

  


	// affichage de l'itinéraire avec les points de passage dans l'ordre le plus optimisé

	/* let waypoints_final = pt_depart_arrivee.concat(pt_passage_ordre).concat(pt_depart_arrivee); // on obtient un seul et unique tableau avec pt de départ, points de passage, pt d'arrivée
	pokemon.clearLayers();
	depart.clearLayers(); // on enlève de la carte les marqueurs présents lors des étapes de sélection
	console.log("début du traitement de l'affichage");
	var routeControl = L.Routing.control({}).addTo(map);
	routeControl.setWaypoints(waypoints_final); // tous les points de du tableau "points_passage" sont ajoutés en tant qu'étapes de l'itinéraire grâce à leur latitude et longitude
	let error = L.Routing.errorControl(routeControl).addTo(map); */
}