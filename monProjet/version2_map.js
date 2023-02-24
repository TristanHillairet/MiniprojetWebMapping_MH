var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
});
//var bounds = [[0,0], [1000,1000]];
var bounds = [[-26.5,-25], [1818,2571]];
var image = L.imageOverlay('/monProjet/LGPE_Kanto_Map.png', bounds).addTo(map);
map.fitBounds(bounds);


let lien="http://localhost:800/monProjet/cities.php";
    fetch(lien,{
        method: 'get',
    })
    .then(function (reponsehttp){
        return reponsehttp.json();
    })
    .then(function (reponse){
        for (var i = 0; i < reponse.length; i++){
            let coord = reponse[i].coord_sansCRS;
            let tab_coord = coord.split(",");
            let x = tab_coord[0];
            let y = tab_coord[1];

            
            let myIcon = L.Icon.extend({options :{
                iconUrl:'/monProjet/images/pinpoint.png',
                iconSize: [60, 60],
                
            }});
            var ic = new myIcon({iconSize: [50, 50]});
            let iconOptions={
                title:reponse[i].city_name,
                icon:myIcon,
                id:reponse[i].id
                };
            let marker = L.marker([x,y],{icon: ic}).bindTooltip(reponse[i].city_name, { noHide: true  }).addTo(map);
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