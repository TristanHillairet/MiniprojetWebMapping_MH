var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
});
//Dans cette partie je veux afficher l'image sans la géoréferencer et donc je vais avoir des bornes de ma carte et non un SCR
var bounds = [[-26.5,-25], [1818,2571]];
var image = L.imageOverlay('/monProjet/images/LGPE_Kanto_Map.png', bounds).addTo(map);
map.fitBounds(bounds);

//Pour avoir les différentes villes et leurs position sans SCR on fait appel à cities.php qui renvoie des json
let lien="/monProjet/server/cities.php";
    fetch(lien,{
        method: 'get',
    })
    .then(function (reponsehttp){
        return reponsehttp.json();
    })
    .then(function (reponse){
        for (var i = 0; i < reponse.length; i++){
            //les coordonnées de chaque ville sont stockés dans un attribut 'coord_sansCRS' sous format 'abscisse,ordonnée'
            let coord = reponse[i].coord_sansCRS;
            //on fait un split sur ',' pour avoir une liste d'abscisse x et d'ordonnée y où le premier élément de la liste c'est le x de la ville et le deuxième élément est le y
            let tab_coord = coord.split(",");
            let x = tab_coord[0];
            let y = tab_coord[1];

            //je veux que le marker soit personnalisé (un pinpoint avec le logo de pokémon)            
            let myIcon = L.Icon.extend({options :{
                iconUrl:'/monProjet/images/pinpoint.png',
                iconSize: [60, 60],
                
            }});
            var ic = new myIcon({iconSize: [50, 50]});
            //j'affecte au titre de l'icone le nom de la ville et l'id son identifiant
            let iconOptions={
                title:reponse[i].city_name,
                icon:myIcon,
                id:reponse[i].id
                };
            //le marker prend en paramètre le (x,y) que nous avons récupéré de la table cities et affiche le nom de la ville associé à l'aide de la fonction bindTooltip()
            let marker = L.marker([x,y],{icon: ic}).bindTooltip(reponse[i].city_name, { noHide: true  }).addTo(map);
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