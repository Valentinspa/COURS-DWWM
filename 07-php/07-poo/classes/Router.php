<?php
/**
 * Récupère la route et lance à la classe et méthode correspondante
 */ 
class Router
{
    public static function routing()
    {
        $url = filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_URL);
        $url = explode("?", $url)[0];
        $url = trim($url, "/");

        if(array_key_exists($url, ROUTES))
        {
            $route = ROUTES[$url];
            // J'instancie la classe associé:
            $controller = new ($route["controller"])();
            // J'appelle la méthode correspondante :
            $controller->{$route["fonction"]}();
        }
        else
        {
            require "view/404.php";
        }
    }
}