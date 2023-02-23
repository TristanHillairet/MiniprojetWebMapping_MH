<?php 
//Pour générer la liste déroulante

$db_connection = pg_connect("host=localhost port=5432 dbname=pokemon user='' password='' ") ;
if(isset($_GET["name"])){
    $nom=$_GET["name"];
    $name=$nom."%";
    $query='SELECT id, nom FROM pokedex WHERE nom like $1';
    $result=pg_query_params($query,array($name)) or die('Error message: ' . pg_last_error());
    $objet=[];
    $data=array();
    while ($row = pg_fetch_row($result)) {
        $objet["id"]=(int)$row[0];
        $objet["nom"]=$row[1];
        array_push($data,$objet);
    }
    echo json_encode($data);

}
?>