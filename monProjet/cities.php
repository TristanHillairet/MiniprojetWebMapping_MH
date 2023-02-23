<?php
include 'connexion.php';

$result = pg_query($conn, 'SELECT id, city_name, coordinates FROM public."Cities" ');

$resultArray = pg_fetch_all($result);
echo json_encode($resultArray);
    

 ?>