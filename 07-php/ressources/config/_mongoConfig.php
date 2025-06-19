<?php 
return 
[
    // l'host est l'hebergeur de ma BDD (ici localhost)
    "host"=>$_ENV["DB_MONGO_HOST"]??"bddnosql",
    // Le port utilisé pour se connecter (souvent 27017)
    "port"=>$_ENV["DB_MONGO_PORT"]??"27017",
    // le nom d'utilisateur qui doit s'y connecter
    "user"=> $_ENV["DB_MONGO_USER"]??"root",
    // le mot de passe de cet utilisateur.
    "password"=> $_ENV["DB_MONGO_PASSWORD"]??"root",
]
?>