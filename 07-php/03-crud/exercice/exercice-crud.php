<?php
require "../../ressources/service/_pdo.php";
try {

    $db = connexionPDO();

} catch(PDOException $e) {

    die("Erreur de connexion : " . $e->getMessage());
}
$idUser = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($idUser == 0){
    die("ID utilisateur manquant dans l'URL");
}
