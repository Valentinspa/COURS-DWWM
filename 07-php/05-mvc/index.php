<?php 

require "./routes.php";

$url = $_SERVER["REQUEST_URI"];

$url = filter_var($url, FILTER_SANITIZE_URL);

$url = explode("?", $url)[0];

$url = trim($url, "/");

if(array_key_exists($url, ROUTES))
{
    // J'indique que le nom de mon fichier se trouve à la clef "controller"
    $page = ROUTES[$url]["controller"];
    // Que le chemin du fichier à charger est le dossier "controller"
    $path = "./controller/$page";
    // Que la fonction à lancer se trouve à la clef "fonction"
    $fonction = ROUTES[$url]["fonction"];

    if(is_file($path))
    {
        // Je require mon controller.
        require $path;
        // j'apelle la fonction correspondante :
        $fonction();
    }
    else
    {
        // Je change le chemin de ma page 404
        require "./view/404.php";
    }
}
else
{
    // Je change le chemin de ma page 404
    require "./view/404.php";
}
