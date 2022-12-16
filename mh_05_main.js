let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
localStorage.clear();
console.log(poke_array);

let markers = L.markerClusterGroup();


/*for (let i = 0; i < 50; i++) {
    const pokemon = poke_array[i];
    str = pokemon['coordinates'];
    nom = pokemon['pokemon'];
    let strmod = str.substring(1, str.length - 1 );
    let coord = strmod.split(',');
    console.log(coord);
    mark = L.marker(coord);
    markers.addLayer(mark);
}*/
map.addLayer(markers);
map.addEventListener('zoom',cluster);
function cluster(){
    console.log('ping');
}

//Requête pour récupérer la liste des pokémons

/*fetch('mh_05_main.php',{
    method: 'post',
    body: JSON.stringify({["initialisation"] : true})
})
.then(results => results.json())
.then(results => {
    console.log(results);
    results.forEach(function (result) {
        
        let admin = result.admin;
        let pokemon = result.pokemon;
        let coordinates = JSON.parse(result.coordinates);
        let date = result.date;
        let timestamp = result.timestamp
    });
})*/

//Déclaration des 151 sprites
let Icon01 = L.icon({iconUrl: '../Pokemons/bulbasaur.png', iconSize: [50,50]});
let Icon02 = L.icon({iconUrl: '../Pokemons/ivysaur.png', iconSize: [50,50]});
let Icon03 = L.icon({iconUrl: '../Pokemons/venusaur.png', iconSize: [50,50]});
let Icon04 = L.icon({iconUrl: '../Pokemons/charmander.png', iconSize: [50,50]});
let Icon05 = L.icon({iconUrl: '../Pokemons/charmeleon.png', iconSize: [50,50]});
let Icon06 = L.icon({iconUrl: '../Pokemons/charizard.png', iconSize: [50,50]});
let Icon07 = L.icon({iconUrl: '../Pokemons/squirtle.png', iconSize: [50,50]});
let Icon08 = L.icon({iconUrl: '../Pokemons/wartortle.png', iconSize: [50,50]});
let Icon09 = L.icon({iconUrl: '../Pokemons/blastoise.png', iconSize: [50,50]});
let Icon10 = L.icon({iconUrl: '../Pokemons/caterpie.png', iconSize: [50,50]});
let Icon11 = L.icon({iconUrl: '../Pokemons/metapod.png', iconSize: [50,50]});
let Icon12 = L.icon({iconUrl: '../Pokemons/butterfree.png', iconSize: [50,50]});
let Icon13 = L.icon({iconUrl: '../Pokemons/weedle.png', iconSize: [50,50]});
let Icon14 = L.icon({iconUrl: '../Pokemons/kakuna.png', iconSize: [50,50]});
let Icon15 = L.icon({iconUrl: '../Pokemons/beedrill.png', iconSize: [50,50]});
let Icon16 = L.icon({iconUrl: '../Pokemons/pidgey.png', iconSize: [50,50]});
let Icon17 = L.icon({iconUrl: '../Pokemons/pidgeotto.png', iconSize: [50,50]});
let Icon18 = L.icon({iconUrl: '../Pokemons/pidgeot.png', iconSize: [50,50]});
let Icon19 = L.icon({iconUrl: '../Pokemons/rattata.png', iconSize: [50,50]});
let Icon20 = L.icon({iconUrl: '../Pokemons/raticate.png', iconSize: [50,50]});
let Icon21 = L.icon({iconUrl: '../Pokemons/spearow.png', iconSize: [50,50]});
let Icon22 = L.icon({iconUrl: '../Pokemons/fearow.png', iconSize: [50,50]});
let Icon23 = L.icon({iconUrl: '../Pokemons/ekans.png', iconSize: [50,50]});
let Icon24 = L.icon({iconUrl: '../Pokemons/arbok.png', iconSize: [50,50]});
let Icon25 = L.icon({iconUrl: '../Pokemons/pikachu.png', iconSize: [50,50]});
let Icon26 = L.icon({iconUrl: '../Pokemons/raichu.png', iconSize: [50,50]});
let Icon27 = L.icon({iconUrl: '../Pokemons/sandshrew.png', iconSize: [50,50]});
let Icon28 = L.icon({iconUrl: '../Pokemons/sandslash.png', iconSize: [50,50]});
let Icon29 = L.icon({iconUrl: '../Pokemons/nidoran-f.png', iconSize: [50,50]});
let Icon30 = L.icon({iconUrl: '../Pokemons/nidorina.png', iconSize: [50,50]});
let Icon31 = L.icon({iconUrl: '../Pokemons/nidoqueen.png', iconSize: [50,50]});
let Icon32 = L.icon({iconUrl: '../Pokemons/nidoran-m.png', iconSize: [50,50]});
let Icon33 = L.icon({iconUrl: '../Pokemons/nidorino.png', iconSize: [50,50]});
let Icon34 = L.icon({iconUrl: '../Pokemons/nidoking.png', iconSize: [50,50]});
let Icon35 = L.icon({iconUrl: '../Pokemons/clefairy.png', iconSize: [50,50]});
let Icon36 = L.icon({iconUrl: '../Pokemons/clefable.png', iconSize: [50,50]});
let Icon37 = L.icon({iconUrl: '../Pokemons/vulpix.png', iconSize: [50,50]});
let Icon38 = L.icon({iconUrl: '../Pokemons/ninetales.png', iconSize: [50,50]});
let Icon39 = L.icon({iconUrl: '../Pokemons/jigglypuff.png', iconSize: [50,50]});
let Icon40 = L.icon({iconUrl: '../Pokemons/wigglytuff.png', iconSize: [50,50]});
let Icon41 = L.icon({iconUrl: '../Pokemons/zubat.png', iconSize: [50,50]});
let Icon42 = L.icon({iconUrl: '../Pokemons/golbat.png', iconSize: [50,50]});
let Icon43 = L.icon({iconUrl: '../Pokemons/oddish.png', iconSize: [50,50]});
let Icon44 = L.icon({iconUrl: '../Pokemons/gloom.png', iconSize: [50,50]});
let Icon45 = L.icon({iconUrl: '../Pokemons/vileplume.png', iconSize: [50,50]});
let Icon46 = L.icon({iconUrl: '../Pokemons/paras.png', iconSize: [50,50]});
let Icon47 = L.icon({iconUrl: '../Pokemons/parasect.png', iconSize: [50,50]});
let Icon48 = L.icon({iconUrl: '../Pokemons/venonat.png', iconSize: [50,50]});
let Icon49 = L.icon({iconUrl: '../Pokemons/venomoth.png', iconSize: [50,50]});
let Icon50 = L.icon({iconUrl: '../Pokemons/diglett.png', iconSize: [50,50]});
let Icon51 = L.icon({iconUrl: '../Pokemons/dugtrio.png', iconSize: [50,50]});
let Icon52 = L.icon({iconUrl: '../Pokemons/meowth.png', iconSize: [50,50]});
let Icon53 = L.icon({iconUrl: '../Pokemons/persian.png', iconSize: [50,50]});
let Icon54 = L.icon({iconUrl: '../Pokemons/psyduck.png', iconSize: [50,50]});
let Icon55 = L.icon({iconUrl: '../Pokemons/golduck.png', iconSize: [50,50]});
let Icon56 = L.icon({iconUrl: '../Pokemons/mankey.png', iconSize: [50,50]});
let Icon57 = L.icon({iconUrl: '../Pokemons/primeape.png', iconSize: [50,50]});
let Icon58 = L.icon({iconUrl: '../Pokemons/growlithe.png', iconSize: [50,50]});
let Icon59 = L.icon({iconUrl: '../Pokemons/aracanine.png', iconSize: [50,50]});
let Icon60 = L.icon({iconUrl: '../Pokemons/poliwag.png', iconSize: [50,50]});
let Icon61 = L.icon({iconUrl: '../Pokemons/poliwhirl.png', iconSize: [50,50]});
let Icon62 = L.icon({iconUrl: '../Pokemons/poliwrath.png', iconSize: [50,50]});
let Icon63 = L.icon({iconUrl: '../Pokemons/abra.png', iconSize: [50,50]});
let Icon64 = L.icon({iconUrl: '../Pokemons/kadabra.png', iconSize: [50,50]});
let Icon65 = L.icon({iconUrl: '../Pokemons/alakazam.png', iconSize: [50,50]});
let Icon66 = L.icon({iconUrl: '../Pokemons/machop.png', iconSize: [50,50]});
let Icon67 = L.icon({iconUrl: '../Pokemons/machoke.png', iconSize: [50,50]});
let Icon68 = L.icon({iconUrl: '../Pokemons/machamp.png', iconSize: [50,50]});
let Icon69 = L.icon({iconUrl: '../Pokemons/bellsprout.png', iconSize: [50,50]});
let Icon70 = L.icon({iconUrl: '../Pokemons/weepinbell.png', iconSize: [50,50]});
let Icon71 = L.icon({iconUrl: '../Pokemons/victreebel.png', iconSize: [50,50]});
let Icon72 = L.icon({iconUrl: '../Pokemons/tentacool.png', iconSize: [50,50]});
let Icon73 = L.icon({iconUrl: '../Pokemons/tentacruel.png', iconSize: [50,50]});
let Icon74 = L.icon({iconUrl: '../Pokemons/geodude.png', iconSize: [50,50]});
let Icon75 = L.icon({iconUrl: '../Pokemons/graveler.png', iconSize: [50,50]});
let Icon76 = L.icon({iconUrl: '../Pokemons/golem.png', iconSize: [50,50]});
let Icon77 = L.icon({iconUrl: '../Pokemons/ponyta.png', iconSize: [50,50]});
let Icon78 = L.icon({iconUrl: '../Pokemons/rapidash.png', iconSize: [50,50]});
let Icon79 = L.icon({iconUrl: '../Pokemons/slowpoke.png', iconSize: [50,50]});
let Icon80 = L.icon({iconUrl: '../Pokemons/slowbro.png', iconSize: [50,50]});
let Icon81 = L.icon({iconUrl: '../Pokemons/magnemite.png', iconSize: [50,50]});
let Icon82 = L.icon({iconUrl: '../Pokemons/magneton.png', iconSize: [50,50]});
let Icon83 = L.icon({iconUrl: '../Pokemons/farfetchd.png', iconSize: [50,50]});
let Icon84 = L.icon({iconUrl: '../Pokemons/doduo.png', iconSize: [50,50]});
let Icon85 = L.icon({iconUrl: '../Pokemons/dotrio.png', iconSize: [50,50]});
let Icon86 = L.icon({iconUrl: '../Pokemons/seel.png', iconSize: [50,50]});
let Icon87 = L.icon({iconUrl: '../Pokemons/dewgong.png', iconSize: [50,50]});
let Icon88 = L.icon({iconUrl: '../Pokemons/grimer.png', iconSize: [50,50]});
let Icon89 = L.icon({iconUrl: '../Pokemons/muk.png', iconSize: [50,50]});
let Icon90 = L.icon({iconUrl: '../Pokemons/shellder.png', iconSize: [50,50]});
let Icon91 = L.icon({iconUrl: '../Pokemons/cloyster.png', iconSize: [50,50]});
let Icon92 = L.icon({iconUrl: '../Pokemons/gastly.png', iconSize: [50,50]});
let Icon93 = L.icon({iconUrl: '../Pokemons/haunter.png', iconSize: [50,50]});
let Icon94 = L.icon({iconUrl: '../Pokemons/gengar.png', iconSize: [50,50]});
let Icon95 = L.icon({iconUrl: '../Pokemons/onix.png', iconSize: [50,50]});
let Icon96 = L.icon({iconUrl: '../Pokemons/drowzee.png', iconSize: [50,50]});
let Icon97 = L.icon({iconUrl: '../Pokemons/hypno.png', iconSize: [50,50]});
let Icon98 = L.icon({iconUrl: '../Pokemons/krabby.png', iconSize: [50,50]});
let Icon99 = L.icon({iconUrl: '../Pokemons/kingler.png', iconSize: [50,50]});
let Icon100 = L.icon({iconUrl: '../Pokemons/voltorb.png', iconSize: [50,50]});
let Icon101 = L.icon({iconUrl: '../Pokemons/electrode.png', iconSize: [50,50]});
let Icon102 = L.icon({iconUrl: '../Pokemons/exeggcute.png', iconSize: [50,50]});
let Icon103 = L.icon({iconUrl: '../Pokemons/exeggutor.png', iconSize: [50,50]});
let Icon104 = L.icon({iconUrl: '../Pokemons/cubone.png', iconSize: [50,50]});
let Icon105 = L.icon({iconUrl: '../Pokemons/marowak.png', iconSize: [50,50]});
let Icon106 = L.icon({iconUrl: '../Pokemons/hitmonlee.png', iconSize: [50,50]});
let Icon107 = L.icon({iconUrl: '../Pokemons/hitmonchan.png', iconSize: [50,50]});
let Icon108 = L.icon({iconUrl: '../Pokemons/lickitung.png', iconSize: [50,50]});
let Icon109 = L.icon({iconUrl: '../Pokemons/koffing.png', iconSize: [50,50]});
let Icon110 = L.icon({iconUrl: '../Pokemons/weezing.png', iconSize: [50,50]});
let Icon111 = L.icon({iconUrl: '../Pokemons/rhyhorn.png', iconSize: [50,50]});
let Icon112 = L.icon({iconUrl: '../Pokemons/rhydon.png', iconSize: [50,50]});
let Icon113 = L.icon({iconUrl: '../Pokemons/chansey.png', iconSize: [50,50]});
let Icon114 = L.icon({iconUrl: '../Pokemons/tangela.png', iconSize: [50,50]});
let Icon115 = L.icon({iconUrl: '../Pokemons/kangaskhan.png', iconSize: [50,50]});
let Icon116 = L.icon({iconUrl: '../Pokemons/horsea.png', iconSize: [50,50]});
let Icon117 = L.icon({iconUrl: '../Pokemons/seadra.png', iconSize: [50,50]});
let Icon118 = L.icon({iconUrl: '../Pokemons/goldeen.png', iconSize: [50,50]});
let Icon119 = L.icon({iconUrl: '../Pokemons/seaking.png', iconSize: [50,50]});
let Icon120 = L.icon({iconUrl: '../Pokemons/staryu.png', iconSize: [50,50]});
let Icon121 = L.icon({iconUrl: '../Pokemons/starmie.png', iconSize: [50,50]});
let Icon122 = L.icon({iconUrl: '../Pokemons/mr-mime.png', iconSize: [50,50]});
let Icon123 = L.icon({iconUrl: '../Pokemons/scyther.png', iconSize: [50,50]});
let Icon124 = L.icon({iconUrl: '../Pokemons/jynx.png', iconSize: [50,50]});
let Icon125 = L.icon({iconUrl: '../Pokemons/electabuzz.png', iconSize: [50,50]});
let Icon126 = L.icon({iconUrl: '../Pokemons/magmar.png', iconSize: [50,50]});
let Icon127 = L.icon({iconUrl: '../Pokemons/pinsir.png', iconSize: [50,50]});
let Icon128 = L.icon({iconUrl: '../Pokemons/tauros.png', iconSize: [50,50]});
let Icon129 = L.icon({iconUrl: '../Pokemons/magikarp.png', iconSize: [50,50]});
let Icon130 = L.icon({iconUrl: '../Pokemons/gyarados.png', iconSize: [50,50]});
let Icon131 = L.icon({iconUrl: '../Pokemons/lapras.png', iconSize: [50,50]});
let Icon132 = L.icon({iconUrl: '../Pokemons/ditto.png', iconSize: [50,50]});
let Icon133 = L.icon({iconUrl: '../Pokemons/eevee.png', iconSize: [50,50]});
let Icon134 = L.icon({iconUrl: '../Pokemons/vaporeon.png', iconSize: [50,50]});
let Icon135 = L.icon({iconUrl: '../Pokemons/jolteon.png', iconSize: [50,50]});
let Icon136 = L.icon({iconUrl: '../Pokemons/flareon.png', iconSize: [50,50]});
let Icon137 = L.icon({iconUrl: '../Pokemons/porygon.png', iconSize: [50,50]});
let Icon138 = L.icon({iconUrl: '../Pokemons/omanyte.png', iconSize: [50,50]});
let Icon139 = L.icon({iconUrl: '../Pokemons/omastar.png', iconSize: [50,50]});
let Icon140 = L.icon({iconUrl: '../Pokemons/kabuto.png', iconSize: [50,50]});
let Icon141 = L.icon({iconUrl: '../Pokemons/kabutops.png', iconSize: [50,50]});
let Icon142 = L.icon({iconUrl: '../Pokemons/aerodactyl.png', iconSize: [50,50]});
let Icon143 = L.icon({iconUrl: '../Pokemons/snorlax.png', iconSize: [50,50]});
let Icon144 = L.icon({iconUrl: '../Pokemons/articuno.png', iconSize: [50,50]});
let Icon145 = L.icon({iconUrl: '../Pokemons/zapdos.png', iconSize: [50,50]});
let Icon146 = L.icon({iconUrl: '../Pokemons/moltres.png', iconSize: [50,50]});
let Icon147 = L.icon({iconUrl: '../Pokemons/dratini.png', iconSize: [50,50]});
let Icon148 = L.icon({iconUrl: '../Pokemons/dragonair.png', iconSize: [50,50]});
let Icon149 = L.icon({iconUrl: '../Pokemons/dragonite.png', iconSize: [50,50]});
let Icon150 = L.icon({iconUrl: '../Pokemons/mewtwo.png', iconSize: [50,50]});
let Icon151 = L.icon({iconUrl: '../Pokemons/mew.png', iconSize: [50,50]});

//Création du Marker en fonction du type de pokémon
poke_array.forEach(pokemon => {
    str = pokemon['coordinates'];
    nom = pokemon['pokemon'];
    let strmod = str.substring(1, str.length - 1 );
    let coord = strmod.split(',');
    console.log(coord);

    if(nom == 'Bulbasaur'){
        mark = L.marker(coord,{icon: Icon01});
    }
    else if(nom == 'Ivysaur'){
        mark = L.marker(coord,{icon: Icon02});
    }
    else if(nom == 'Venusaur'){
        mark = L.marker(coord,{icon: Icon03});
    }
    else if(nom == 'Charmander'){
        mark = L.marker(coord,{icon: Icon04});
    }
    else if(nom == 'Charmeleon'){
        mark = L.marker(coord,{icon: Icon05});
    }
    else if(nom == 'Charizard'){
        mark = L.marker(coord,{icon: Icon06});
    }
    else if(nom == 'Squirtle'){
        mark = L.marker(coord,{icon: Icon07});
    }
    else if(nom == 'Wartortle'){
        mark = L.marker(coord,{icon: Icon08});
    }
    else if(nom == 'Blastoise'){
        mark = L.marker(coord,{icon: Icon09});
    }
    else if(nom == 'Caterpie'){
        mark = L.marker(coord,{icon: Icon10});
    }
    else if(nom == 'Metapod'){
        mark = L.marker(coord,{icon: Icon11});
    }
    else if(nom == 'Butterfree'){
        mark = L.marker(coord,{icon: Icon12});
    }
    else if(nom == 'Weedle'){
        mark = L.marker(coord,{icon: Icon13});
    }
    else if(nom == 'Kakuna'){
        mark = L.marker(coord,{icon: Icon14});
    }
    else if(nom == 'Beedrill'){
        mark = L.marker(coord,{icon: Icon15});
    }
    else if(nom == 'Pidgey'){
        mark = L.marker(coord,{icon: Icon16});
    }
    else if(nom == 'Pidgeotto'){
        mark = L.marker(coord,{icon: Icon17});
    }
    else if(nom == 'Pidgeot'){
        mark = L.marker(coord,{icon: Icon18});
    }
    else if(nom == 'Rattata'){
        mark = L.marker(coord,{icon: Icon19});
    }
    else if(nom == 'Raticate'){
        mark = L.marker(coord,{icon: Icon20});
    }
    else if(nom == 'Spearow'){
        mark = L.marker(coord,{icon: Icon21});
    }
    else if(nom == 'Fearow'){
        mark = L.marker(coord,{icon: Icon22});
    }
    else if(nom == 'Ekans'){
        mark = L.marker(coord,{icon: Icon23});
    }
    else if(nom == 'Arbok'){
        mark = L.marker(coord,{icon: Icon24});
    }
    else if(nom == 'Pikachu'){
        mark = L.marker(coord,{icon: Icon25});
    }
    else if(nom == 'Raichu'){
        mark = L.marker(coord,{icon: Icon26});
    }
    else if(nom == 'Sandshrew'){
        mark = L.marker(coord,{icon: Icon27});
    }
    else if(nom == 'Sandslash'){
        mark = L.marker(coord,{icon: Icon28});
    }
    else if(nom == 'Nidoran-f'){
        mark = L.marker(coord,{icon: Icon29});
    }
    else if(nom == 'Nidorina'){
        mark = L.marker(coord,{icon: Icon30});
    }
    else if(nom == 'Nidoqueen'){
        mark = L.marker(coord,{icon: Icon31});
    }
    else if(nom == 'Nidoran-m'){
        mark = L.marker(coord,{icon: Icon32});
    }
    else if(nom == 'Nidorino'){
        mark = L.marker(coord,{icon: Icon33});
    }
    else if(nom == 'Nidoking'){
        mark = L.marker(coord,{icon: Icon34});
    }
    else if(nom == 'Clefairy'){
        mark = L.marker(coord,{icon: Icon35});
    }
    else if(nom == 'Clefable'){
        mark = L.marker(coord,{icon: Icon36});
    }
    else if(nom == 'Vulpix'){
        mark = L.marker(coord,{icon: Icon37});
    }
    else if(nom == 'Ninetales'){
        mark = L.marker(coord,{icon: Icon38});
    }
    else if(nom == 'Jigglypuff'){
        mark = L.marker(coord,{icon: Icon39});
    }
    else if(nom == 'Wigglytuff'){
        mark = L.marker(coord,{icon: Icon40});
    }
    else if(nom == 'Zubat'){
        mark = L.marker(coord,{icon: Icon41});
    }
    else if(nom == 'Golbat'){
        mark = L.marker(coord,{icon: Icon42});
    }
    else if(nom == 'Oddish'){
        mark = L.marker(coord,{icon: Icon43});
    }
    else if(nom == 'Gloom'){
        mark = L.marker(coord,{icon: Icon44});
    }
    else if(nom == 'Vileplume'){
        mark = L.marker(coord,{icon: Icon45});
    }
    else if(nom == 'Paras'){
        mark = L.marker(coord,{icon: Icon46});
    }
    else if(nom == 'Parasect'){
        mark = L.marker(coord,{icon: Icon47});
    }
    else if(nom == 'Venomat'){
        mark = L.marker(coord,{icon: Icon48});
    }
    else if(nom == 'Venomoth'){
        mark = L.marker(coord,{icon: Icon49});
    }
    else if(nom == 'Diglett'){
        mark = L.marker(coord,{icon: Icon50});
    }
    else if(nom == 'Dugtrio'){
        mark = L.marker(coord,{icon: Icon51});
    }
    else if(nom == 'Meowth'){
        mark = L.marker(coord,{icon: Icon52});
    }
    else if(nom == 'Persian'){
        mark = L.marker(coord,{icon: Icon53});
    }
    else if(nom == 'Psyduck'){
        mark = L.marker(coord,{icon: Icon54});
    }
    else if(nom == 'Golduck'){
        mark = L.marker(coord,{icon: Icon55});
    }
    else if(nom == 'Mankey'){
        mark = L.marker(coord,{icon: Icon56});
    }
    else if(nom == 'Primeape'){
        mark = L.marker(coord,{icon: Icon57});
    }
    else if(nom == 'Growlithe'){
        mark = L.marker(coord,{icon: Icon58});
    }
    else if(nom == 'Arcanine'){
        mark = L.marker(coord,{icon: Icon59});
    }
    else if(nom == 'Poliwag'){
        mark = L.marker(coord,{icon: Icon60});
    }
    else if(nom == 'Poliwhirl'){
        mark = L.marker(coord,{icon: Icon61});
    }
    else if(nom == 'Poliwrath'){
        mark = L.marker(coord,{icon: Icon62});
    }
    else if(nom == 'Abra'){
        mark = L.marker(coord,{icon: Icon63});
    }
    else if(nom == 'Kadabra'){
        mark = L.marker(coord,{icon: Icon64});
    }
    else if(nom == 'Alakazam'){
        mark = L.marker(coord,{icon: Icon65});
    }
    else if(nom == 'Machop'){
        mark = L.marker(coord,{icon: Icon66});
    }
    else if(nom == 'Machoke'){
        mark = L.marker(coord,{icon: Icon67});
    }
    else if(nom == 'Machamp'){
        mark = L.marker(coord,{icon: Icon68});
    }
    else if(nom == 'Bellsprout'){
        mark = L.marker(coord,{icon: Icon69});
    }
    else if(nom == 'Weepinbell'){
        mark = L.marker(coord,{icon: Icon70});
    }
    else if(nom == 'Victreebel'){
        mark = L.marker(coord,{icon: Icon71});
    }
    else if(nom == 'Tentacool'){
        mark = L.marker(coord,{icon: Icon72});
    }
    else if(nom == 'Tentacruel'){
        mark = L.marker(coord,{icon: Icon73});
    }
    else if(nom == 'Geodude'){
        mark = L.marker(coord,{icon: Icon74});
    }
    else if(nom == 'Graveler'){
        mark = L.marker(coord,{icon: Icon75});
    }
    else if(nom == 'Golem'){
        mark = L.marker(coord,{icon: Icon76});
    }
    else if(nom == 'Ponyta'){
        mark = L.marker(coord,{icon: Icon77});
    }
    else if(nom == 'Rapidash'){
        mark = L.marker(coord,{icon: Icon78});
    }
    else if(nom == 'Slowpoke'){
        mark = L.marker(coord,{icon: Icon79});
    }
    else if(nom == 'Slowbro'){
        mark = L.marker(coord,{icon: Icon80});
    }
    else if(nom == 'Magnemite'){
        mark = L.marker(coord,{icon: Icon81});
    }
    else if(nom == 'Magneton'){
        mark = L.marker(coord,{icon: Icon82});
    }
    else if(nom == "Farfetch'd"){
        mark = L.marker(coord,{icon: Icon83});
    }
    else if(nom == 'Doduo'){
        mark = L.marker(coord,{icon: Icon84});
    }
    else if(nom == 'Dotrio'){
        mark = L.marker(coord,{icon: Icon85});
    }
    else if(nom == 'Seel'){
        mark = L.marker(coord,{icon: Icon86});
    }
    else if(nom == 'Dewgong'){
        mark = L.marker(coord,{icon: Icon87});
    }
    else if(nom == 'Grimer'){
        mark = L.marker(coord,{icon: Icon88});
    }
    else if(nom == 'Muk'){
        mark = L.marker(coord,{icon: Icon89});
    }
    else if(nom == 'Shellder'){
        mark = L.marker(coord,{icon: Icon90});
    }
    else if(nom == 'Cloyster'){
        mark = L.marker(coord,{icon: Icon91});
    }
    else if(nom == 'Gastly'){
        mark = L.marker(coord,{icon: Icon92});
    }
    else if(nom == 'Haunter'){
        mark = L.marker(coord,{icon: Icon93});
    }
    else if(nom == 'Gengar'){
        mark = L.marker(coord,{icon: Icon94});
    }
    else if(nom == 'Onix'){
        mark = L.marker(coord,{icon: Icon95});
    }
    else if(nom == 'Drowzee'){
        mark = L.marker(coord,{icon: Icon96});
    }
    else if(nom == 'Hypno'){
        mark = L.marker(coord,{icon: Icon97});
    }
    else if(nom == 'Krabby'){
        mark = L.marker(coord,{icon: Icon98});
    }
    else if(nom == 'Kingler'){
        mark = L.marker(coord,{icon: Icon99});
    }
    else if(nom == 'Voltorb'){
        mark = L.marker(coord,{icon: Icon100});
    }
    else if(nom == 'Electrode'){
        mark = L.marker(coord,{icon: Icon101});
    }
    else if(nom == 'Exeggcute'){
        mark = L.marker(coord,{icon: Icon102});
    }
    else if(nom == 'Exeggutor'){
        mark = L.marker(coord,{icon: Icon103});
    }
    else if(nom == 'Cubone'){
        mark = L.marker(coord,{icon: Icon104});
    }
    else if(nom == 'Marowak'){
        mark = L.marker(coord,{icon: Icon105});
    }
    else if(nom == 'Hitmonlee'){
        mark = L.marker(coord,{icon: Icon106});
    }
    else if(nom == 'Hitmonchan'){
        mark = L.marker(coord,{icon: Icon107});
    }
    else if(nom == 'Lickitung'){
        mark = L.marker(coord,{icon: Icon108});
    }
    else if(nom == 'Koffing'){
        mark = L.marker(coord,{icon: Icon109});
    }
    else if(nom == 'Weezing'){
        mark = L.marker(coord,{icon: Icon110});
    }
    else if(nom == 'Rhyhorn'){
        mark = L.marker(coord,{icon: Icon111});
    }
    else if(nom == 'Rhydon'){
        mark = L.marker(coord,{icon: Icon112});
    }
    else if(nom == 'Chansey'){
        mark = L.marker(coord,{icon: Icon113});
    }
    else if(nom == 'Tangela'){
        mark = L.marker(coord,{icon: Icon114});
    }
    else if(nom == 'Kangaskhan'){
        mark = L.marker(coord,{icon: Icon115});
    }
    else if(nom == 'Horsea'){
        mark = L.marker(coord,{icon: Icon116});
    }
    else if(nom == 'Seadra'){
        mark = L.marker(coord,{icon: Icon117});
    }
    else if(nom == 'Goldeen'){
        mark = L.marker(coord,{icon: Icon118});
    }
    else if(nom == 'Seaking'){
        mark = L.marker(coord,{icon: Icon119});
    }
    else if(nom == 'Staryu'){
        mark = L.marker(coord,{icon: Icon120});
    }
    else if(nom == 'Starmie'){
        mark = L.marker(coord,{icon: Icon121});
    }
    else if(nom == 'Mr. Mime'){
        mark = L.marker(coord,{icon: Icon122});
    }
    else if(nom == 'Scyther'){
        mark = L.marker(coord,{icon: Icon123});
    }
    else if(nom == 'Jynx'){
        mark = L.marker(coord,{icon: Icon124});
    }
    else if(nom == 'Electabuzz'){
        mark = L.marker(coord,{icon: Icon125});
    }
    else if(nom == 'Magmar'){
        mark = L.marker(coord,{icon: Icon126});
    }
    else if(nom == 'Pinsir'){
        mark = L.marker(coord,{icon: Icon127});
    }
    else if(nom == 'Tauros'){
        mark = L.marker(coord,{icon: Icon128});
    }
    else if(nom == 'Magikarp'){
        mark = L.marker(coord,{icon: Icon129});
    }
    else if(nom == 'Gyarados'){
        mark = L.marker(coord,{icon: Icon130});
    }
    else if(nom == 'Lapras'){
        mark = L.marker(coord,{icon: Icon131});
    }
    else if(nom == 'Ditto'){
        mark = L.marker(coord,{icon: Icon132});
    }
    else if(nom == 'Eevee'){
        mark = L.marker(coord,{icon: Icon133});
    }
    else if(nom == 'Vaporeon'){
        mark = L.marker(coord,{icon: Icon134});
    }
    else if(nom == 'Jolteon'){
        mark = L.marker(coord,{icon: Icon135});
    }
    else if(nom == 'Flareon'){
        mark = L.marker(coord,{icon: Icon136});
    }
    else if(nom == 'Porygon'){
        mark = L.marker(coord,{icon: Icon137});
    }
    else if(nom == 'Omanyte'){
        mark = L.marker(coord,{icon: Icon138});
    }
    else if(nom == 'Omastar'){
        mark = L.marker(coord,{icon: Icon139});
    }
    else if(nom == 'Kabuto'){
        mark = L.marker(coord,{icon: Icon140});
    }
    else if(nom == 'Kabutops'){
        mark = L.marker(coord,{icon: Icon141});
    }
    else if(nom == 'Aerodactyl'){
        mark = L.marker(coord,{icon: Icon142});
    }
    else if(nom == 'Snorlax'){
        mark = L.marker(coord,{icon: Icon143});
    }
    else if(nom == 'Articuno'){
        mark = L.marker(coord,{icon: Icon144});
    }
    else if(nom == 'Zapdos'){
        mark = L.marker(coord,{icon: Icon145});
    }
    else if(nom == 'Moltres'){
        mark = L.marker(coord,{icon: Icon146});
    }
    else if(nom == 'Dratini'){
        mark = L.marker(coord,{icon: Icon147});
    }
    else if(nom == 'Dragonair'){
        mark = L.marker(coord,{icon: Icon148});
    }
    else if(nom == 'Dragonite'){
        mark = L.marker(coord,{icon: Icon149});
    }
    else if(nom == 'Mewtwo'){
        mark = L.marker(coord,{icon: Icon150});
    }
    else if(nom == 'Mew'){
        mark = L.marker(coord,{icon: Icon151});
    }
    else{
        mark = L.marker(coord);
    }
    mark.bindPopup(nom);
    markers.addLayer(mark);
});