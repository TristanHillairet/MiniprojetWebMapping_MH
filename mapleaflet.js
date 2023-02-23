//creation de la carte
var map = L.map('map', {
  doubleClickZoom: false
}).setView([0, 0], 13);

L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
maxZoom: 20,
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);


//l'icon de position d'utilisateur
let myIcon = L.icon({
    iconUrl: 'location.png',
    iconSize: [30, 30]
})


//fonction permet de placer un markeur sur la position d'utilisateur
function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(userposition);
    function userposition (position) {
      var user_position = {};
      user_position.lat = position.coords.latitude; 
      user_position.lng = position.coords.longitude; 
      // markeur de position d'utilisateur
      var abc = L.marker([position.coords.latitude, position.coords.longitude],{icon :myIcon});
      abc.addTo(map);
      // déplacer la carte pour que l'emplacement soit au centre
      map.panTo(new L.LatLng(user_position.lat, user_position.lng));
      callback(user_position);
    };
  }
  else {
    console.log("Geolocation is not supported by this browser.");
  }
}
//appliquer la fonction de positionnement 
getLocation(function(position){
  console.log("");
})


//lorsque l'utilisateur entre quelque chose, le serveur charge les noms des pokémons qui commencent par les lettres entrées. 
let input=document.getElementById("myInput");
input.addEventListener('input',function(event){
  var nompokemon=input.value;
  var url="list.php?name="+nompokemon;
  fetch(url,{
    method: 'get',
  })
  .then(function (reponse){
    return reponse.json();
   
  })
  .then(function (rep){
    var data=[];// la liste des noms de pokemons 
    for (var i = 0; i < rep.length; i++){
      data.push(rep[i].nom);
    }
    autocomplete(input, data);// appliquer la function autocomplate 

  }) 
})


// la la function autocomplate
function autocomplete(inp, arr) {
  /*La fonction d'autocomplétion prend deux arguments,
  l'élément de champ de texte et un tableau de valeurs d'autocomplétion possibles :*/
  var currentFocus;
  /*exécuter une fonction lorsque quelqu'un écrit dans le champ de texte :*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*fermer toute liste de valeurs autocomplétées déjà ouverte*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*créer un élément DIV qui contiendra les éléments (valeurs) :*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*ajouter l'élément DIV en tant qu'enfant du conteneur d'autocomplétion :*/
      this.parentNode.appendChild(a);
      /*pour chaque élément du tableau...*/
      for (i = 0; i < arr.length; i++) {
        /*vérifier si l'élément commence par les mêmes lettres que la valeur du champ de texte :*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*créer un élément DIV pour chaque élément correspondant :*/
          b = document.createElement("DIV");
          /*mettre les lettres correspondantes en gras :*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insère un champ de saisie qui contiendra la valeur de l'élément courant du tableau :*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*exécuter une fonction lorsque quelqu'un clique sur la valeur de l'élément (élément DIV) :*/
              b.addEventListener("click", function(e) {
              /*insèrer la valeur du champ de texte autocomplété :*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*fermer la liste de valeurs autocomplétées,
              (ou toute autre liste ouverte de valeurs autocomplétées :*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  /*L'exécution d'une fonction permet d'appuyer sur une touche du clavier :*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*Si l'on appuie sur la touche flèche vers le bas,
        la variable currentFocus est augmentée :*/
        currentFocus++;
        /*et et rendre l'élément actuel plus visible :*/
        addActive(x);
      } else if (e.keyCode == 38) { 
        /*Si la touche flèche vers le haut est pressée,
        la variable currentFocus est diminuée :*/
        currentFocus--;
        /*et et rendre l'élément actuel plus visible :*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*Si la touche ENTER est enfoncée, empêche la soumission du formulaire,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*et simuler un clic sur l'élément "actif" :*/
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    /*une fonction permet de classer les élèments comme "active":*/
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*ajouter la classe "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*une fonction permettant de supprimer la classe "active" de tous les éléments d'autocomplétion :*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*ferme toutes les listes de complétion automatique dans le document,
    sauf celle qui est passée en argument :*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
    }
  }

  /*exécuter une fonction lorsque quelqu'un clique dans le document :*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
   });
}



//Creer un icon pour afficher tous lespokemons 
let iconPokemon = L.icon({
  iconUrl: 'pokeball.png',
  iconSize: [20, 20]
})


// valider la recherche et ajouter les pokemons sur la carte
let _polyline;   //creation d'un polyline pour liéer entre position utilisateur est pokemon
let form=document.getElementById('form');
form.addEventListener("submit",valider);
function valider(event){
  event.preventDefault();
  let lien="latlong.php?input="+input.value;
  fetch(lien,{
    method: 'get',
  })
  .then(function (reponse){
    return reponse.json();
  })
  .then(function (rep){
    let all_dist_pok=[]; /* Créer une liste pour stocker la distance entre chaque pokemon et la position d'utilisateur
                            avec son alt et lng */
    
    for (var i = 0; i < rep.length; i++){
      // créer des markeurs pour tous les pokemons et les ajouter sur la carte
      let pokemonmark=L.marker([rep[i].lat,rep[i].long ],{icon :iconPokemon});
      pokemonmark.addTo(map);
      // l'objet positionpok pour garder la position de chaque pokemon
      let positionpok={lat : rep[i].lat, lng: rep[i].long};
      // à chaque validation de la recherche on supprime les pokemons existé et la polyline
      form.addEventListener("submit",function(){
        map.removeLayer(pokemonmark);
        if (map.hasLayer(_polyline)) {
          map.removeLayer(_polyline);
        }
      })
      // la fonction getLocation permet d'obtenir la localisation d'utilisateur
      getLocation(function(lat_lng){
        // calculer la distance entre utilisateur et pokemon
        let distance=map.distance(positionpok,lat_lng);
        let dist_pok={}; // stocker la distance et latlng de pokemon 
        dist_pok.distance=distance;
        dist_pok.LatLng=positionpok;
        all_dist_pok.push(dist_pok);
        // quand la liste est rempli totalement on cherche la distance minimal et latlng de pokemon plus proche
        if( all_dist_pok.length==rep.length){
          let mindistance = all_dist_pok[0].distance;
          let minlatlng=all_dist_pok[0].LatLng;
          for(var i=1; i<rep.length; i++){
            if(all_dist_pok[i].distance < mindistance){
              mindistance=all_dist_pok[i].distance;
              minlatlng=all_dist_pok[i].LatLng;
            }
          }
          // une fois la distance minimale (pokemon plus proche) est trouvé on zoom sur son markeur
          map.setView([minlatlng.lat,minlatlng.lng],10);
          // on dessine un polyline pour lier le pokemon et notre position
          _polyline = L.polyline([minlatlng,lat_lng], {
            color: 'yellow'
          });
          _polyline.addTo(map);
          // afficher la distance minimale 
          document.getElementById('length').innerHTML="distance minimale "+mindistance+"m";
        }
        // ajouter la possibiliter de mesurer la distance pour tous les pokemons
          pokemonmark.addEventListener('click',function(e){
          if (!_polyline) {

          // premier point c'est le pokemon clické
          let _firstLatLng = e.latlng;
          //dessiner le polyline
          _polyline = L.polyline([_firstLatLng,lat_lng], {
            color: 'red'
          });
          _polyline.addTo(map);
          //mesurer la distance
          let _length = map.distance(_firstLatLng, lat_lng);
          document.getElementById('length').innerHTML = _length+"m";
          } else {
            map.removeLayer(_polyline);
            _polyline = null;
          }
          })
        
      }) 
    }
  })
}

 








