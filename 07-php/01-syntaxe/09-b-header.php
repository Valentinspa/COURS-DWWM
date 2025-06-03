<?php
/* 
    refresh permet d'actualiser la page après un nombre de seconde donné
*/
// header("refresh:5;");
/* 
    On peut le faire suivre de "url=" afin de changer l'actualisation en une redirection après un certain temps.
*/
header("refresh:5; url=09-a-header.php");


$title = "Les headers page 2";
require "../ressources/template/_header.php";

echo "<h2>Vous êtes bien en page 2</h2>";

require "../ressources/template/_footer.php";
?>