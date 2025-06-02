<?php 
if(session_status() !== PHP_SESSION_ACTIVE)
{
    /* 
        Par défaut, la durée de vie de la session dépend de la fermeture du navigateur.
        Mais on peut ajouter une durée de vie en seconde :
    */
    session_start(["cookie_lifetime" => 3600]);
}
// ? setcookie est une modification du header, donc doit être avant tout HTML
// si on veux suppriler le cookie :
setcookie("PHPSESSID", "", time()-3600);
// on lui indique une durée de vie négative

$title = "Session page 2";
require "../ressources/template/_header.php";
?>
<h2>Ceci est la session page 2</h2>
<a href="./07-a-session.php">direction page 1</a>
<hr>
<?php 
// Est ce que $_SESSION["logged"] existe et est ce qu'il vaut true;
if(isset($_SESSION["logged"]) && $_SESSION["logged"])
{
    echo "Bonjour {$_SESSION['username']}, {$_SESSION['age']} ans.";
}else
{
    echo "Veuillez passer par la page 1";
}
// Si on souhaite supprimer une donnée, on utilisera "unset"
unset($_SESSION["food"]);
// Si on souhaite supprimer la session en entier :
session_destroy();
// Mais la variable "$_SESSION" est toujours disponible jusqu'au rechargement de la page, donc par sécurité :
unset($_SESSION);
require "../ressources/template/_footer.php";
?>