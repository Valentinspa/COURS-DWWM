<?php
// Je déclare plusieurs variables en tant que string vide.
$username = $food = $drink = "";
// Je déclare une variable qui me servira à stocker mes erreurs :
$error = [];
// Liste des choix proposées dans le formulaire :
$foodList = ["welsh", "cannelloni", "oyakodon"];
$drinkList = ["jus de tomate", "milkshake", "limonade"];
// Je vais vérifier que l'on utilise la méthode attendu par le formulaire et qu'au moins un des éléments du formulaire soit fourni :
if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["meal"]))
{
    // echo "Formulaire envoyé !";
    // le nom dans la super global $_GET correspond à l'attribut "name" des champs du formulaire.
    if(empty($_GET["username"]))
    {
        // empty retourne true si le paramètre est vide.
        $error["username"] = "Veuillez entrer un nom d'utilisateur";
    }
    else
    {
        // retire les espaces au début et à la fin du string
        $username = trim($_GET["username"]);
        // retire les \ présent dans le string.
        $username = stripslashes($username);
        // ! Doit obligatoirement être fait sur toute donnée devant être affichée
        // Cela peut être fait, avant la mise en BDD ou juste au moment de l'affichage
        $username = htmlspecialchars($username);
        // Remplace tous les caractères speciaux de html (<,>...) par leurs code HTML (&gt;...) afin d'empêcher toute injection de code.
        if(strlen($username) < 3 || strlen($username)>25)
        {
            $error["username"] = "Votre nom d'utilisateur n'a pas une taille adaptée";
        }
    }// fin vérification username
    if(empty($_GET["food"]))
    {
        $error["food"] = "Veuillez selectionner un repas";
    }
    else
    {
        $food = $_GET["food"];
        if(!in_array($food, $foodList))
        {
            $error["food"] = "Ce repas n'existe pas";
        }
    }//fin vérification food
    if(empty($_GET["drink"]))
    {
        $error["drink"] = "Veuillez selectionner une boisson";
    }
    else
    {
        $drink = $_GET["drink"];
        if(!in_array($drink, $drinkList))
        {
            $error["drink"] = "Cette boisson n'existe pas";
        }
    }//fin vérification drink
    // Si je n'ai aucune erreur
    if(empty($error))
    {
        /* 
            C'est Ici que l'on pourrait envoyer nos données en BDD
        */
    }
}// fin vérification formulaire

$title = " GET ";
require("../ressources/template/_header.php");
?>

<form action="01-get.php" method="GET">
    <input type="text" placeholder="Entrez un nom" name="username">
    <!-- les span.error serviront à afficher les messages d'erreur. -->
    <span class="error"><?= $error["username"]??"" ?></span>
    <!-- <span class="error"><?php echo $error["username"]??"" ?></span> -->
    <br>
    <fieldset>
        <legend>Nourriture favorite</legend>
        <input type="radio" name="food" id="welsh" value="welsh"> 
        <label for="welsh">Welsh (car vive le fromage)</label>
        <br>
        <input type="radio" name="food" id="cannelloni" value="cannelloni"> 
        <label for="cannelloni">Cannelloni (car les ravioli c'est surfait)</label>
        <br>
        <input type="radio" name="food" id="oyakodon" value="oyakodon"> 
        <label for="oyakodon">Oyakodon (car j'aime l'humour noir)</label>
        <span class="error"><?= $error["food"]??"" ?></span>
    </fieldset>
    <label for="boisson">Boisson favorite</label>
    <br>
    <select name="drink" id="boisson">
        <option value="jus de tomate">jus de tomate (je suis un vampire)</option>
        <option value="milkshake">Milkshake (aux fruits de préférence)</option>
        <option value="limonade">Limonade (J'ai besoin de sucre)</option>
    </select>
    <span class="error"><?= $error["drink"]??"" ?></span>
    <br>

    <input type="submit" value="Envoyer" name="meal">
</form>

<?php 
require("../ressources/template/_footer.php");
?>