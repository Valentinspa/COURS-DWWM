<?php
require "../ressources/service/_shouldBeLogged.php";
shouldBeLogged(true, "./exercice/connexion.php");
isSelectedUser("/04-router/");

// On vérifie qu'il ai bient le droit de supprimer cet utilisateur (lui même)
if(empty($_GET["id"]) || $_SESSION["idUser"] != $_GET["id"]){
    header("Location: /04-router/");
    exit;
}
// On supprime l'utilisateur
require("../ressources/service/_pdo.php");
$pdo = connexionPDO();
$sql = $pdo->prepare("DELETE FROM users WHERE idUser=?");
$sql->execute([(int)$_GET["id"]]);
// Et on le déconnecte.
unset($_SESSION);
session_destroy();
setcookie("PHPSESSID","", time()-3600);
// avant de le rediriger.
header("refresh: 5;url = /");
$title = " CRUD - Delete ";
require("../ressources/template/_header.php");
// rowCount permet de savoir combien de lignes ont été touché par la dernière requête.
echo $sql->rowCount(), " ligne effacée";
?>
<p>
    Vous avez bien <strong>supprimé</strong> votre compte. <br>
    Vous allez être redirigé d'ici peu.
</p>
<?php
require("../ressources/template/_footer.php");
?>