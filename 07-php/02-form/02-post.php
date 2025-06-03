<?php
// Je déclare plusieurs variables en tant que string vide.
$username = $food = $drink = "";
// Je déclare une variable qui me servira à stocker mes erreurs :
$error = [];
// Liste des choix proposées dans le formulaire :
// $foodList = ["welsh", "cannelloni", "oyakodon"];
$foodList = [
    "welsh"=>"Welsh (car vive le fromage)", 
    "cannelloni"=>"Cannelloni (car les raviolis c'est surfait)", 
    "oyakodon"=>"Oyakodon (car j'aime l'humour noir)",
    "pizza"=>"Pizza (à l'ananas de préférence)"
];
$drinkList = [
    "jus de tomate"=>"Jus de Tomate (Je suis un vampire)", 
    "milkshake"=>"Milkshake (aux fruits de préférence)", 
    "limonade"=>"Limonade (J'ai besoin de sucre)"
];
// Je vais vérifier que l'on utilise la méthode attendu par le formulaire et qu'au moins un des éléments du formulaire soit fourni :
if($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["meal"]))
{
    // echo "Formulaire envoyé !";
    // le nom dans la super global $_POST correspond à l'attribut "name" des champs du formulaire.
    if(empty($_POST["username"]))
    {
        // empty retourne true si le paramètre est vide.
        $error["username"] = "Veuillez entrer un nom d'utilisateur";
    }
    else
    {
        // retire les espaces au début et à la fin du string
        $username = trim($_POST["username"]);
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
    if(empty($_POST["food"]))
    {
        $error["food"] = "Veuillez selectionner un repas";
    }
    else
    {
        $food = $_POST["food"];
        if(!array_key_exists($food, $foodList))
        {
            $error["food"] = "Ce repas n'existe pas";
        }
    }//fin vérification food
    if(empty($_POST["drink"]))
    {
        $error["drink"] = "Veuillez selectionner une boisson";
    }
    else
    {
        $drink = $_POST["drink"];
        if(!array_key_exists($drink, $drinkList))
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

$title = " POST ";
require("../ressources/template/_header.php");
?>

<form action="02-post.php" method="POST">
    <input 
        type="text" 
        placeholder="Entrez un nom" 
        name="username" 
        value="<?= $username ?>" 
        class="<?= empty($error["username"])?"":"formError" ?>"
        >
    <!-- les span.error serviront à afficher les messages d'erreur. -->
    <span class="error"><?= $error["username"]??"" ?></span>
    <!-- <span class="error"><?php echo $error["username"]??"" ?></span> -->
    <br>
    <fieldset>
        <legend>Nourriture favorite</legend>
        <!-- Je boucle sur chaque élément du tableau foodList -->
        <?php foreach($foodList as $key => $value): ?>
            <!-- Je place en id et en value la clef du tableau -->
            <input 
                type="radio" 
                name="food" 
                id="<?= $key ?>" 
                value="<?= $key ?>"
                <?= $food === $key?"checked":"" ?>
                > 
                <!-- Si la variable $food correspond à l'un de mes inputs, alors on lui ajoute l'attribut "checked" -->
                <!-- Je place en for la clef du tableau et en texte la value du tableau -->
            <label for="<?= $key ?>"><?= $value ?></label>
            <br>
        <?php endforeach; ?>
        <span class="error"><?= $error["food"]??"" ?></span>
    </fieldset>
    <label for="boisson">Boisson favorite</label>
    <br>
    <select name="drink" id="boisson">
        <?php foreach($drinkList as $key => $value){ ?>
            <!-- Si la variable $drink correspond à l'une des options, alors on lui ajoute l'attribut "selected" -->
            <option value="<?= $key ?>" <?= $drink === $key?"selected":"" ?>>
                <?= $value ?>
            </option>
        <?php } ?>
    </select>
    <span class="error"><?= $error["drink"]??"" ?></span>
    <br>

    <input type="submit" value="Envoyer" name="meal">
</form>

<?php 
require("../ressources/template/_footer.php");
?>