<?php
session_start();

// Simulation : on récupère les données de l'utilisateur connecté en BDD
$user_id = $_SESSION['user_id'];
$data = [
    "email" => "user@example.com",
    "prenom" => "Pierre",
    "preferences" => ["newsletter" => true]
];

// Envoi au format JSON
header("Content-Type: application/json");
header("Content-Disposition: attachment; filename=user_data.json");
echo json_encode($data, JSON_PRETTY_PRINT);
exit;
?>