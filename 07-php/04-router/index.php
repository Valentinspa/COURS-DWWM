<?php 
/*
    Actuellement peu importe l'url écrit, on est redirigé vers ce fichier.
    On va donc lui demander de traiter l'url est de charger le fichier correspondant.

    Je require mes routes :
*/
require "./routes.php";

// Permet de récupérer l'url qui a été demandé par l'utilisateur :
$url = $_SERVER["REQUEST_URI"];

// Nettoie l'URL pour supprimer les caractères indésirable
$url = filter_var($url, FILTER_SANITIZE_URL);
/* 
    explode découpe un string en tableau, en utilisant le premier paramètre comme séparateur.
    Ici on lui indique de découper le string à chaque "?" et de récupérer uniquement le premier élément "[0]"
    Cela afin de se débarasser de possible paramètre en get
*/
$url = explode("?", $url)[0];

// Avec un second paramètre, trim permet de retirer au debut et à la fin, des caractères différent.
$url = trim($url, "/");

// var_dump($url);

// Est ce que notre url existe dans nos routes?
if(array_key_exists($url, ROUTES))
{
    $page = ROUTES[$url];
    $path = "pages/$page";
    // var_dump($page, $path);

    // Vérifie si le fichier dont on indique le chemin, existe.
    if(is_file($path))
    {
        require $path;
    }
    else
    {
        // Si le fichier n'existe pas, alors on require notre page 404:
        require "pages/404.php";
    }
}
else
{
    // Si l'url n'existe pas, alors on require notre page 404:
    require "pages/404.php";
}

/* 
    ! ATTENTION aux requires/include

    Avec le routeur, tous les fichiers sont require dans l'index.
    Donc les chemins des requires des autres fichiers sont fait par rapport à l'index et non plus par rapport à leurs positions à eux.

    Deux solutions :
        - Soit faire tout les require par rapport à l'index.
        - Soit ajouter devant chaque require "__DIR__" afin d'ajouter le chemin vers le dossier du fichier correspondant.

    Un router plus complet :
        https://phprouter.com/
*/