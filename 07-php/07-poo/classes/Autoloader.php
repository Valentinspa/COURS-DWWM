<?php
/* 
    Le role de cette classe va être de faire les require des autres classes automatiquement.
*/
class Autoloader
{
    public static function register()
    {
        /* 
            spl_autoload_register va permettre d'appeler la fonction en callback à chaque fois qu'une nouvelle classe est appelé.
        */
        spl_autoload_register(function(string $class)
        {
            /* 
                Le string fourni contiendra le namespace.
                On va se servir de ce namespace comme si c'était des noms de dossier:
            */
            $file = str_replace("\\",DIRECTORY_SEPARATOR,$class) .".php";
            if(file_exists($file))
            {
                require $file;
                return true;
            }
            return false;
        });
    }
}