<?php 
namespace Controller;

use Classes\Abstract\AbstractController;
use Classes\Interface\CrudInterface;
use Entity\UserEntity;
use Model\UserModel;

class UserController extends AbstractController implements CrudInterface
{
    private UserModel $db;
    public function __construct()
    {
        $this->db = new UserModel();
    }
    /**
     * Gère la page d'inscription
     *
     * @return void
     */
    public function create()
    {
        // Si on est connecté, on est redirigé ailleurs
        $this->shouldBeLogged(false, "/07-poo");

        $errors = [];
        $user = new UserEntity();

        if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['userForm']))
        {
            // Je rempli mon entité :
            $user->setUsername($_POST["username"]??"");
            $user->setEmail($_POST["email"]??"");
            $user->setPassword($_POST["password"]??"");
            $user->setPasswordConfirm($_POST["passwordConfirm"]??"");

            // Je vérifie si il y a des erreurs :
            $errors = $user->validate();

            $resultat = $this->db->getOneUserByEmail($user->getEmail());
            if($resultat)
            {
                $errors["email"] = "Cet Email est déjà enregistré";
            }

            if(empty($errors))
            {
                $this->db->addUser($user);
                $this->setFlash("Inscription prise en compte.");

                header("Location: /07-poo");
                exit;
            }
        }
        // J'appelle ma vue :
        $this->render("user/inscription.php", [
            "error"=>$errors,
            "user"=>$user,
            "title"=>"POO - Inscription",
            "required"=>"required"
        ]);
    }
    use \Classes\Trait\Debug;  
    /**
     * Gère la page "liste des utilisateurs"
     *
     * @return void
     */
    public function read()
    {
        $users = $this->db->getAllUsers();
        // $this->dieAndDump($users);
        // $this->dump($users);
        $this->render("user/list.php", [
            "users"=>$users,
            "title"=>"POO - Liste Utilisateur"
        ]);
    }
    /**
     * Gère la page de mise à jour du profil
     *
     * @return void
     */
    public function update()
    {
        // On doit être connecté pour mettre à jour son profil.
        $this->shouldBeLogged(true, "/07-poo");

        // On récupère les informations de l'utilisateur :
        $user = $this->db->getOneUserById((int)$_SESSION["idUser"]);

        $errors = [];

        // Si le formulaire est envoyé :
        if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['userForm']))
        {
            // Je récupère l'email de l'utilisateur
            $oldEmail = $user->getEmail();

            // Je rempli mon objet user :
            $user->setUsername($_POST["username"]??"");
            $user->setEmail($_POST["email"]??"");
            $user->setPassword($_POST["password"]??"");
            $user->setPasswordConfirm($_POST["passwordConfirm"]??"");

            // On récupère nos erreurs :
            $errors = $user->validate();

            // On vérifie si on nous a fourni un nouvel email :
            if(!empty($_POST["email"]) && trim($_POST["email"]) !== $oldEmail)
            {
                // On vérifie si un utilisateur utilise déjà cet email
                $exist = $this->db->getOneUserByEmail($user->getEmail());
                if($exist)
                {
                    $errors["email"] = "Cet email est déjà utilisé";
                }
            } // fin verification email

            // Si on n'a pas d'erreur, on envoi en bdd
            if(empty($errors))
            {
                $this->db->updateUserById($user);

                // On prépare un petit message de confirmation :
                $this->setFlash("Votre profil a bien été mise à jour");

                // On redirige l'utilisateur :
                header("Location: /07-poo");
                exit;
            }
        }// Fin vérification formulaire

        // On inclu la vue:
        $this->render("user/update.php", [
            "error"=>$errors,
            "user"=>$user,
            "title"=>"POO - Mise à jour du profil"
        ]);
    }
    /**
     * Gère la page de suppression de compte
     *
     * @return void
     */
    public function delete()
    {
        // Si on n'est pas connecté, on est redirigé ailleurs.
        $this->shouldBeLogged(true, "/07-poo");

        // On supprime le compte de l'utilisateur connecté.
        $this->db->deleteUserById((int)$_SESSION["idUser"]);

        // On déconnecte notre utilisateur
        session_destroy();
        unset($_SESSION);
        setCookie("PHPSESSID", "", time()-3600);

        // On demande une redirection après quelques secondes
        header("refresh: 5;url=/07-poo");

        // On affiche un message de confirmation :
        $this->render("user/delete.php", ["title"=>"POO - suppresion de compte"]);
    }
}