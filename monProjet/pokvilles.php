<?php
include 'connexion.php';

$ville=$_GET['ville'];
$query= "SELECT  name, town, pokemon_img FROM public.pokedex WHERE town LIKE '%{$ville}%' ";

$result =pg_query($conn, $query);



$resultArray = pg_fetch_all($result);
echo json_encode($resultArray);
    

 ?>