<?php
$password = $_POST["password"];
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Pour vérifier lors d'une connexion :
if (password_verify($_POST["password"], $hashed)) {
    echo "Mot de passe correct";
}
?>