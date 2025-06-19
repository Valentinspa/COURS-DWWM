<?php 
header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');

$title = "404";
require(__DIR__."/../../ressources/template/_header.php");
?>
<a href="/04-router/">Liste utilisateur</a>
<br>
<a href="/04-router/connexion">Connexion</a>
<p>Ceci est ma page 404!</p>
<?php 
require(__DIR__."/../../ressources/template/_footer.php");
?>