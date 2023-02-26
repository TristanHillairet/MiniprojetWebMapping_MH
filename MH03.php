<?php

// 1 LIEN VERS LA BASE DE DONNEE DES POKEMONS
$link = mysqli_connect('localhost', 'root', 'root', 'pokemon');
mysqli_set_charset($link, "utf8");

// 2 REQUETE QUI SELECTIONNE TOUS LES POKEMON ET LEURS COORDONNEES 
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

// 3 REQUETE QUI SELECTIONNE LES COORDONNES DES POKEMONS SEMBLABLES A CELUI EN INPUT
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

// 4 REQUETE QUI SELECTIONNE TOUS LES POKEMONS DU POKEDEX
else if (isset($_POST['form'])){
    $query = "SELECT name FROM pokedex";
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

// 5 REQUETE QUI CONVERTIT LE POKEMON EN ENTREE EN SON TYPE
else if (isset($_POST['pok2type'])){
    $nom = $_POST['pok2type'];
    $query = "SELECT `Type 1` FROM `pokedex` WHERE `Name`='$nom'";
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

// REQUETE QUI CONVERTIT LE TYPE EN ENTREE EN UNE LISTE DE TOUS LES POKEMONS DE CE TYPE
else if (isset($_POST['type2pok'])){
    $type = $_POST['type2pok'];
    $query = "SELECT `Name` FROM `pokedex` WHERE `Type 1`='$type'";
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