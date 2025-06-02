<h1>Les fonctions en PHP</h1><hr>
<?php 
/* 
    déclarer une fonction se fait avec :
        function nomDeLaFonction(){}
    La fonction n'aura aucun effet tant qu'elle ne sera pas appelé.
    Pour l'appeler on fera :
        nomDeLaFonction()

    Une fonction peut être appelé avant ou après sa déclaration.
*/
salut();
function salut()
{
    echo "Salut tout le monde !<br>";
}
salut();

if(true)
{
    // Le fait de pouvoir appelé une fonction avant sa déclaration, n'est vrai que si elle est déclaré à la base du code. 
    // * Si elle se trouve dans un block quelconque, elle ne pourra être appelé qu'après.
    // salut2();
    function salut2()
    {
        echo "Salut à moi même !<br>";
    }
    salut2();
}
// Attention que la fonction a bien été déclaré,
// ici on aura une erreur si la condition est "false"
// salut2();

/* 
    Une fonction peut se contenter de réaliser des actions
    ou alors, elle peut retourner une valeur.
    Pour cela on utilisera le mot clef "return".

    Ce mot clef met fin à la fonction et retourne ce qui se trouve après, si il y a quelque chose.

    Ici ma fonction, ne retourne rien si le nombre aléatoire est plus grand que 50
    Et retourne le nombre, si il est plus petit.
*/
function alea()
{
    $r = rand(0,100);
    if($r>50)return;
    return $r;
}
// Pour récupérer la valeur de retour, je peux soit la ranger dans une variable, soit l'utiliser directement dans une fonction :
echo alea(), "<br>";
$nombre = alea();
echo $nombre, "<br>";

// -------------------------------
echo "<h2>Les arguments</h2> <hr>";
/* 
    Entre les parenthèses de la fonction, nous pourrons avoir autant d'arguments que voulu.

    Ce sont des paramètres que l'on voudra voir changer lorsque l'on appelle notre fonction.

    La première valeur donnée lors de l'appel, va dans le premier argument.
    La seconde, dans le second et ainsi de suite.
*/
function bonjour($nom)
{
    echo "Bonjour $nom ! <br>";
}
bonjour("Maurice");
bonjour("Paul");

function bonjour2($n1, $n2)
{
    echo "Bonjour $n1 et $n2 <br>";
}
// Si on n'indique pas le bon nombre d'argument, cela provoque une erreur :
// bonjour2("Maurice");
bonjour2("Maurice", "Pierre");

// ... est le "rest operator", il va produire un tableau contenant tout les arguments supplémentaires.
function bonjour3(...$noms)
{
    foreach($noms as $n)
    {
        echo "Salut $n <br>";
    }
}
bonjour3("Maurice", "Pierre", "Paul");

// Si des valeurs par défaut sont données, les paramètres deviennent optionnels.
function bonjour4($n1, $n2 = "personne d'autre")
{
    echo "Bonjour $n1 et $n2 ! <br>";
}
bonjour4("Maurice");
bonjour4("Maurice", "Pierre");
/* 
    Par défaut, si l'on passe une variable en paramètre d'une fonction.
    Seule la valeur de la variable est envoyée.
    ? Toute modification ne s'appliquera pas à la variable d'origine.
*/
// function titre($nom)
/* 
    Mais si l'on ajoute un "&" devant l'argument.
    Cela devient un "passage d'argument par référence"
    Ce n'est donc plus seulement la valeur mais toute la variable qui est envoyé.

    ? Les modifications s'appliqueront donc à la variable d'origine.
*/
function titre(&$nom)
{
    $nom .= " le grand !";
}
$prenom = "Maurice";
titre($prenom);
echo "Mon prénom est $prenom ! <br>";

//-----------------------------------
echo "<h2>La récurcivité</h2> <hr>";

/* 
    Une fonction récurcive est une fonction, qui s'appelle, elle même.
    Attention aux boucles infinies, il faut toujours prévoir une sortie.
*/
function décompte($n)
{
    // action à réaliser
    echo $n, "<br>";
    // condition de sortie 
    if($n <= 0)return;
    // récurcivité
    décompte(--$n);
}
décompte(5);
// ---------------------------------------
echo "<h2>Typage et Description</h2><hr>";
/* 
    Sur les dernières versions de PHP, il est possible, conseillé, bien que non obligatoire, 
    de typer ses arguments et valeur de retour ainsi que de décrire ses fonctions.

    Cela ne changera rien au fonctionnement du code, mais pourra aider à s'y retrouver.
*/
/**
 * Retourne la présentation d'un personnage
 *
 * @param string $nom nom du personnage
 * @param integer $age age du personnage
 * @param boolean $travail a-t-il un travail
 * @return string présentation
 */
function presentation(string $nom, int $age, bool $travail): string
{
    return "Je m'appelle $nom et j'ai $age ans. Je ".($travail?"travaille.":"ne travaille pas.");
}
echo presentation("Maurice", 54, false), "<br>";

// --------------------------------------
echo "<h2>Portée des variables et static</h2><hr>";
// Une variable déclaré hors d'une fonction, n'est pas utilisable dans une fonction.
$z = 5;
function showZ()
{
    // echo $z;
    # Mais il est possible de faire appel aux variables déclarés hors de toute fonction via le mot clef "global";
    global $z;
    echo $z, "<br>";
}
showZ();
/* 
    Par défaut, une variable déclaré dans une fonction est détruite à la fin de la fonction.
    Le mot clef static permet de la garder en mémoire jusqu'à la fin du script.

    Ici grâce au mot clef "static", "$b" sera initialisé à 0 au premier appel, puis il gardera sa valeur à chaque nouvel appel sans se réinitialiser.
*/
function compte()
{
    $a = 0;
    static $b = 0;
    echo "a: $a <br> b: $b <br>";
    $a++;
    $b++;
}
compte();
compte();
compte();
compte();

// ------------------------------------------
echo "<h2>Fonctions anonyme, fléché et callback</h2><hr>";

$tab = ["Sandwich", "Ramen", "Pizza"];
/* 
    Une fonction callback est une fonction qui est donnée en argument d'une autre fonction (ici le type callbable)
    Afin que ce soit cette autre fonction, qui s'occupe de l'appeler
*/
function dump(array $arr, callable $func):void
{
    foreach($arr as $a)
    {
        $func($a);
        echo "<br>";
    }
}
/* 
    Pour fournir ma fonction callback à ma fonction dump,
    J'ai plusieurs solutions, comme :
    Déclarer une fonction anonyme 
*/
dump($tab, function($v){echo "fonction anonyme : $v";});
// Une fonction fléchée :
dump($tab, fn($v)=>var_dump("fonction fléchée : $v"));
// Ou ranger une fonction anonyme dans une variable :
$maFonction = function($v){echo "fonction anonyme dans variable : $v";};
dump($tab, $maFonction);
?>