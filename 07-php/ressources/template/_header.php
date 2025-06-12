<?php $test = "Coucou"; 
if(session_status() !== PHP_SESSION_ACTIVE)
{
    session_start();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cours PHP - <?php echo $title??""; ?></title>
    <!-- Le lien doit se faire par rapport à où est ce que le fichier
    sera inclu et non par rapport à là où se trouve le fichier. -->
    <!-- <link rel="stylesheet" href="../style/style.css"> -->
    <!-- <link rel="stylesheet" href="./ressources/style/style.css"> -->
	<!--Le problème avec un lien relatif c'est qu'il ne fonctionnera plus si on l'inclu dans un fichier se trouvant ailleurs.
		On préfèrera alors utiliser un chemin absolu depuis la racine de notre serveur.-->
	<link rel="stylesheet" href="/ressources/style/style.css">
    <script src="/ressources/script/script.js" defer></script>
</head>
<body>
    <header>
        <h1><?php echo $title??"Cours PHP" ?></h1>
        <?php 
            // affiche le nom de l'utilisateur si il est connecté
            if(isset($_SESSION["logged"]) || isset($_SESSION["logged_in"]))
            {
                echo "<h2>{$_SESSION['username']}</h2>";
            }
        ?>
        <?php // include __DIR__ . "/_test.php"; ?>
    </header>
    <!-- On ouvre le body ici mais on ne le ferme pas, il sera fermé
    dans le footer. -->
    <main class="<?php echo $mainClass??"" ?>">
        <!-- gestion des messages flash : -->
        <?php 
            if(isset($_SESSION["flash"]))
            {
                echo "<div class='flash-message'>{$_SESSION['flash']}</div>";
                unset($_SESSION["flash"]);
            }
        ?>