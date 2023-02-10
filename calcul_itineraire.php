<?php
    // on initialise les paramètres permettant la connexion à la base de données de test Pokemon
    $connexion = new PDO('pgsql:host=localhost;port=5432;dbname=pokemon', 'postgres', 'postgres');
    // initialisation du fichier JSON sur lequel les résultats de la requête SQL vont être renvoyé
    $json = json_decode(file_get_contents('php://input'), true);

    // communication avec le fichier 'calcul_itinéraire.js' pour savoir quand faire la requête SQL
    if (isset($json["initialisation"] ) == true) { //Renvoi l'intégralité de la table pour faire tourner la fonction principale en analysant chacune des lignes

        $sql = "SELECT * FROM pokemon_data LIMIT 100;"; // renvoie les 100 premières lignes de la table contenant les pokemons (bien suffisant pour voir que l'algo d'optimisation fonctionne)
        $resultset = $connexion->prepare($sql);
        $resultset->execute(); // on execute la requête SQL

        $tableau = []; // initialisation d'un tableau vide qui va par la suite contenir les résultats
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row); // on extrait et parcourt chacune des lignes selectionnées par la précédente requête SQL
            $tableau[] = [
                "pokemon" => $pokemon,
                "coordinates" => $coordinates // on récupère pour chaque pokemon son nom et ses coordonnées et on les mets dans le tableau
            ];
        }
        echo json_encode($tableau); // on encode le tableau contenant toutes les données souahitées dans le fichier JSON qui est renvoyé vers la page web
    }

?>