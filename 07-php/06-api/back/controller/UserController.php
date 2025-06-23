<?php 
// Indique les méthodes acceptées par cette page :
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");

session_start();
require __DIR__."/../model/userModel.php";
require __DIR__."/../../../ressources/service/_csrf.php";

$regexPass = "/^(?=.*[!?@#$%^&*+-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/";

/* 
    Le principe d'une api REST (REpresentational State Transfer)
    est d'avoir pour une même adresse, (ici /06-api/back/user)
    Différentes actions réalisées selon la méthode utilisée :
*/
switch($_SERVER["REQUEST_METHOD"])
{
    case "POST": create(); break;
    case "GET": read(); break;
    case "PUT": update(); break;
    case "DELETE": delete(); break;
}

/**
 * Gère la page d'inscription.
 *
 * @return void
 */
function create():void
{
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $username = $email = $password = "";
    $error = setError();
    if($data && isset($data->userForm))
    {
        // traitement username
        if(empty($data->username)){
            setError("username", "Veuillez saisir un nom d'utilisateur");
        }else{
            $username = cleanData($data->username);
            if(!preg_match("/^[a-zA-Z' -]{2,25}$/", $username)){
                setError("username", "Veuillez saisir un nom d'utilisateur Valide");
            }
        }
        // Traitement email
        if(empty($data->email))
        {
            setError("email", "Veuillez saisir un email");
        }
        else
        {
            $email = cleanData($data->email);
            if(!filter_var($email, FILTER_VALIDATE_EMAIL))
            {
                setError("email", "Veuillez saisir un email valide");
            }
            // Je vérifie si l'utilisateur existe en BDD
            $resultat = getOneUserByEmail($email);
            if($resultat)
            {
                setError("email", "Cet email est déjà enregistré.");
            }
        }
        // Traitement password
        if(empty($data->password))
        {
            setError("password", "Veuillez saisir un mot de passe");
        }
        else
        {
            $password = cleanData($data->password);
            // on utilise la regex défini plus haut.
            global $regexPass;
            if(!preg_match($regexPass, $password))
            {
                setError("password", "Veuillez saisir un mot de passe valide");
            }
            else
            {
                $password = password_hash($password, PASSWORD_DEFAULT);
            }
        }
        // vérification du mot de passe.
        if(empty($data->passwordBis))
        {
            setError("passwordBis", "Veuillez saisir à nouveau votre mot de passe");
        }
        elseif($data->password != $data->passwordBis)
		{
			setError("passwordBis", "Veuillez saisir le même mot de passe");
		}
        $error = setError();
        // envoi des données.
        if(empty($error["violations"]))
        {
            // J'ajoute mon utilisateur en BDD.
            $user = addUser($username, $email, $password);
            sendResponse($user, 200, "Inscription validé");
        }
    }
    sendResponse($error, 400, "Formulaire incorrecte");
}
/**
 * Gère la liste des utilisateurs
 *
 * @return void
 */
function read():void
{
    // Je récupère tous mes utilisateurs.
    if(isset($_GET["id"]))
        $users = getOneUserById((int)$_GET["id"]);
    else
        $users = getAllUsers();
    sendResponse($users, 200, "utilisateur(s) récupéré.");
}
/**
 * Gère la page de mise à jour de l'utilisateur.
 *
 * @return void
 */
function update():void
{
    if(!isset($_GET["id"],$_SESSION["idUser"]) || $_SESSION["idUser"] != $_GET["id"])
    {
        sendResponse(setError(), 400, "Accès interdit!");
    }
    // Je récupère les informations de mon utilisateur.
    $user = getOneUserById((int)$_GET["id"]);

    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $username = $password = $email = "";
    $error = setError();

    if($data && isset($data->userForm))
    {
		// traitement username
        if(!empty($data->username))
        {
            $username= cleanData($data->username);
            if(!preg_match("/^[a-zA-Z' -]{2,25}$/", $username))
            {
                setError("username", "Votre nom d'utilisateur ne peut contenir que des lettres.");
            }
        }
        else
        {
            $username = $user["username"];
        }
		// traitement email
        if(!empty($data->email))
        {
            $email= cleanData($data->email);
            if(!filter_var($email, FILTER_VALIDATE_EMAIL))
            {
                setError("email","Veuillez entrer un email valide");
            }
            elseif($email != $user["email"])
            {
                $exist = getOneUserByEmail($email);
                if($exist)
                {
                    setError("email","Cet email existe déjà");
                }
            }
        }
        else
        {
            $email = $user["email"];
        }
		// traitement password
        if(!empty($data->password))
        {
            if(empty($data->passwordBis))
            {
                setError("passwordBis","Veuillez saisir à nouveau votre mot de passe");
            }
            elseif($data->password != $data->passwordBis)
            {
                setError("passwordBis","Veuillez saisir le même mot de passe");
            }
            $password = cleanData($data->password);
            global $regexPass;
            if(!preg_match($regexPass, $password))
            {
                setError("password","Veuillez saisir un mot de passe valide");
            }
            else
            {
                $password = password_hash($password, PASSWORD_DEFAULT);
            }
        }
        else
        {
            $password = $user["password"];
        }
        $error = setError();
        if(empty($error["violations"]))
        {
            // mis à jour de l'utilisateur.
            $user = updateUserById($username, $email, $password, $user["idUser"]);
            
            sendResponse($user, 200, "Utilisateur mis à jour");
        }
    }
    
    sendResponse($error, 400, "Formulaire incorrecte");

}
/**
 * Gère la page de suppression de l'utilisateur.
 *
 * @return void
 */
function delete():void
{
    if(!isset($_GET["id"], $_SESSION["idUser"]) || $_SESSION["idUser"] != $_GET["id"])
    {
        sendResponse($_SESSION, 400, "Accès interdit!");
    }
    // On supprime l'utilisateur
    deleteUserById((int)$_GET["id"]);
    // Et on le déconnecte.
    unset($_SESSION);
    session_destroy();
    setcookie("PHPSESSID","", time()-3600);
        
    sendResponse([], 200, "compte supprimé et déconnecté");
}
?>