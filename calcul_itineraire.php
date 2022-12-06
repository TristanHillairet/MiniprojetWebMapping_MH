<?php
    $connexion = new PDO('pgsql:host=localhost;port=5432;dbname=pokemon', 'postgres', 'postgres');
    $json = json_decode(file_get_contents('php://input'), true);

?>