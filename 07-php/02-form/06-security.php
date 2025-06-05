<?php 
require "../ressources/service/_csrf.php";

$title = "Security";
require "../ressources/template/_header.php";
/* 
    En tant que développeur web, nous devons protéger nos sites des différentes attaques classique que sont :
        - XSS (insertion de sript js ou de html et css directement dans la page)
        - CSRF (Envoi d'une requête depuis un formulaire tier vers un formulaire de notre site)
        - Brute Force (Multiple Tentative d'identifiant sur un formulaire de connexion)
        - Injection SQL (envoi de requête SQL par un utilisateur)
        - spam bot (multiple mail sur un formulaire de contact ou inscription sur un site)

    ------------------ XSS ------------------
    XSS (Cross Site Scripting)
    Si on ne protège pas les envois utilisateur contre cela. Ils peuvent taper dans n'importe quel formulaire du HTML, CSS ou JS.
    Pour s'en protéger, on filtrera les données ayant pour but d'être affiché, soit avant la mise en BDD soit au moment de l'affichage avec :
        - htmlspecialchars()
        ou
        - htmlentities()
*/
$XSS_attack = "<script>document.querySelector('header').style.backgroundColor = 'chartreuse';</script>";
// Pas sécurisé :
echo $XSS_attack;
// Sécurisé :
echo htmlspecialchars($XSS_attack), "<br>";
echo htmlentities($XSS_attack), "<br>";
// ces fonctions remplacent certains character comme "<" par leur code html "&gt;"

/* 
    ----------------------------CSRF---------------------------
    le Cross Site Request Forgery.
    Le principe est de construire une requête sur un site ou formulaire quelconque.
    Mais au lieu de rester sur ce site, on envoi la requête vers un autre site.
    Par exemple un petit sondage sur votre fruit favoris, qui cache des champs invisible et qui lors de la validation, va vous envoyer vers un site que vous gérer pour valider un formulaire accessible uniquement à vous.

    Pour s'en protéger, on va générer un token aléatoire (suite de chiffre et de lettre) qui sera sauvegardé en session, et affiché dans un champ de type "hidden" dans le formulaire.
    Lors de l'envoi du formulaire, on vérifiera si ce token est le même que celui en session.
    Un formulaire tier n'aura pas le jeton.
    (voir fichier ressources/service/_csrf.php)

    -------------------- Brute Force --------------
    Le brute force est simple le fait d'essayer tous les identifiants (email / password) possible jusqu'à en trouver un bon.
    à la main c'est très long, mais avec un bot on peut faire plusieurs milliers d'essai à la seconde.
    Plusieurs solutions possible pour s'en protéger :
        - Forcer l'utilisateur a mettre un mot de passe complexe.(Au moins 8 ou 12 charactères, minuscule, majuscule, chiffre, speciaux)
        - Bloquer l'accès au compte après un certain nombre d'échec (soit pour une durée limité, soit jusqu'au clique sur un email envoyé)
        - Forcer un temps d'attente entre chaque essai (ne serait-ce que 1 ou 2 secondes)

    -------------------------- Injection SQL ---------------------
    Cela consiste à envoyer du SQL dans un formulaire, et que celui ci, soit executer. 
    Que ce soit pour récupérer des données, supprimer des éléments ou en modifier.

    Pour s'en protéger, on ne va jamais insérer de données venant d'un utilisateur, directement dans la requête :
    $message_Utilisateur = "(DELETE FROM users;)";
    ! NE PAS FAIRE :
    $sql = "INSERT INTO messages (content) VALUES ($message_Utilisateur)";
    ! On se retrouve avec la requête suivante :
    "INSERT INTO messages (content) VALUES ((DELETE FROM users;))";

    ? La bonne solution est de faire une requête préparé :
    On verra en détail son utilisation plus tard mais pour faire simple,
    On va utiliser une première fonction qui aura pour rôle de lire le SQL sans les informations de l'utilisateur :
        prepare("INSERT INTO messages (content) VALUES (?)")
    Puis on utilisera une seconde fonction pour envoyer les données :
        values($message_Utilisateur)
    Peu importe ce que l'utilisateur a mit, notre bdd le traitera que comme du texte.

    ------------------- spam bot -------------------------
    Les formulaires accessible sans connexion (formulaire de contact, d'inscription, plus rarement mais parfois sur celui de connexion aussi) sont sensible aux bots.
    Sans protection, vous pourriez avoir par exemple dans votre boîte mail des centaines de mail venant de votre formulaire de contact.

    - Pour s'en protéger, le plus classique est d'utiliser un CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart)
    - On pourra aussi utiliser un Honey Pot, un pot de miel est une faille volontaire qui si utilisé prouvera que c'est un bot.
    Sur un formulaire, on pourra par exemple créer un champ invisible (via CSS et non en type hidden) qui ne sera donc pas rempli par les humain, mais que les bots eux pourrons remplir.

    --------------------------- Hachage -------------------

    Pas une faille de sécurité mais important, tout mot de passe sauvegardé en BDD se doit d'être haché.
    Un administrateur ou un hackeur ayant accès à la BDD, ne doit pas connaître instantanément les mots de passe utilisateur.
    On parle de Hasher un mot de passe et non de le crypter, car un texte crypté peut être décripté, alors qu'un hachage ne peut être déhaché.
    ? Bonus :
        - Attention d'avoir vos formulaires contenant des informations privée en POST.
        - Attention que toute vos pages devant être accessible après connexion, ne sont pas accessible hors connexion.

    Petit exemple de formulaire sécurisé :
*/
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['password']))
{
    if(!isCSRFValid())
    {
        $error = "La méthode utilisée n'est pas permise !";
    }
    if(!isset($_POST["captcha"], $_SESSION['captchaStr']) || $_POST["captcha"] !== $_SESSION['captchaStr'])
    {
        $error = "Captcha Incorrecte!";
    }
    if(empty($_POST["password"]))
    {
        $error = "Veuillez indiquer un mot de passe";
    }
    else
    {
        $password = trim($_POST["password"]);
        /* 
            password_hash s'occupera de hacher le mot de passe donnée en premier paramètre,
            selon l'algorithme indiqué en second paramètre.
            Cet algorithme est représenté par une constante PHP au choix entre :
                PASSWORD_BCRYPT
                PASSWORD_ARGON2I
                PASSWORD_ARGON2ID
                (PASSWORD_DEFAULT laisse PHP choisir pour nous, généralement le plus sécurisé)
            Il peut aussi accueillir un troisième paramètre optionnel pour modifier les paramètres des algorithmes.
        */
        $password = password_hash($password, PASSWORD_DEFAULT);
    }
}
?>
<hr>
<form action="06-security.php" method="POST">
    <label for="password">hacher un mot de passe :</label>
    <input type="password" name="password" id="password">
    <!-- ajout du captcha -->
    <div>
        <label for="captcha">Veuillez recopier le texte suivant :</label>
        <br>
        <img src="../ressources/service/_captcha.php" alt="captcha">
        <br>
        <input type="text" name="captcha" id="captcha" pattern="[A-Z0-9]{6}">
    </div>
    <!-- fin captcha -->
    <!-- CSRF -->
        <?php setCSRF(); ?>
    <!-- fin CSRF -->
    <br>
    <input type="submit" value="Envoyer">
    <span class="error"><?= $error??"" ?></span>
</form>

<?php 
if(empty($error) && !empty($password))
{
    // Ici c'est un exemple mais n'affichez jamais le mot de passe de quelqu'un
    echo "<p>Votre mot de passe haché est : $password</p>";
}
require "../ressources/template/_footer.php";
?>