<?php
require "../../ressources/service/_pdo.php";
if(session_status() !== PHP_SESSION_ACTIVE)
{
    session_start();
}
if(!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true)
{
    header("Location: ./exercice-connexion.php");
    exit;
}
?>
<form action="./message.php" method="post">
    <fieldset>
        <label for="message">Nouveau Message :</label><br>
        <textarea name="message" id="message" disabled></textarea>
        <br>
        <input type="submit" name="envoiMessage" value="Envoyer" required>
    </fieldset> 
</form>
