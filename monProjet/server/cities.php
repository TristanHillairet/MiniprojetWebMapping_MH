<?php
include 'connexion.php';
//Cette requête retourne toutes les villes qui existent leurs identifiant, noms et coordonnées
$result = pg_query($conn, 'SELECT id, city_name,"coord_sansCRS", coordinates FROM public."Cities" ');

$resultArray = pg_fetch_all($result);
//pourque les données retournés soient en json
echo json_encode($resultArray);
    

 ?>