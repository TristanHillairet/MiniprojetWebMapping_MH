//Ajout de la map

let map = L.map('map').setView([46.227638, 2.213749], 3); // Valeur par défaut
let pokemon = L.featureGroup().addTo(map);
let depart = L.featureGroup().addTo(map);
pokemon.bringToFront();
depart.bringToFront();

// on choisit le style de carte voulu - choix dans ce cas d'une carte type cartoon - carte aux trésors

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(map);


// appel des 3 boutons principaux

let bouton_etape1 = document.getElementById("position_depart");
let bouton_etape2 = document.getElementById("selec_pokemon");
let bouton_etape3 = document.getElementById("calcul_itineraire");


// personnalisation des marqueurs sous forme de drapeau start ou de pokeball selon les cas

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


// fonctions permettant de remplir la liste des points d'intérêts choisit par l'utilisateur

// on initailise deux listes - une pour le point de départ / arrivée et une pour les pokemons à récupérer

let pt_depart_arrivee = [];
let points_passage = [];

// fonction permettant d'ajouter le pt de départ / arrivée à la liste pt_depart_arrivee

function addtodepartarrivee(lat, lng) {
	//console.log(lat, lng); // permet de tester les paramètres qui vont rentrer dans la liste 
	pt_depart_arrivee.push([lat, lng]);
	console.log(pt_depart_arrivee);
}

// fonction permettant d'ajouter les pokemons à récupérer à la liste points_passage

function addtopassage(lat, lng) {
	//console.log(lat, lng); // permet de tester les paramètres qui vont rentrer dans la liste 
	points_passage.push([lat, lng]);
	console.log(points_passage);
}


// fonctions qui sont déclanchées au clic de l'utilisateur sur les boutons principaux

function get_depart() { // déclanchée au clic de l'utilisateur sur le bouton 'selection du départ'
	// on informe l'utilisateur de ce qu'il doit faire
	alert("Selectionner un point de départ en cliquant sur la carte puis appuyer sur 'Selection des pokémons'");
	map.addEventListener('click', function(e){ // on écoute le clic sur la carte
		pt_depart_arrivee.splice(0, pt_depart_arrivee.length);
		newMarker(e); // on instancie une fonction qui va créer un nouveau marker 
	});

	function newMarker(e){
		depart.clearLayers(); // on enlève les marqueurs précédemment placés si il y en a
		L.marker([e.latlng.lat, e.latlng.lng], {icon: start}).addTo(depart); // on récupère les coordonnées du départ et on ajoute le marqueur avec le bon logo
		addtodepartarrivee(e.latlng.lat, e.latlng.lng); // on l'ajoute à la liste prévu a cet effet grâce à la fonction appropriée
	}
}


function get_pokemons() { // déclanchée au clic de l'utilisateur sur le bouton 'selection des pokemons'
	alert("Selectionner les pokemons à récupérer puis appuyer sur 'calcul de l'itinéraire'");
	pokemon.clearLayers(); // on efface les marqueurs précédemment placés

	fetch('calcul_itineraire.php', { // on va faire une requête SQL à la base de données de test contenant des pokemons, voir le fichier php pour cela
		method: 'post',
		body: JSON.stringify({["initialisation"] : true}) //Renvoi les 100 premières lignes de la table pour faire tourner la fonction principale en analysant chacune des lignes
	})
	.then(results => results.json()) // les résultats de la requête SQL sont stockés dans un JSON
	.then(results => {
		results.forEach(function (result) { // on parcourt chaque résultat du JSON
			
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
			div.append(button); // on crée une div contenant du texte (nom du pokemon en question) et un bouton (récupérer) qui s'affiche dans un popup dès que l'utilisateur va cliquer sur un pokemon


			pokemon_affiche = L.marker([lat, lng], {icon: pokeball}).addTo(pokemon).bindPopup(div); // chaque pokemon est ajouté en tant que marqueur avec son popup associé

			button.addEventListener('click', addtopassage.bind(null, lat, lng)); // on écoute le clic de l'utilisateur sur le bouton 'selectionner' d'un pokemon
			// le bind renvoie le contexte, donc le null premet de dire que je ne veut pas le transmettre à la fonction
		})
	})
}


function do_calculation() { // déclanchée au clic de l'utilisateur sur le bouton 'calcul de l'itinéraire'

	// solution selectionnée pour l'optimisation de l'itinéraire passant par tous les pokemons : algo du plus proche voisin 
	// l'affichage se fait à la fois à vol d'oiseau +  par le réseau routier grâce à la Routing machine de Leaflet

	function tspNearestNeighbour(points, start) {
		// Créer un tableau pour stocker l'ordre des points
		let order = [];
		
		// Trouver l'index du point de départ dans la liste des points
		let currentIndex = points.findIndex(point => point[0] == start[0] && point[1] == start[1]);
		
		// Ajouter le point de départ à l'ordre
		order.push(points[currentIndex]);
		
		// Supprimer le point de départ de la liste des points restants
		let remainingPoints = points.filter((point, index) => index !== currentIndex);
		
		// Boucle jusqu'à ce que tous les points aient été visités
		while (remainingPoints.length > 0) {
		  // Initialiser la distance minimale à une valeur très grande
		  let minDistance = Infinity;
		  let minIndex = 0;
		  
		  // Boucle pour trouver le point le plus proche
		  for (let i = 0; i < remainingPoints.length; i++) {
			let distance = getDistance(points[currentIndex], remainingPoints[i]);
			
			// Mettre à jour la distance minimale et l'index du point le plus proche
			if (distance < minDistance) {
			  minDistance = distance;
			  minIndex = i;
			}
		  }
		  
		  // Ajouter le point le plus proche à l'ordre et le supprimer de la liste des points restants
		  order.push(remainingPoints[minIndex]);
		  remainingPoints.splice(minIndex, 1);
		  
		  // Mettre à jour l'index courant pour être celui du point le plus proche
		  currentIndex = points.findIndex(point => point[0] == order[order.length - 1][0] && point[1] == order[order.length - 1][1]);
		}
		
		// Ajouter le point de départ à la fin pour fermer le cycle
		order.push(pt_depart_arrivee[0]);
		
		// Renvoyer l'ordre des points
		return order;
	}
	  
	// Fonction pour calculer la distance euclidienne entre deux points
	function getDistance(point1, point2) {
		let xDiff = point1[0] - point2[0];
		let yDiff = point1[1] - point2[1];
		return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	}

	// on utilise tspNearestNeighbour en on instancie les paramètres pour cela
	let liste_points = pt_depart_arrivee.concat(points_passage);
	let order = tspNearestNeighbour(liste_points, pt_depart_arrivee[0]); // on utilise en param les points de passages dans le désordre en commançant par le point de départ
	// (voir ligne précédente) et on fournit également le point de départ brut 'pt_depart_arrivee[0]' à la fonction afin que ce dernier soit correctement 
	// identifié et donc conservé en début d'itinéraire et ajouter en fin de celui-ci.

	// on affiche les points dans le bon ordre dans la console pour faire une vérification si besoin
	console.log(order);

	// on enleve les affichages précédents pour garder une carte lisible
	pokemon.clearLayers();
	depart.clearLayers(); 
	
	// Définir un tableau de marqueurs pour les points et les afficher sur la carte
	let markers = [];
	for (let i = 0; i < order.length; i++) {
  		markers.push(L.marker(order[i]).addTo(map));
	}

	// Afficher un polygone reliant les marqueurs sur la carte
	let polyline = L.polyline(order, {color: 'blue'});
	polyline.addTo(map);

	// on informe l'utilisateur de ce qu'il se passe à l'écran
	alert("S'affiche sur la carte en bleu l'itinéraire optimisé à vol d'oiseau et en rouge l'itinéraire suivant le réseau routier (si celui-ci existe) calculé à l'aide de la Leaflet Routing Machine. Un temps de chargement peut être nécéssaire pour ce dernier.");

	// on cherche à afficher le même itinéraire mais passant par le réseau routier en utilisant la Routing Machine de Leaflet
	var routeControl = L.Routing.control({}).addTo(map);
	routeControl.setWaypoints(order); // on informe que les points de passages das le bon ordre sont contenus dans 'order'
	let error = L.Routing.errorControl(routeControl); // on gère les cas qui pourrait renvoyer une erreur
	error.addTo(map);

}