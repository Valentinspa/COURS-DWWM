<?php 
# --- HEADERS ---

// Autorise l'accès à l'api. "*" signifie n'importe quel site.
header("Access-Control-Allow-Origin: *");
// ? Mais on pourrait bloquer à tous site sauf à un site en particulier:
// header("Access-Control-Allow-Origin: https://mon-app-front.com");

// Indique que les réponses de notre api seront en JSON.
header("Content-Type: application/json; charset=UTF-8");

// Temps de cache pour les pré-requêtes CORS (en seconde)
header("Access-Control-Max-Age: 3600");
/* 
    ? Lorsqu'un navigateur envoi une requête à une API. Une première "pré-requête" est lancé en methode "OPTIONS".
    Celle ci va permettre de vérifier si le site à tous les droits d'accès à l'API.
    Ce header permet de garder en cache le résultat de cette requête.
*/

// Autorise l'échange de cookie et d'identifiant.
header("Access-Control-Allow-Credentials: true");

// Spécifie les headers authorisés dans les requêtes clients.
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
/* 
    - Content-Type  : Permet d'envoyer du JSON (ou autre type)
    - Authorization : Permet l'envoi de token JWT ou Bearer par exemple.
    - X-Requested-With  : Fréquemment utilisé par AJAX pour indiquer une requête JS.
*/

# --- FUNCTIONS ---

// Définit une fonction personnalisée pour gérer les erreurs PHP.
set_error_handler("handleErrors");

/**
 * Envoi une réponse JSON standardisée et arrête l'execution du script.
 *
 * @param array $data
 * @param integer $status
 * @param string $message
 * @return void
 */
function sendResponse(array $data, int $status, string $message): void
{
    http_response_code($status);
    echo json_encode([
        "data"=>$data,
        "status"=>$status,
        "message"=>$message
    ]);
    exit;
}
/**
 * Ajoute une erreur à la liste des violations, ou retourne l'ensemble des erreurs.
 *
 * @param boolean|string $property Nom du champ concerné
 * @param boolean|string $message Message d'erreur
 * @return array|void retourne la liste des erreurs si il manque un argument.
 */
function setError($property = false, $message = false)
{
    static $error = [];
    // Si il manque un des paramètres, on retourne le tableau d'erreur
    if(!$property || !$message)
    {
        return ["violations"=>$error];
    }
    // si les deux paramètres sont présent, on ajoute l'erreur au tableau :
    $error[]=[
        "propertyPath"=>$property,
        "message"=>$message
    ];
}
/**
 * Gère les erreurs PHP en les convertissant en exception
 *
 * @param integer $severity Niveau de l'erreur
 * @param string $message Message de l'erreur
 * @param string $file Fichier où a eu lieu l'erreur
 * @param integer $line Ligne de l'erreur
 * @return void
 * @throws ErrorException
 */
function handleErrors(int $severity, string $message, string $file, int $line)
{
    throw new ErrorException($message, 0, $severity, $file, $line);
}
/**
 * écrit un message d'erreur dans un fichier log
 *
 * @param string $errorMessage Message d'erreur
 * @param string $errorFile Fichier où l'erreur est détecté
 * @param string $errorLine Ligne de l'erreur
 * @return void
 */
function handleLogs(string $errorMessage, string $errorFile, string $errorLine)
{
    $logDir = __DIR__."/logs"; // Dossier des logs
    $logFile = $logDir . "/error.log"; // fichier où sauvegarder les erreurs.
    $date = date("Y-m-d H:i:s"); // date et heure de l'erreur
    $message = "$date - Error API : $errorMessage - Error File : $errorFile - ErrorLine : $errorLine\n"; // message à sauvegarder

    if(!is_dir($logDir))
    {
        mkdir($logDir, 0755, true); // Création du dossier s'il n'existe pas
    }
    error_log($message, 3, $logFile); // écriture dans le fichier log
    // ? le "3" indique que l'écriture doit se faire dans le fichier en troisième paramètre.
}
/* 
    mkdir permet la création de dossier, indiqué en premier paramètre.
    Le second indique les droits :
        - 0 indique que le suivant est en octale (base 8)
        - 7 indique que le propriétaire à tous les droits.
        - 5 indique que le groupe propriétaire peut juste lire ou lancer le fichier.
        - 5 indique que les autres utilisateur peuvent juste lire ou lancer le fichier.
    
    le troisième paramètre indique la récurcivité, c'est à dire si plusieurs dossiers peuvent être créé.
        - sans true : créer le dossier "fruits/banane" provoquera une erreur car le dossier "fruits" n'existe pas.
        - avec true : créer le dossier "fruits/banane" créera les deux dossiers
*/