<?php 
$title = "Go To";
require "../ressources/template/_header.php";
?>
<h2>GO TO ?</h2>

<?php 
/* 
    Go to permet de sauter d'une partie du code à une autre.
    On peut s'en servir dans des conditins afin d'éviter certaines actions.
    ! Attention, On ne peut pas rentrer dans un block comme une condition, une fonction, une boucle...
    ! Il est peu apprécié car fait perdre en lisibilité.

    Il fonctionne en deux partie, un mot qui servira de balise où se déplacer "monMot:"
    Et le mot clef "goto" suivi du mot où l'on souhaite se déplacer.
*/
for($i = 0; $i < 100; $i++)
{
    echo "ceci est le message $i! <br>";
    if($i===5)
    {
        goto laFin;
    }
}
echo "la boucle est fini !<br>";
laFin:
echo "Le script est fini ! <br>";

require "../ressources/template/_footer.php";
?>