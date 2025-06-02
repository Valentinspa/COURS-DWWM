<?php 
/* 
    La session permet de stocker toute sortes d'informations (string, object, array...) d'une page à l'autre.
    Elle est stocké côté serveur, mais place un cookie contenant son identifiant afin de reconnaître quelle session appartient à quel utilisateur.

    Elle ne peut être utilisé qu'après un "session_start()"
        Celui ci doit être appelé avant tout HTML.
    
    session_status() permet de récupérer l'état actuel de la session.
    PHP_SESSION_NONE est le code indiquant que la session n'est pas démarré
*/
if(session_status() === PHP_SESSION_NONE)
{
    session_start();
}

$title = "Session page 1";
require "../ressources/template/_header.php";
?>
<h2>Ceci est la session page 1</h2>
<a href="./07-b-session.php">direction page 2</a>
<hr>
<?php 
// Si on souhaite récupérer l'id de la session :
var_dump($_COOKIE, session_id());
// Le nom par défaut du cookie est "PHPSESSID" mais il peut être modifié avec "session_name('nouveauNom')" avant le session_start()

/* 
    Pour sauvegarder ou récupérer des données.
    On utilisera la super global "$_SESSION" qui est un tableau associatif de base.
*/
$_SESSION["food"] = "pizza";
$_SESSION["age"] = 54;
$_SESSION["logged"] = true;
$_SESSION["username"] = "Maurice";
// Allons ensuite en page 2

require "../ressources/template/_footer.php";
?>