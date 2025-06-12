<?php
if(session_status() === PHP_SESSION_NONE)
	session_start();

/**
 * Vérifie si l'utilisateur est connecté ou non et le redirige dans le cas contraire
 * 
 * Si le Boolean est à true, vérifie si l'utilisateur est connecté, 
 * Si le boolean est à false, vérifie si l'utilisateur est déconnecté,
 * Le second argument indique vers où rediriger l'utilisateur.
 *
 * @param boolean $logged
 * @param string $redirect
 * @return void
 */
function shouldBeLogged(bool $logged = true, string $redirect = "/"): void
{
    $logged_in = $_SESSION["logged"]??$_SESSION["logged_in"]??false;

    if($logged)
    {
        if(isset($_SESSION["expire"]))
        {
            // Si la session a expiré, on la supprime
            if(time()> $_SESSION["expire"])
            {
                unset($_SESSION);
                session_destroy();
                setcookie("PHPSESSID", "", time()-3600);
            }else
            {
                // Sinon elle est renouvelé pour une heure
                $_SESSION["expire"] = time() + 3600;
            }
        } // fin vérification expire
        if(!$logged_in )
        {
            // Si l'utilisateur n'est pas connecté, on le redirige.
            header("Location: $redirect");
            exit;
        }
    }
    else
    {
        /* 
            Si l'utilisateur doit être déconnecté pour accèder à la page,
            alors on vérifie si il est connecté,
            et dans ce cas on le redirige
        */
        if($logged_in)
        {
            header("Location: $redirect");
            exit;
        }
    }
}
/**
 * Redirige l'utilisateur si il ne correspond pas à l'id fourni en GET ou en POST;
 *
 * @param string $redirect
 * @param string $index 
 * @param string $session
 * @return string
 */
function isSelectedUser(string $redirect = "/", string $index = "id", string $session = "idUser"): string
{
    $selectedId = $_GET[$index] ?? $_POST[$index]?? false;

    if(!isset($_SESSION[$session]) || $_SESSION[$session] != $selectedId)
    {
        header("Location: ".$redirect);
        exit;
    }
    return $selectedId;
}
?>