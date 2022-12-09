<?php
    $connexion = new PDO('pgsql:host=localhost;port=5432;dbname=pokemon', 'postgres', 'postgres');
    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json["initialisation"] ) == true) { //Renvoi l'intégralité de la table pour faire tourner la fonction principale en analysant chacune des lignes

        $sql = "SELECT * FROM pokemon_data;";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "pokemon" => $pokemon,
                "coordinates" => $coordinates
            ];
        }
        echo json_encode($tableau);

?>