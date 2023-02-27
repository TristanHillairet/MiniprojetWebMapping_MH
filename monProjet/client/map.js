var map;
var zoom = 8;
//Ici je met le lien de la couche tuilée que j'ai publié sur geoserver et j'ai limité le max de zoom parceque si on zoom plus que 8 les tuiles disparaissent
var pokemonMap = new L.tileLayer('http://localhost:8080/geoserver/gwc/service/tms/1.0.0/ProjetWebMapping%3Abasemap_pokemon@EPSG%3A900913@png/{z}/{x}/{y}.png', { tms: true , maxZoom: 8});


$(function () {
    //si on avait plusieurs couches à visualiser on les ajoute dans overlays
    map = new L.map('map', {
        center: new L.LatLng(47.455444, 2.480985),
        zoom: zoom ,
        zoomControl: true,
        layers: [pokemonMap]
    });
    map.attributionControl.setPrefix('');
    var overlays = {
        "carte de Kanto": pokemonMap,
        
    };
    L.control.layers(overlays, null, {collapsed: false}).addTo(map);

    //Pour avoir les différentes villes et leurs coordonnées on fait appel à cities.php qui renvoie des json
    let lien="/monProjet/server/cities.php";
    fetch(lien,{
        method: 'get',
    })
    .then(function (reponsehttp){
        return reponsehttp.json();
    })
    .then(function (reponse){
        for (var i = 0; i < reponse.length; i++){
            //les coordonnées de chaque ville sont stockés dans un attribut 'coordinates' sous format 'latitude,longitude'
            let coord = reponse[i].coordinates;
            //on fait un split sur ',' pour avoir une liste de latitude et longitude où le premier élément de la liste c'est la latitude de la ville et le deuxième élément est la longitude
            let tab_coord = coord.split(",");
            let latitude = tab_coord[0];
            let longitude = tab_coord[1];

            //je veux que le marker soit personnalisé (un pinpoint avec le logo de pokémon)
            let myIcon = L.Icon.extend({options :{
                iconUrl:'/monProjet/images/pinpoint.png',
                iconSize: [60, 60],
                 
            }});
            var ic = new myIcon({iconSize: [60, 60]});
            //j'affecte au titre de l'icone le nom de la ville et l'id son identifiant
            let iconOptions={
                title:reponse[i].city_name,
                icon:myIcon,
                id:reponse[i].id
                };
            //le marker prend en paramètre la latitude longitude que nous avons récupéré de la table cities et affiche le nom de la ville associé à l'aide de la fonction bindTooltip()
            let marker = L.marker([latitude,longitude],{icon: ic}).bindTooltip(reponse[i].city_name, { noHide: true  }).addTo(map);
            marker.addEventListener('click',onIcon); 

            var popup = L.popup();
            //lorque l'on clique sur le marker on execute les fonctionnalités suivantes:
            function onIcon(e){
                name_icon = iconOptions.title;
                //je ne prend que les 3 premières lettres du nom de la ville parce que dans la requete sql j'ai %ville% donc on n'a pas besoin du nom en entier
                let ville = name_icon.substr(0, 3);
                let lien2="/monProjet/server/pokvilles.php?ville="+ville;
                L=[];
                I=[];
                fetch(lien2,{
                    method: 'get',
                })
                .then(function (reponsehttp){
                    return reponsehttp.json();
                })
                .then(function (reponse){
                    
                    for (var i = 0; i < reponse.length; i++){
                        //on remplie la liste L avec les pokémons présents dans la ville en question
                        L.push(reponse[i].name);
                        //et dans la liste I les url des images de chaque pokémon
                        I.push(reponse[i].pokemon_img);
                        if (L.length != 0){
                            //tant que nous avons des pokémons dans la ville on veut les afficher dans une popup
                            popup
                            .setLatLng(e.latlng)
                            .setContent("<div id='container'><span id='text'> Nom de la ville </span> <div id='pokemons'> </div> </div> ")
                            .openOn(map);
                            //on utilise la fonction suivante pourque le nom de la ville change à chaque fois
                            document.getElementById('text').textContent= name_icon;
                            
                            for (var i = 0; i < L.length; i++){
                                //on crée une balise image pour pouvoir afficher l'image de chaque pokémon
                                var img = document.createElement('img');  
                                img.src =I[i];
                                //ensuite on ajoute cette balise image à notre div qui regroupera les pokémons
                                document.getElementById('pokemons').appendChild(img);
                            }

                        } 
                        else {
                            //là je voulais dans le cas où il n'y a pas de pokémons dans la ville en question de l'indiquer à l'utilisateur mais je ne sais pas pourquoi le programme n'entre pas dans cette boucle meme lorseque cette condition est vérifiée
                            popup
                            .setLatLng(e.latlng)
                            .setContent("<div id='container'><span id='text'> Nom de la ville </span> <div id='pokemons'> </div> </div> ")
                            .openOn(map);
                            document.getElementById('text').textContent= name_icon;
                            var parag = document.createElement('p');
                            parag.innerHTML="Cette ville ne contient pas de pokemons";
                            document.getElementById('pokemons').appendChild(parag);
                            
                            
                        }

                        
                        
    
                    }
                    //Ici pour tester que ma requête renvoie des résultats corrects
                    console.log("le nombre de pokemons dans "+ name_icon + " est "+L.length);   
                })
                
            }
            

        }
        
        
    })

    

    
})
