<?php
/*
    Qu'est ce que le CRUD ?
    Le "CRUD" est un accronyme signifiant 
        Create Read Update Delete.
    Cela représente ce que la majorité des tables d'une BDD a besoin.
        Create : Créer de nouvelles lignes dans notre table.
        Read : Lire et afficher les données de notre table. 
        Update : Mettre à jour les données de notre table. 
        Delete : Supprimer les données de notre table. 

    Généralement pour chaque table que l'on crée, on aura besoin d'un 
    "CRUD" complet pour l'accompagner. Bien sûr il y a quelques exceptions
    par exemple sur twitter on peut créer de nouveau message, 
    lire les messages, les supprimer mais on ne peut pas les mettre à jour.

    Mais avant de commencer notre CRUD, on va devoir créer une BDD 
    et avoir la capacité de s'y connecter.

    Pour cet exemple, partons sur un classique, on va appeler 
    notre BDD "blog" et on va créer une table "users". 
    Notre table "users" va recevoir les colonnes suivantes :
        idUser int AI PK;
        username varchar(25);
        email varchar(255) UQ;
        password text;
        createdAt datetime DEFAULT timestamp; 
        (voir ressources/MCD/MCD-Blog-01.png)
    Rendez vous donc dans le dossier "ressources" avec les fichiers 
    "config/_blogConfig.php" puis "service/_blogPDO.php".

    Ensuite on va vérifier si on est connecté, et bien oui, un utilisateur connecté n'a rien à faire sur la page d'inscription.
*/
require "../ressources/service/_shouldBeLogged.php";
shouldBeLogged(false, "/04-router/blog");
/* 
    Une fois cela fait, attaquons nous à la construction de notre 
    formulaire. 
    On est dans la partie "Create" pour "User", donc créer un nouvel
    utilisateur, on est sur un formulaire d'inscription.

    Le formulaire construit, nous allons attaquer son traitement.
*/
$username = $email = $password = "";
$error = [];
// Une variable contenant la regex qui servira au mot de passe.
$regexPass = 
"/^(?=.*[!?@#$%^&*+-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/";
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["inscription"]))
{
    // On inclu notre service de connexion.
    require("../ressources/service/_pdo.php");
    require("../ressources/service/_csrf.php");
    // On se connecte à notre BDD
    $pdo = connexionPDO();
    // traitement username
    if(empty($_POST["username"])){
        $error["username"] = "Veuillez saisir un nom d'utilisateur";
    }else{
        $username = cleanData($_POST["username"]);
        /*
            En PHP on utilisera "preg_match" pour tester si un string 
            correspond à une "REGEX"
        */
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
        /* 
            On souhaite que nos utilisateurs puissent n'avoir qu'un 
            seul compte par email, on va donc selectionner dans notre BDD tout utilisateur ayant cet email.

            Ici on a ce qu'on appelle une requête préparé.
            On détaillera la raison de son utilisation dans 
            le chapitre sécurité. 

            Pour l'instant retenons qu'on prend notre 
            instance de "PDO" et qu'on appelle 
            sa méthode "prepare" ($pdo->prepare())

            Dans celle ci on met sous forme de string notre
            requête SQL. avec un placeholder représenté par ":"
            ici ":em"
            le tout rangé dans une nouvelle variable.
        */
        $sql = $pdo->prepare("SELECT * FROM users WHERE email=:em");
        /*
            Puis on demande l'execution de la requête 
            à laquelle on donne un tableau associatif où
            chaque clef est le placeholder sans les ":". 
            On indique donc à de remplacer ":em" par l'email.
        */
        $sql->execute(["em" => $email]);
        
        /* 
            Enfin on utilise fetch() pour aller chercher
            l'information récupéré par la requête.
        */
        $resultat = $sql->fetch();
        /*
            Si on obtient un résultat, c'est que l'email existe déjà en 
            bdd, on enverra donc une erreur, sinon tout va bien.
        */
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
            /* 
                Si le mot de passe est valide, alors on le hash
            */
            $password = password_hash($password, PASSWORD_BCRYPT);
        }
    }
    // vérification du mot de passe.
    if(empty($_POST["passwordBis"])){
        $error["passwordBis"] = "Veuillez saisir à nouveau votre mot de passe";
    }else{
        /* 
            On vérifie si l'utilisateur a mit des mots de passes 
            différent, dans ce cas on affiche un message d'erreur. 
        */
        if($_POST["password"] != $_POST["passwordBis"]){
            $error["passwordBis"] = "Veuillez saisir le même mot de passe";
        }
    }
    /* 
        Pour simplifier le cours, il manque deux éléments à ce formulaire, 
        lesquels sont-ils?

            - CSRF
            - Captcha
    */
    // envoi des données.
    if(empty($error)){
        /* 
            Les requêtes préparés peuvent aussi avoir à la place 
            des placeholder des "?", dans ce cas là, la façon
            dont on donnera les variables changera légèrement.
        */
        $sql = $pdo->prepare(
            "INSERT INTO users(username, email, password) 
            VALUES(?, ?, ?)"
        );
        /* 
            Si on a préféré utiliser des "?" plutôt que les placeholder
            nommé, alors il faudra non plus donné un tableau associatif
            à execute mais un tableau classique dont les éléments 
            devront être placé dans l'ordre exacte attendu par la requête.
            (ici on a dit dans la requête "username, email, password"
            alors l'execute doit avoir "username, email, password" dans
            le même ordre.)

            L'utilisation de l'une ou l'autre des façons n'est qu'une question de préférence.
        */
        $sql->execute([$username,$email,$password ]);
        /* 
            Puis une fois inscrit, on redirige notre utilisateur 
            vers une autre page. souvent une page de connexion.
        */
        header("Location: /04-router/connexion");
		exit;
    }
}
$title = " CRUD - Create ";
require("../ressources/template/_header.php");
?>
<form action="/04-router/inscription" method="post">
    <!-- username -->
    <label for="username">Nom d'Utilisateur :</label>
    <input type="text" name="username" id="username" required>
    <span class="erreur"><?php echo $error["username"]??""; ?></span>
    <br>
    <!-- Email -->
    <label for="email">Adresse Email :</label>
    <input type="email" name="email" id="email" required>
    <span class="erreur"><?php echo $error["email"]??""; ?></span> 
    <br>
    <!-- Password -->
    <label for="password">Mot de passe :</label>
    <input type="password" name="password" id="password" required>
    <span class="erreur"><?php echo $error["password"]??""; ?></span> 
    <br>
    <!-- password verify -->
    <label for="passwordBis">Confirmation du mot de passe :</label>
    <input type="password" name="passwordBis" id="passwordBis" required>
    <span class="erreur"><?php echo $error["passwordBis"]??""; ?></span> 
    <br>

    <input type="submit" value="Inscription" name="inscription">
</form>
<?php 
/* 
    Pour des raisons de simplicité du cours, on n'a pas mit de securité
    sur ce formulaire, mais pensez à en ajouter sur vos projets.
    (csrf, captcha, confirmation du mail...)
*/
require("../ressources/template/_footer.php");
?>