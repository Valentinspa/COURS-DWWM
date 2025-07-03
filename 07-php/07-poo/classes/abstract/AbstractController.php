<?php
// Pour le fonctionnement de mon autoloader, je met un namespace correspondant à mes dossiers
namespace Classes\Abstract;

require __DIR__."/../../../ressources/service/_shouldBeLogged.php";
require __DIR__."/../../../ressources/service/_csrf.php";
/** 
 *    Une classe abstraite ne peut être instancié.
 *   le rôle de celle ci, sera d'être hérité à tous les controllers afin de leur apporter des fonctions en commun.
*/
abstract class AbstractController
{
    /**
     * Affiche les messages flash
     *
     * @return void
     */
    protected function getFlash():void
    {
        if(isset($_SESSION["flash"]))
        {
            echo "<div class='flash'>{$_SESSION['flash']}</div>";
            unset($_SESSION["flash"]);
        }
    }
    /**
     * Enregistre un message flash.
     *
     * @param string $message
     * @return void
     */
    protected function setFlash(string $message): void
    {
        $_SESSION["flash"] = $message;
    }
    /**
     * Affiche la vue demandée.
     * 
     * En options, on peut passer un tableau associatif avec les variables à envoyer à la vue.
     *
     * @param string $view Chemin de la vue depuis le dossier "view"
     * @param array $variables données à envoyer à la vue
     * @return void
     */
    protected function render(string $view, array $variables = []):void
    {
        foreach($variables as $name => $value)
        {
            /* 
                Exemple :
                Si on envoi le tableau suivant : ["users"=>$users]
                Ici il produira une variable $users qui contiendra la liste des utilisateurs
                $$ permet de créer un nom de variable dynamique.
            */
            $$name = $value;
        }
        // Notre fonction intègre automatiquement le header et le footer autour de nos vues.
        require __DIR__."/../../../ressources/template/_header.php";
        require __DIR__."/../../view/$view";
        require __DIR__."/../../../ressources/template/_footer.php";
    }
    /**
     * Vérifie si l'utilisateur à accès à la page ou non selon si il est connecté
     * 
     * Si le boolean est à "true", bloque l'accès aux utilisateurs non connectés
     * Si le boolean est à "false", bloque l'accès aux utilisateurs connectés
     *
     * @param boolean $bool Doit être connecté ou non
     * @param string $redirect chemin de redirection
     * @return void
     */
    protected function shouldBeLogged(bool $bool = true, string $redirect = "/"):void
    {
        shouldBeLogged($bool, $redirect);
    }
    /**
     * Paramètre un token en session et ajoute un input:hidden contenant le token
     * 
     * Optionnellement ajoute un temps de vie au jeton
     *
     * @param integer $time temps de vie du jeton
     * @return void
     */
    protected function setCSRF(int $time = 0): void
    {
        setCSRF($time);
    }
    /**
     * Vérifie si le jeton CSRF est valide.
     *
     * @return boolean true si valide.
     */
    protected function isCSRFValid():bool
    {
        return isCSRFValid();
    }
}