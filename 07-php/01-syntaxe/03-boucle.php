<h1>La boucle While</h1>
<hr>
<?php 
$x = 0;

// tant que la condition est vrai, alors répète l'action
while($x < 5)
{
    $x++;
    echo "while : $x <br>";
}
// syntaxe pour une seule instruction :
while($x < 10)
    echo "while 1 instruction :". ++$x ."<br>";
// syntaxe avec ":" et "endwhile":
while($x < 15):
    $x++;
    echo "while avec endwhile : $x <br>";
endwhile;
while($x < 20):
    $x++;
?>
<u>while avec html et php mélangé : <?= $x ?></u> <br>
<!-- <?= "valeur" ?>  est un équivalent à <?php echo "valeur" ?> -->
<?php 
endwhile;
//  --------------------------------------------
echo "<h2>Do While</h2> <hr>";

do{
    $x++;
    echo "Do while : $x <br>";
}while($x < 5);
// do while peut s'écrire sur une seule ligne
do
    echo "Do while 1 instruction: ". ++$x . "<br>";
while($x < 25);

//  --------------------------------------------
echo "<h2>for</h2> <hr>";
/* 
    for(expr1, expr2, expr3){instructions à répéter}
*/
for ($i=0; $i < 5; $i++) 
{ 
    echo "for : $i <br>";
}
// Une seule instruction
for ($i=0; $i < 5; $i++) 
    echo "for 1 instruction : $i <br>";
// ":" et "endfor" 
for ($i=0; $i < 5; $i++):
    echo "for avec endfor : $i <br>";
endfor;
//  --------------------------------------------
echo "<h2>foreach</h2> <hr>";
$a = ["spaghetti", "thon", "mayonnaise", "oignon"];
/* 
    foreach(tableau as nouvelleVariable){instructions à répéter}
*/
foreach($a as $food)
{
    echo "foreach 1 : $food <br>";
}
// Permet de récupérer les clefs(index) du tableau :
foreach($a as $key => $food)
{
    echo "foreach 2 : $key -> $food <br>";
}
foreach($a as $food)
    echo "foreach 1 instruction : $food <br>";
foreach($a as $food):
    echo "foreach endforeach : $food <br>";
endforeach;
//  --------------------------------------------
echo "<h2>continue et break</h2> <hr>";
// ces mots clef fonctionnent sur n'importe quel type de boucle.

foreach($a as $food)
{
    // Met fin à cette itération et passe à la suivante
    if($food === "spaghetti")continue;
    // Met fin à la boucle
    if($food === "mayonnaise")break;
    echo "foreach avec continue et break : $food <br>";
}
?>