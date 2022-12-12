<?php

$link = mysqli_connect('localhost', 'root', 'root', 'pokemon');
mysqli_set_charset($link, "utf8");

if (isset($_POST['pokemon'])){

    $query = "SELECT pokemon, coordinates FROM pokemon_data";
    $POKEMON = mysqli_query($link,$query);
    $pokemon = [];

    if (isset($POKEMON)){
        while($rows1 = mysqli_fetch_assoc($POKEMON)){
            $pokemon[]=$rows1;
        }
        echo json_encode($pokemon, JSON_NUMERIC_CHECK);
    }

    else if (!isset($pokemon)){
        echo "la requête n'est pas bonne";
    }

}

else if (isset($_POST['select'])){

    $nom = $_POST['select'];

    $query = "SELECT pokemon, coordinates FROM pokemon_data WHERE pokemon='$nom'";
    $POKEMON = mysqli_query($link,$query);
    $pokemon = [];

    if (isset($POKEMON)){
        while($rows1 = mysqli_fetch_assoc($POKEMON)){
            $pokemon[]=$rows1;
        }
        echo json_encode($pokemon, JSON_NUMERIC_CHECK);
    }

    else if (!isset($pokemon)){
        echo "la requête n'est pas bonne";
    }
    
}


?>