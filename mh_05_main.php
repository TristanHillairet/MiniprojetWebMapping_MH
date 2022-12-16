<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
    crossorigin=""/>
    <link rel="stylesheet" href="MarkerCluster.css"/>
    <link rel="stylesheet" href="MarkerCluster.Default.css"/>
    <link rel="stylesheet" href="mh_05_main.css"/>
    <title>Test Unitaire MH_05</title>
</head>
<body>
    <div id="map"></div>

    <?php
        $pokemons = [];
    //Connexion à la base de données
        $link = new PDO("pgsql:host=localhost;dbname=pokemon","postgres", "postgres");
    //Requête : 
        $query = 'SELECT * FROM pokemon_data';
        $results = $link->prepare($query);
        $results->execute();
    //Parsing du résultat et création d'un array équivalent
        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $pokemons[] = [
                "admin" => $admin,
                "pokemon" => $pokemon,
                "coordinates" => $coordinates,
                "date" => $date,
                "timestamp" => $timestamp
            ];
            /*$admin = $result['admin'];
            $pokemon = $result['pokemon'];
            $coordinates = $result['coordinates'];
            $date = $result['date'];
            $timestamp = $result['timestamp'];
            $pokemons[] = [$admin,$pokemon,$coordinates,$date,$timestamp];*/
        }
    ?>
    <script type="text/javascript">
        var poke_array = <?php echo json_encode($pokemons); ?>; // Stockage côté client de l'array
    </script>
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
     integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
     crossorigin=""></script>
     <script src="leaflet.markercluster.js"></script>
    <script src="mh_05_main.js"></script>
</body>
</html>