<?php
require "../ressources/service/_shouldBeLogged.php";
shouldBeLogged(true, "/04-router/connexion");
/* 
    Si l'utilisateur n'est pas connecté, il est redirigé.
    Si l'utilisateur vient sur cette page sans indiquer d'id, il est redirigé. 
    Si l'utilisateur vient sur cette page sans que ce soit son id, il est redirigé. 
*/
isSelectedUser("/04-router/");
// Je récupère les informations de mon utilisateur.
require "../ressources/service/_csrf.php";
require("../ressources/service/_pdo.php");
$pdo = connexionPDO();
$sql = $pdo->prepare("SELECT * FROM users WHERE idUser=?");
$sql->execute([(int)$_SESSION["idUser"]]);
$user = $sql->fetch();

$username = $password = $email = "";
$error = [];
$regexPass = 
"/^(?=.*[!?@#$%^&*+-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/";

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["update"]))
{
    if(empty($_POST["username"]))
        $username = $user["username"];
    else
    {
        $username = cleanData($_POST["username"]);
        if(!preg_match("/^[a-zA-Z'\s-]{2,25}$/", $username))
            $error["username"]= "Votre nom d'utilisateur ne peut contenir que des lettres";
    }
    if(empty($_POST["email"]))
        $email = $user["email"];
    else
    {
        $email = cleanData($_POST["email"]);
        if(!filter_var($email, FILTER_VALIDATE_EMAIL))
            $error["email"]= "Votre entrer un email valide";
        // On vérifie si l'email existe déjà.
        if($email != $user["email"])
        {
            $sql = $pdo->prepare("SELECT * FROM users WHERE email = :email");
            $sql->execute([":email" => $email]);
            $exist = $sql->fetch();
            if($exist)
                $error["email"]= "Cet email existe déjà";
        }
        
    }

    if(empty($_POST["password"]))
        $password = $user["password"];
    else
    {
        $password = cleanData($_POST["password"]);
        if(empty($_POST["passwordBis"]))
            $error["passwordBis"] = "Veuillez confirmer votre mot de passe";

        else if($_POST["password"] != $_POST["passwordBis"])
            $error["passwordBis"] = "Veuillez saisir le même mot de passe";

        if(!preg_match($regex, $password))
            $error["password"] = "Veuillez saisir un mot de passe valide";
        else
            $password = password_hash($password, PASSWORD_DEFAULT);
    }
    if(empty($error))
    {
        $sql = $pdo->prepare("UPDATE users SET 
        username=:us, 
        email = :em,
        password = :mdp
        WHERE idUser = :id");
        $sql->execute([
            "id" => $user["idUser"],
            "em" => $email,
            "mdp" => $password,
            "us" => $username
        ]);
        // ajout d'un flash message.
        $_SESSION["flash"] = "Votre profil a bien été édité.";
        header("Location: /04-router/");
        exit;
        /*
            Il serait possible d'améliorer cette requête 
            en ne modifiant uniquement les champs qui changent au lieu de tous les modifier.
        */
    }
}
$title = " CRUD - Update ";
require("../ressources/template/_header.php");
if($user):
?>
<form action="/04-router/profil" method="post">
    <!-- username -->
    <label for="username">Nom d'Utilisateur :</label>
    <input type="text" name="username" id="username" value="<?php echo $user["username"] ?>">
    <span class="erreur"><?php echo $error["username"]??""; ?></span>
    <br>
    <!-- Email -->
    <label for="email">Adresse Email :</label>
    <input type="email" name="email" id="email" value="<?php echo $user["email"] ?>">
    <span class="erreur"><?php echo $error["email"]??""; ?></span> 
    <br>
    <!-- Password -->
    <label for="password">Mot de passe :</label>
    <input type="password" name="password" id="password">
    <span class="erreur"><?php echo $error["password"]??""; ?></span> 
    <br>
    <!-- password verify -->
    <label for="passwordBis">Confirmation du mot de passe :</label>
    <input type="password" name="passwordBis" id="passwordBis">
    <span class="erreur"><?php echo $error["passwordBis"]??""; ?></span> 
    <br>

    <input type="submit" value="Mettre à jour" name="update">
</form>
<?php else: ?>
    <p>Aucun Utilisateur trouvé</p>
<?php 
endif;
require("../ressources/template/_footer.php");
?>