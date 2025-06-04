<?php 
if(session_status() !== PHP_SESSION_ACTIVE)
{
    session_start();
    // si je n'indique pas de durée de vie, l'utilisateur sera déconnecté en fermant son navigateur
}

// Si l'utilisateur est déjà connecté.
if(isset($_SESSION["logged"]) && $_SESSION["logged"] === true)
{
    // Alors je le redirige ailleurs :
    header("Location: /");
    exit;
}

$email = $pass = "";
$error = [];

if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['login']))
{
    if(empty($_POST["email"]))
    {
        $error["email"] = "Veuillez entrer un email";
    }
    else
    {
        $email = trim($_POST["email"]);
    }// fin vérification email

    if(empty($_POST["password"]))
    {
        $error["password"] = "Veuillez entrer un mot de passe";
    }
    else
    {
        $pass = trim($_POST["password"]);
    }//Fin vérification password

    if(empty($error))
    {
        /* 
            Normalement c'est ici qu'on devrait aller chercher les données en BDD.
            Mais pour l'instant on va aller les chercher dans un fichier json.

            file_get_contents() permet de récupérer les données dans un fichier.
        */
        $users = file_get_contents("../ressources/users.json");
        /* 
            json_decode permet de traduire un string au format json, 
            en données lisible par PHP.
            Par défaut, les objets json seront traduit en objet PHP.
            Mais si on indique au second paramètre un boolean à true,
            les objets json seront traduit en tableau associatif.
        */
        $users = json_decode($users, true);
        // var_dump($users);

        // Je vérifie si on a un utilisateur avec cet email :
        $user = $users[$email]??false;

        // Si un utilisateur est trouvé alors :
        if($user)
        {
            /* 
                Les mots de passe en BDD (et dans ce json) doivent être haché.
                le hache étant différent à chaque fois, on ne peut pas simplement comparer le mot de passe avec un "=="
                On utilisera pour cela, la fonction password_verify()
                    en premier on indique le mot de passe du formulaire non haché.
                    en second le hache qui vient de la bdd.
            */
            if(password_verify($pass, $user["password"]))
            {
                /* 
                    On a le bon email et le bon mot de passe.
                    L'utilisateur est donc connecté.
                    Pour garder cette information de page en page, 
                    Je vais l'indiquer dans la session, par exemple avec un $_SESSION["logged"] = true;
                    ou $_SESSION["user"] = ["login"=>true];
                */
                $_SESSION["logged"] = true;
                /* 
                    On pourra aussi sauvegarder les informations que l'on veut réutiliser sur plusieurs pages.
                    Par exemple si le nom ou l'avatar de l'utilisateur doit apparaître sur chaque page
                */
                $_SESSION["username"] = $user["username"];
                /* 
                    Ou d'autres choses si besoin que l'on pourra vérifier à chaque page,
                    comme un temps d'expiration si on veut que la connexion soit limité dans le temps
                */
                $_SESSION["expire"] = time()+3600;
                // Une fois connecté, l'utilisateur n'a plus rien à faire ici, on peut le rediriger vers une autre page (profil, accueil...)
                header("Location: /");
                exit;
            }else
            {
                $error["login"] = "Email ou Mot de passe incorrecte (password)";
            }// fin vérification connexion password
        }
        else
        {
            $error["login"] = "Email ou Mot de passe incorrecte (email)";
        }// fin vérification connexion email
    }
}


$title = " Connexion ";
require("../ressources/template/_header.php");
?>
    <form action="04-connexion.php" method="post">
        <label for="email">Email</label>
        <input type="email" name="email" id="email">
        <span class="error"><?= $error["email"]??"" ?></span>
        <br>
        <label for="password">Mot de Passe</label>
        <input type="password" name="password" id="password">
        <span class="error"><?= $error["password"]??"" ?></span>
        <br>
        <button type="submit" name="login">Connexion</button>
        <span class="error"><?= $error["login"]??"" ?></span>
    </form>

<?php 
require("../ressources/template/_footer.php");
?>