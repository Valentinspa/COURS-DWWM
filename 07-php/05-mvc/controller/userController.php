<?php 
require __DIR__."/../../ressources/service/_shouldBeLogged.php";
require __DIR__."/../../ressources/service/_csrf.php";
require(__DIR__."/../model/userModel.php");
// require(__DIR__."/../model/userMongoModel.php");
/**
 * Gère la page d'inscription.
 *
 * @return void
 */
function createUser():void
{
    shouldBeLogged(false, "/05-mvc");

    $username = $email = $password = "";
    $error = [];
    $regexPass = 
    "/^(?=.*[!?@#$%^&*+-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/";
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["inscription"]))
    {
        // traitement username
        if(empty($_POST["username"])){
            $error["username"] = "Veuillez saisir un nom d'utilisateur";
        }else{
            $username = cleanData($_POST["username"]);
            if(!preg_match("/^[a-zA-Z' -]{2,25}$/", $username)){
                $error["username"] = "Veuillez saisir un nom d'utilisateur Valide";
            }
        }
        // Traitement email
        if(empty($_POST["email"])){
            $error["email"] = "Veuillez saisir un email";
        }else{
            $email = cleanData($_POST["email"]);
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $error["email"] = "Veuillez saisir un email valide";
            }
            // Je vérifie si l'utilisateur existe en BDD
            $resultat = getOneUserByEmail($email);
            if($resultat){
                $error["email"] = "Cet email est déjà enregistré.";
            }
        }
        // Traitement password
        if(empty($_POST["password"])){
            $error["password"] = "Veuillez saisir un mot de passe";
        }else{
            $password = trim($_POST["password"]);
            // on utilise la regex défini plus haut.
            if(!preg_match($regexPass, $password)){
                $error["password"] = "Veuillez saisir un mot de passe valide";
            }else{
                $password = password_hash($password, PASSWORD_DEFAULT);
            }
        }
        // vérification du mot de passe.
        if(empty($_POST["passwordBis"])){
            $error["passwordBis"] = "Veuillez saisir à nouveau votre mot de passe";
        }elseif($_POST["password"] != $_POST["passwordBis"]){
            $error["passwordBis"] = "Veuillez saisir le même mot de passe";
        }
        // envoi des données.
        if(empty($error)){
			// J'ajoute mon utilisateur en BDD.
            addUser($username, $email, $password);
            header("Location: /05-mvc");
            exit;
        }
    }
	// j'inclu la vue qui correspond.
    require __DIR__."/../view/user/inscription.php";
}
/**
 * Gère la liste des utilisateurs
 *
 * @return void
 */
function readUsers():void
{
    // Je récupère tous mes utilisateurs.
    $users = getAllUsers();
    if(isset($_SESSION["flash"])){
        $flash = $_SESSION["flash"];
        unset($_SESSION["flash"]);
    }
    // J'inclu ma vue.
    require __DIR__."/../view/user/list.php";
}
/**
 * Gère la page de mise à jour de l'utilisateur.
 *
 * @return void
 */
function updateUser():void
{
    shouldBeLogged(true, "/05-mvc");

    if(empty($_GET["id"]) || $_SESSION["idUser"] != $_GET["id"]){
        header("Location: /05-mvc");
        exit;
    }
    // Je récupère les informations de mon utilisateur.
    $user = getOneUserById($_GET["id"]);

    $username = $password = $email = "";
    $error = [];
    $regexPass = 
    "/^(?=.*[!?@#$%^&*+-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/";

    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["update"]))
    {
        if(!empty($_POST["username"])){
            $username= cleanData($_POST["username"]);
            if(!preg_match("/^[a-zA-Z' -]{2,25}$/", $username)){
                $error["username"] = "Votre nom d'utilisateur ne peut contenir que des lettres.";
            }
        }else{
            $username = $user["username"];
        }
        if(!empty($_POST["email"]) && $_POST["email"] != $user["email"]){
            $email= cleanData($_POST["email"]);
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $error["email"] = "Veuillez entrer un email valide";
            }
            $exist = getOneUserByEmail($email);
            if($exist)
            {
                $error["email"] = "Cet email existe déjà";
            }
        }else{
            $email = $user["email"];
        }
        if(!empty($_POST["password"])){
            if(empty($_POST["passwordBis"])){
                $error["passwordBis"] = "Veuillez saisir à nouveau votre mot de passe";
            }elseif($_POST["password"] != $_POST["passwordBis"]){
				$error["passwordBis"] = "Veuillez saisir le même mot de passe";
            }
            $password = cleanData($_POST["password"]);
            if(!preg_match($regexPass, $password)){
                $error["password"] = "Veuillez saisir un mot de passe valide";
            }else{
                $password = password_hash($password, PASSWORD_DEFAULT);
            }
        }else{
            $password = $user["password"];
        }
        if(empty($error)){
            // mis à jour de l'utilisateur.
            updateUserById($username, $email, $password, $user["idUser"]);
            // ajout d'un flash message.
            $_SESSION["flash"] = "Votre profil a bien été édité.";
            header("Location: /05-mvc");
            exit;
        }
    }
    // J'inclu ma vue.
    require __DIR__."/../view/user/update.php";
}
/**
 * Gère la page de suppression de l'utilisateur.
 *
 * @return void
 */
function deleteUser():void
{
    shouldBeLogged(true, "./exercice/connexion.php");

    if(empty($_GET["id"]) || $_SESSION["idUser"] != $_GET["id"]){
        header("Location: /05-mvc");
        exit;
    }
    // On supprime l'utilisateur
    deleteUserById($_GET["id"]);
    // Et on le déconnecte.
    unset($_SESSION);
    session_destroy();
    setcookie("PHPSESSID","", time()-3600);
    // avant de le rediriger.
    header("refresh: 5;url = /05-mvc");
	
    // J'inclu ma vue.
    require __DIR__."/../view/user/delete.php";
}

?>