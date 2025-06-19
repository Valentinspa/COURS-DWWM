<?php

require "../../ressources/service/_pdo.php";


if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}


if(!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header("Location: ./exercice-connexion.php");
    exit;
}


$pdo = connexionPDO();


$idUser = $_SESSION['user_id'];


$errorMessage = "";
$successMessage = "";
$modifier = false;
$contenuMessage = "";
$idMessage = null;

// ======== SUPPRESSION D'UN MESSAGE ========
if (isset($_GET['delete'])) {
    $idToDelete = (int)$_GET['delete'];

    // Vérifie que le message appartient bien à l'utilisateur connecté
    $stmt = $pdo->prepare("SELECT * FROM messages WHERE idMessage = ? AND idUser = ?");
    $stmt->execute([$idToDelete, $idUser]);
    $message = $stmt->fetch();

    if ($message) {
        // Suppression du message
        $deleteStmt = $pdo->prepare("DELETE FROM messages WHERE idMessage = ?");
        $deleteStmt->execute([$idToDelete]);
        $successMessage = "Message supprimé avec succès.";
    } else {
        $errorMessage = "Vous ne pouvez pas supprimer ce message.";
    }
}

// ======== L'utilisateur veut modifier un message ========
if (isset($_GET['edit'])) {
    $idMessage = (int)$_GET['edit'];

    // On récupère le message uniquement si c’est celui de l’utilisateur connecté
    $sql = $pdo->prepare("SELECT * FROM messages WHERE idMessage = ? AND idUser = ?");
    $sql->execute([$idMessage, $idUser]);
    $result = $sql->fetch();

    if ($result) {
        $modifier = true; // Active le mode édition
        $contenuMessage = $result['message']; // Pré-remplit la zone de texte avec le message
    } else {
        $errorMessage = "Vous ne pouvez pas modifier ce message.";
    }
}

// ======== AJOUT D’UN NOUVEAU MESSAGE ========
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['envoiMessage'])) {
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    if (!empty($message)) {
        // Insertion du message dans la base de données avec la date de création
        $sql = $pdo->prepare("INSERT INTO messages (message, idUser, createdAt) VALUES (?, ?, NOW())");

        if ($sql->execute([$message, $idUser])) {
            $successMessage = "Votre message a bien été envoyé !";
        }
    } else {
        $errorMessage = "Le message ne peut pas être vide.";
    }
}

// ======== MODIFICATION D’UN MESSAGE EXISTANT ========
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['modifierMessage'])) {
    $nouveauMessage = trim($_POST['message']);
    $idMessage = (int)$_POST['idMessage'];

    if (!empty($nouveauMessage)) {
        // Mise à jour du message avec la date de modification
        $sql = $pdo->prepare("UPDATE messages SET message = ?, updatedAt = NOW() WHERE idMessage = ? AND idUser = ?");
        if ($sql->execute([$nouveauMessage, $idMessage, $idUser])) {
            $successMessage = "Message modifié avec succès !";
            $modifier = false;
            $contenuMessage = "";
        } else {
            $errorMessage = "Erreur lors de la modification du message.";
        }
    } else {
        $errorMessage = "Le message ne peut pas être vide.";
    }
}
?>

<!-- ======== AFFICHAGE DES MESSAGES ======== -->
<h2>Vos messages :</h2>
<ul>
<?php
// On récupère tous les messages de l'utilisateur, les plus récents d'abord
$sql = $pdo->prepare("SELECT * FROM messages WHERE idUser = ? ORDER BY createdAt DESC");
$sql->execute([$idUser]);
$messages = $sql->fetchAll(PDO::FETCH_ASSOC);

// Boucle sur chaque message pour les afficher
foreach ($messages as $msg):
?>
    <li>
        <!-- Affichage du contenu du message -->
        <?php echo htmlspecialchars($msg['message']); ?> <br>

        <!-- Date de création -->
        <small>Créé le : <?php echo htmlspecialchars($msg['createdAt']); ?></small>

        <!-- Affichage de la date de modification si elle existe -->
        <?php if (!empty($msg['updatedAt'])): ?>
            <br><small> Modifié le : <?php echo htmlspecialchars($msg['updatedAt']); ?></small>
        <?php endif; ?>

        <!-- Lien de modification -->
        <br><a href="./message.php?edit=<?php echo $msg['idMessage']; ?>">Modifier</a>

        <!-- Lien de suppression avec confirmation -->
        | <a href="./message.php?delete=<?php echo $msg['idMessage']; ?>" onclick="return confirm('Voulez-vous vraiment supprimer ce message ?');">Supprimer</a>
    </li>
    <hr>
<?php endforeach; ?>
</ul>

<!-- ======== AFFICHAGE DES MESSAGES DE SUCCÈS OU D’ERREUR ======== -->
<?php if (!empty($successMessage)): ?>
    <p style="color: green;"><?php echo $successMessage; ?></p>
<?php endif; ?>

<?php if (!empty($errorMessage)): ?>
    <p style="color: red;"><?php echo $errorMessage; ?></p>
<?php endif; ?>

<!-- ======== FORMULAIRE DE MESSAGE ======== -->
<form action="./message.php<?php if($modifier) echo '?edit=' . $idMessage; ?>" method="post">
    <fieldset>
        <!-- Label en fonction du mode (ajout ou édition) -->
        <label for="message"><?php echo $modifier ? "Modifier votre message :" : "Nouveau message :" ?></label><br>

        <!-- Zone de saisie préremplie si édition -->
        <textarea name="message" id="message" cols="30" rows="5" required><?php echo htmlspecialchars($contenuMessage); ?></textarea><br>

        <?php if ($modifier): ?>
            <!-- Champ caché contenant l’ID du message à modifier -->
            <input type="hidden" name="idMessage" value="<?php echo $idMessage; ?>">

            <!-- Bouton pour modifier -->
            <input type="submit" name="modifierMessage" value="Mettre à jour">

            <!-- Lien pour annuler l’édition -->
            <a href="./message.php">Annuler</a>
        <?php else: ?>
            <!-- Bouton pour ajouter un message -->
            <input type="submit" name="envoiMessage" value="Envoyer">
        <?php endif; ?>
    </fieldset>
</form>

