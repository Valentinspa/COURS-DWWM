<?php
// Si il n'y a aucun HTML à suivre, on peut ne pas ferme la balise php
# Un nombre aléatoire entre 0 et 100 :
$r = rand(0,100);

echo $r, "<br>";

echo "<h1>Les conditions</h1><hr>";

if($r < 50)
{
    echo "r est plus petit que 50. <br>";
}
elseif($r > 50)
{
    echo "r est plus grand que 50. <br>";
}
else
{
    echo "r vaut 50. <br>";
}
echo "<h2>Autre syntaxes :</h2><hr>";
// Si la condition ne contient qu'une seule instruction, les accolades sont optionnelles.
if($r < 50)
    echo "r est plus petit que 50. <br>";
elseif($r > 50)
    echo "r est plus grand que 50. <br>";
else
    echo "r vaut 50. <br>";
// On peut aussi remplacer les accollades par ":" et terminé la condition par un "endif";
if($r < 50):
    echo "r est plus petit que 50. <br>";
elseif($r > 50):
    echo "r est plus grand que 50. <br>";
else:
    echo "r vaut 50. <br>";
endif;
?>
<h3>Exemple de HTML mélangé au PHP</h3><hr>
<?php  if($r < 50): //{ ?>
    <strong>r est plus petit que 50</strong> <br>
<?php /* } */ elseif($r > 50): // { ?>
    <strong>r est plus grand que 50</strong> <br>
<?php /* } */ else: //{?>
    <strong>r vaut 50</strong> <br>
<?php //}
endif;

// On retrouvera les ternaires :
echo "r est plus ".($r<=50 ? "petit ou égale à": "grand que") . " 50. <br>";
# condition ? valeur si vrai : valeur si faux ;

// Opérateur de Coalescence :
$message1 = "Bonjour le monde. <br>";
// Si la variable existe, je l'utilise, sinon j'utilise ce qui suis :
echo $message1 ?? "Rien à dire. <br>";
echo $message2 ?? "Rien à dire. <br>";

// --------------------------------------
echo "<h2>Le Switch</h2><hr>";
$pays = ["France", "Angleterre", "Suisse", "Japon", "france"];
// équivalent à rand(0, count($pays)-1);
$r2 = array_rand($pays); 
echo "$r2 -> $pays[$r2] <br>";

switch($pays[$r2])
{
    case "Suisse":
        echo "Trop de langues pour un seul pays. <br>";
        break;
    case "france":
    case "France":
        echo "Pays où la cuisine est réputé. <br>";
        break;
    case "Japon":
        echo "Autre pays où la cuisine est réputé. <br>";
        break;
    default:
        echo "Je ne vais pas détailler tout les pays. <br>";
}
?>
