<?php
$user_id = $_SESSION['user_id'];

// Exemple : suppression dans une base MySQL
$pdo = new PDO("mysql:host=localhost;dbname=mon_site", "root", "");
$stmt = $pdo->prepare("DELETE FROM utilisateurs WHERE id = ?");
$stmt->execute([$user_id]);

echo "Vos données ont été supprimées.";
?>
