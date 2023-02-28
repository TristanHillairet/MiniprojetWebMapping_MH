<?php
    $connexion = new PDO('pgsql:host=localhost;port=5432;dbname=pokemon', 'postgres', 'postgres');
    $json = json_decode(file_get_contents('php://input'), true);



    //Première requête: renvoie les 50 premiers résultats
    $sql = "SELECT * FROM pokemon_data LIMIT 50;";
    //Pourquoi pas étendre la recherche à tous les resultats
    //$sql = "SELECT * FROM pokemon_data;";
    $resultset = $connexion->prepare($sql);
    $resultset->execute();

    $tableau = [];
    while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
        extract($row);
        $tableau[] = [
            "admin" => $admin,
            "pokemon" => $pokemon,
            "coordinates" => $coordinates,
            "date" => $date,
            "timestamp" => $timestamp
        ];
    }

    echo json_encode($tableau);
?>