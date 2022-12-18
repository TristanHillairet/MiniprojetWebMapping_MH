<?php
include('connect.php');

if (isset($_POST['pokemon'])) {
    $requete = "INSERT INTO public.pokemon_data(admin, pokemon, coordinates, date, timestamp) VALUES ('".$_POST['nom']."', '".$_POST['pokemon']."', '".$_POST['coord']."', '".$_POST['time']."', '".$_POST['time']."')";
    $result = pg_query($connexion, $requete);
}
else {
    $sql = "SELECT id, name FROM pokedex ORDER BY name ASC;";
    $result = pg_query($connexion, $sql);
    $resultats = [];
    if (isset($result)) {
        while ($ligne = pg_fetch_assoc($result)) {
            $resultats[] = $ligne;
        }
        echo json_encode($resultats,JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
    }
    else {
        echo "erreur";
    }
}
?>