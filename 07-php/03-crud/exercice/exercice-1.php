<?php


// J'inclus le fichier qui contient la fonction de connexion à la base de données
require "../../ressources/service/_pdo.php";

// Je démarre un bloc try-catch pour capturer les erreurs de connexion
try {
    // J'appelle la fonction connexionPDO() pour me connecter à la base de données
    // Je stocke cette connexion dans la variable $db
    $db = connexionPDO();

// Si une erreur de connexion se produit, je l'attrape ici
} catch(PDOException $e) {
    // J'arrête complètement le script et j'affiche le message d'erreur
    // $e->getMessage() récupère le détail de l'erreur
    die("Erreur de connexion : " . $e->getMessage());
}

// Je récupère l'ID de l'utilisateur depuis l'URL (?id=1 par exemple)
// isset($_GET['id']) vérifie si 'id' existe dans l'URL
// (int) convertit la valeur en nombre entier pour éviter les injections
// Si 'id' n'existe pas, je mets 0 par défaut avec le :
$idUser = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Je vérifie si l'ID utilisateur est valide (différent de 0)
if ($idUser == 0){
    // Si l'ID vaut 0, cela signifie qu'il n'y en a pas dans l'URL
    // J'arrête le script avec un message d'erreur
    die("ID utilisateur manquant dans l'URL");
}

// Je prépare ma requête SQL pour récupérer les messages d'un utilisateur
// prepare() crée une requête sécurisée avec un placeholder (?)
// Le ? sera remplacé par la valeur de $idUser plus tard
$sqlMessage = $db->prepare("SELECT * FROM messages WHERE idUser = ?");

// J'exécute la requête en remplaçant le ? par la valeur de $idUser
// Je passe $idUser dans un tableau [$idUser] pour la sécurité
$sqlMessage->execute([$idUser]);

// Je récupère TOUS les résultats de ma requête
// fetchAll() récupère toutes les lignes trouvées
// PDO::FETCH_ASSOC me donne un tableau associatif (nom_colonne => valeur)
$message = $sqlMessage -> fetchAll(PDO::FETCH_ASSOC);

// Je vérifie s'il y a des messages trouvés
// (!$message) signifie "si $message est faux" (vide ou null)
if (!$message) {
    // Si aucun message trouvé, j'arrête le script avec un message
    die("Aucun message trouvé pour l'utilisateur avec l'ID : $idUser");
    
// Sinon (s'il y a des messages)
} else {
    // J'affiche un titre avec l'ID de l'utilisateur
    // J'utilise des guillemets doubles pour inclure la variable $idUser directement
    echo "<h1>Messages de l'utilisateur avec l'ID : $idUser</h1>";
    
    
    echo "<ul>";
    
    // Je démarre une boucle pour parcourir chaque message trouvé
    // A chaque tour, $msg contient les données d'UN message
    foreach ($message as $msg) {
        
        // J'affiche chaque message dans un élément de liste
        // $msg['message'] accède à la colonne 'message' du message actuel
        // $msg['createdAt'] accède à la colonne 'createdAt' du message actuel
        // htmlspecialchars() sécurise l'affichage contre les attaques XSS
        echo "<li>" . htmlspecialchars($msg['message']) . " - <em>" . htmlspecialchars($msg['createdAt']) . "</em></li>";
        
    }
    
    
    echo "</ul>";
    
}