<?php 
// On vérifie que l'utilisateur est bien connecté.
require "../ressources/service/_shouldBeLogged.php";
shouldBeLogged(true, "./exercice/login.php");

// On se connecte à la base de donnée.
require "../ressources/service/_pdo.php";
$db = connexionPDO();
// On supprime l'utilisateur :
$sql = $db->prepare("DELETE FROM users WHERE idUser = ?");
$sql->execute([$_SESSION["user_id"]]);

// L'utilisateur est supprimé, mais il est encore connecté, il faut le déconnecter :
session_destroy();
unset($_SESSION);
setcookie("PHPSESSID", "", time()-3600);

// J'attends 5 secondes avant de le rediriger pour qu'il puisse voir le message de confirmation :
header("refresh: 5;url=/");
$title = "CRUD - Suppression Utilisateur";
require "../ressources/template/_header.php";
?>
<p>
    Vous avez bien supprimé votre compte. <br>
    Vous allez être redirigé d'ici peu.
</p>
<?php 
require "../ressources/template/_footer.php";
?>