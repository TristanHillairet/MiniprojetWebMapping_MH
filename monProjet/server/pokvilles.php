<?php
include 'connexion.php';
//lorsque l'utilisateur clique sur une ville son nom est envoyé par une requête GET
$ville=$_GET['ville'];
//Ici on sélectionne les pokémons qui se trouvent dans cette meme ville. Et puisque l'attribut 'town' peut pour certains pokemons les trouver dans plusieurs villes sous la forme "ville1;villes2;..." Donc pour la requête j'ai mis un % au début et à la fin du nom de la ville
$query= "SELECT  name, town, pokemon_img FROM public.pokedex WHERE town LIKE '%{$ville}%' ";

$result =pg_query($conn, $query);



$resultArray = pg_fetch_all($result);
//pourque les données retournés soient en json
echo json_encode($resultArray);
    

 ?>