var map;
var zoom = 8;
var pokemonMap1 = new L.tileLayer('http://localhost:8080/geoserver/gwc/service/tms/1.0.0/ProjetWebMapping%3Abasemap_pokemon@EPSG%3A900913@png/{z}/{x}/{y}.png', { tms: true });

$(function () {
    map = new L.map('map', {
        center: new L.LatLng(47.455444, 2.480985),
        zoom: zoom ,
        zoomControl: true,
        layers: [pokemonMap1]
    });
    map.attributionControl.setPrefix('');
    var overlays = {
        "carte de Kanto: overview": pokemonMap1,
        
    };
    L.control.layers(overlays, null, {collapsed: false}).addTo(map);


    var ville = "";
    var image = "";
    
    let lien="http://localhost:800/monProjet/cities.php";
    fetch(lien,{
        method: 'get',
    })
    .then(function (reponsehttp){
        return reponsehttp.json();
    })
    .then(function (reponse){
        for (var i = 0; i < reponse.length; i++){
            let coord = reponse[i].coordinates;
            let tab_coord = coord.split(",");
            let latitude = tab_coord[0];
            let longitude = tab_coord[1];

            
            let myIcon = L.Icon.extend({options :{
                iconUrl:'/monProjet/images/pinpoint.png',
                iconSize: [60, 60],
                //iconAnchor: [10, 10],
                //labelAnchor: [6, 0] 
            }});
            var ic = new myIcon({iconSize: [60, 60]});
            let iconOptions={
                title:reponse[i].city_name,
                icon:myIcon,
                id:reponse[i].id
                };
            let marker = L.marker([latitude,longitude],{icon: ic}).bindTooltip(reponse[i].city_name, { noHide: true  }).addTo(map);
            marker.addEventListener('click',onIcon); 

            var popup = L.popup();
            function onIcon(e){
                name_icon = iconOptions.title;
                let ville = name_icon.substr(0, 3);
                let lien2="http://localhost:800/monProjet/pokvilles.php?ville="+ville;
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
                        L.push(reponse[i].name);
                        I.push(reponse[i].pokemon_img);
                        if (L.length != 0){
                            popup
                            .setLatLng(e.latlng)
                            .setContent("<div id='container'><span id='text'> Nom de la ville </span> <div id='pokemons'> </div> </div> ")
                            .openOn(map);
                            document.getElementById('text').textContent= name_icon;
                            
                            for (var i = 0; i < L.length; i++){
                                var img = document.createElement('img');
                                img.src =I[i];var img1 = document.createElement('img');
                                img.src =I[i];
                                document.getElementById('pokemons').appendChild(img);
                            }

                        } 
                        else {
                            console.log("Hopla");
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
                    console.log("le nombre de pokemons dans "+ name_icon + " est "+L.length);   
                })
                
            }
            

        }
        
        
    })

    

    
})
