<?php 
if(session_status() !== PHP_SESSION_ACTIVE)
{
    session_start();
}

// Si l'utilisateur n'est pas connecté.
if(!isset($_SESSION["logged"]) || $_SESSION["logged"] !== true)
{
    // Alors je le redirige ailleurs :
    header("Location: ./04-connexion.php");
    exit;
}

/* 
    Pour déconnecter l'utilisateur.
    Il me suffit de détruire les informations concernant la connexion dans la session.
        unset($_SESSION["logged"]);
        unset($_SESSION["username"]);
        unset($_SESSION["expire"]);
    Ou alors si je n'ai rien d'autre de sauvegardé en session, détruire la session en entier.
*/
unset($_SESSION);
session_destroy();
setcookie("PHPSESSID", "", time()-3600);
// Puis une fois déconnecté, on redirige l'utilisateur ailleurs :
header("Location: ./04-connexion.php");
exit;
?>