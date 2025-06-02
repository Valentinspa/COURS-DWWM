<?php
$title = "Les dates :";
require "../ressources/template/_header.php";

// paramètre de la timezone par défaut :
date_default_timezone_set("Europe/Paris");

// Récupérer le timestamp actuel :
echo time(), "<br>";

/* 
    Pour récupérer une date plus lisible d'un timestamp, on utilisera "date()"
    Le premier paramètre est un string,
    le second (optionnel) est un timestamp.
    Par défaut, il utilisera le timestamp actuel.
*/
echo date(""), "<br>";
// Si on laisse le string vide, rien ne s'affiche, il faudra indiquer des lettres pour qu'il donne certaines informations : 
    // * Les autres caractères sont là pour faire jolie

/* 
    d = numéro du jour du mois avec le 0
    m = numéro du mois avec le 0
    Y = Année sur 4 chiffre
*/
echo date("d/m/Y"), "<br>";
/* 
    j = numéro du jour du mois sans le 0
    n = numéro du mois sans le 0
    y = Année sur 2 chiffre
*/
echo date("j/n/y"), "<br>";

/* 
    D = nom du jour sur 3 lettres
    l = nom du jour 
    M = nom du mois sur 3 lettres
    F = nom du mois
*/
echo date("D = l / M = F"), "<br>";
/* 
    N = numéro du jour dans la semaine avec dimanche = 7
    w = numéro du jour dans la semaine avec dimanche = 0
*/
echo date("D = N = w"), "<br>";
/* 
    z = Numéro du jour dans l'année (avec 1er janvier = 0) 
    W = Numéro de la semaine dans l'année
*/
echo date("z -> W"), "<br>";
/* 
    t = Nombre de jour dans le mois
    L = Boolean indiquant si l'année est bissextile
*/
echo date("F -> t / Y -> L"), "<br>";
/* 
    h = heure au format 12 avec 0
    i = minutes avec 0
    s = secondes avec 0
    a = "am" ou "pm"
*/
echo date("h:i:s a"), "<br>";
/* 
    g = heure au format 12 sans 0
    A = "AM" ou "PM"
    H = heure au format 24 avec 0
    G = heure au format 24 sans 0
    v = milliseconde (mais ne fonctionne pas en php)
*/
echo date("g:i:s A"), "<br>";
/* 
    O = Différence d'heure avec GMT sans ":"
    P = Différence d'heure avec GMT avec ":"
    Z = Différence d'heure avec GMT en seconde
    I = Boolean indiquant si c'est l'heure d'été
*/
echo date("O = P = Z / H -> I"), "<br>";
// Date complète au format ISO 8601
echo date("c"), "<br>";
// Date complète au format RFC 2822
echo date("r"), "<br>";




require "../ressources/template/_footer.php";
?>