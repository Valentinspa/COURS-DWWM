<?php
/* 
    Les controllers perdent le ".php" et gagnent une majuscule.
    les fonctions prennent des noms plus simple.
*/
const ROUTES = [
    "06-poo"=>[
        "controller"=>"UserController", 
        "fonction"=>"read"
    ],
    "06-poo/inscription"=>[
        "controller"=>"UserController", 
        "fonction"=>"create"
    ],
    "06-poo/user/update"=>[
        "controller"=>"UserController", 
        "fonction"=>"update"
    ],
    "06-poo/user/delete"=>[
        "controller"=>"UserController", 
        "fonction"=>"delete"
    ],
];
?>