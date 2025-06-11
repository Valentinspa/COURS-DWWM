<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["consent"])) {
        die("Vous devez accepter le traitement des données.");
    }

    $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);

    if (!$email) {
        die("Email invalide.");
    }

    // Traitement ou enregistrement sécurisé
    echo "Merci ! Vos données ont été reçues.";
}
?>