<?php 
//Pour afficher les pokemons sur la carte

$db_connection = pg_connect("host=localhost port=5432 dbname=pokemon user='' password=''") ;
if(isset($_GET["input"])){
    $pokemon=$_GET["input"];
    $query='SELECT lat,long,pokemon FROM pokemon_data WHERE pokemon like $1';
    $result=pg_query_params($query,array($pokemon)) or die('Error message: ' . pg_last_error());
    $objet=[];
    $data=array();
    while ($row = pg_fetch_row($result)) {
        $objet["lat"]=floatval($row[0]);
        $objet["long"]=floatval($row[1]);
        $objet["nom"]=$row[2];
        array_push($data,$objet);
    }
    echo json_encode($data);

}