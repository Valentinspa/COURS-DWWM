<?php 
/* 
    En PHP, il existe plusieurs outils pour se connecter à une BDD.
    On trouvera par exemple "mysqli" ou "pdo"
    Ici nous verrons "pdo" (PHP Data Object)
    
    Pour se connecter, PDO demande un DSN (Data Source Name)
    C'est un string contenant toute les informations pour localiser la BDD.
    {pilote}:host={adresse};port={port de connexion};dbname={nom de la bdd};charset={charset à utiliser}
*/
$dsn = "mysql:host=bddsql;port=3306;dbname=biere;charset=utf8mb4";
/* 
    Lorsque l'on crée une nouvelle instance de PDO, il prendra les paramètres suivant :
        1. le DSN
        2. le nom d'utilisateur pour se connecter à la BDD
        3. le mot de passe pour la BDD
        4. un tableau contenant la configuration de PDO
*/
$pdo = new PDO($dsn, "root", "root", [
    // Type d'erreur que dois afficher PDO :
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    // Comment les données récupéré en BDD doivent être affiché
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    // Indique à PDO de ne pas émuler les requêtes préparés (voir plus bas)
    // PDO::ATTR_EMULATE_PREPARES => false
]);

// Envoyer une requête à la BDD :
$sqlCouleur = $pdo->query("SELECT * FROM couleur");
// var_dump($sql);

// récupérer les données :
$couleurs = $sqlCouleur->fetchAll();
// var_dump($couleurs);
// Si on veut récupérer que le premier résultat, on utilisera "fetch"
$sqlType = $pdo->query("SELECT * FROM type");
$type = $sqlType->fetch();

/* 
    Lorsque la requête ne demande aucune entrée utilisateur, "query" est suffisant.
    Mais si la requête contient des entrées utilisateur, il ne faudra surtout pas utilisé query. Au risque d'avoir des injections SQL.

    Il nous faudra utiliser des requêtes préparés. 
    Si votre pilote de BDD (mysql, mariadb, postgresql...) ne gère pas les requêtes préparés,
    PDO peut les émuler. (ici mariadb les gère, l'émulation a donc été désactivé)

    On utilisera la méthode "prepare" dans laquelle on viendra écrire la requête sql en remplaçant les entrées utilisateur par :
        "?" ou ":unMotChoisi"
*/
$sqlCouleur2 = $pdo->prepare("SELECT * FROM couleur WHERE NOM_COULEUR = ?");
/* 
    Puis on passera les entrées utilisateur soit par des méthodes vu plus bas, 
    soit par "execute" auquel on passera un tableau.
        Si des "?" ont été utilisé, le premier élément du tableau ira au premier "?" et ainsi de suite.
        Si des ":unMot" ont été utilisé, on donnera un tableau associatif :
            "SELECT * FROM couleur WHERE NOM_COULEUR = :maSuperCouleur"
            execute(["maSuperCouleur"=>$entreUtilisateur]);
*/
$entreUtilisateur = "Blanche";
$sqlCouleur2->execute([$entreUtilisateur]);
$couleurFromPrepare = $sqlCouleur2->fetch();
/* 
    Dans le cas d'un execute, tous les paramètres passées, sont traité comme des strings.
    Ce qui peut poser problème dans certain cas, comme pour indiquer une limite.
    Une autre façon de donner les paramètres existe :
        "bindValue" et "bindParam"
        Ils fonctionnent de la même manière :
            premier paramètre, le nom dans la requête préparé,
            Second paramètre,  la valeur à utiliser,
            Troisième paramètre, une constante de PDO indiquant le type de la valeur
                PDO::PARAM_NULL
                PDO::PARAM_BOOL
                PDO::PARAM_INT
                PDO::PARAM_STR
*/
$sqlArticle = $pdo->prepare("SELECT * FROM article LIMIT :lim");
$sqlArticle->bindValue("lim", 5, PDO::PARAM_INT);
// dans ce cas là execute reste vide:
$sqlArticle->execute();
// Par exemple, ceci provoquera une erreur, si PDO emule la requête préparé :
// $sqlArticle->execute(["lim"=>5]);
$articles = $sqlArticle->fetchAll();

// ? Différence entre bindValue et bindParam :

// ? Exemple avec bindValue :
// Je choisi une couleur
$UserCouleur = "Blanche";
// Je prépare la requête
$sqlBindValue = $pdo->prepare("SELECT * FROM couleur WHERE NOM_COULEUR = :col");
// Je lance un bindValue
$sqlBindValue->bindValue("col", $UserCouleur, PDO::PARAM_STR);
// Je change la couleur
$UserCouleur = "Ambrée";
// J'execute la requête
$sqlBindValue->execute();
$couleurBindValue = $sqlBindValue->fetch();

// ? Exemple avec bindParam :
// Je choisi une couleur
$UserCouleur = "Blanche";
// Je prépare la requête
$sqlBindParam = $pdo->prepare("SELECT * FROM couleur WHERE NOM_COULEUR = :col");
// Je lance un bindParam
$sqlBindParam->bindParam("col", $UserCouleur, PDO::PARAM_STR);
// Je change la couleur
$UserCouleur = "Ambrée";
// J'execute la requête
$sqlBindParam->execute();
$couleurBindParam = $sqlBindParam->fetch();
/* 
    Avec bindValue, la valeur dans la variable est directement passé à notre requête préparé.
    Avec bindParam, c'est la variable entière qui est passé. Donc si elle change avant l'execute, la requête changera.
*/

$title = " Connexion à la Base de donnée ";
require("../ressources/template/_header.php");

echo '<pre>'.print_r($couleurs, 1).'</pre>';
echo '<pre>'.print_r($type, 1).'</pre>';
echo '<pre>'.print_r($couleurFromPrepare, 1).'</pre>';
echo '<pre>'.print_r($articles, 1).'</pre>';
echo '<pre>'.print_r($couleurBindValue, 1).'</pre>';
echo '<pre>'.print_r($couleurBindParam, 1).'</pre>';


require("../ressources/template/_footer.php");
?>