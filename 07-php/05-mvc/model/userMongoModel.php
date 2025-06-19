<?php 
use MongoDB\Driver\Query;
use MongoDB\Driver\BulkWrite;

require_once __DIR__."/../../ressources/service/_mongo.php";

$mongo = connexionMongo();
$bulk = new BulkWrite();

/**
 * Récupère tous les utilisateurs.
 *
 * @return array
 */
function getAllUsers(): array
{
    $query = new Query([]);
    return queryResult("blog.user",$query,"idUser");
}
/**
 * Selectionne un utilisateur par son Email.
 *
 * @param string $email
 * @return array|boolean
 */
function getOneUserByEmail(string $email): array|bool
{
    $query = new Query(["email"=>$email]);
    return queryResult("blog.user",$query,"idUser", true);
}
/**
 * Selectionne un utilisateur par son id.
 *
 * @param integer $id
 * @return array|boolean
 */
function getOneUserById(string $id): array|bool
{
    $query = new Query(["_id"=>getId($id)]);
    return queryResult("blog.user",$query,"idUser", true);
}
/**
 * Ajoute un utilisateur en BDD
 *
 * @param string $us
 * @param string $em
 * @param string $pass
 * @return void
 */
function addUser(string $us, string $em, string $pass): void
{
    global $mongo, $bulk;
    $bulk->insert(["username"=>$us, "email"=>$em, "password"=>$pass]);
    $mongo->executeBulkWrite("blog.user", $bulk);
}
/**
 * Supprime un utilisateur par son id.
 *
 * @param string $id
 * @return void
 */
function deleteUserById(string $id):void
{
    global $mongo, $bulk;
    // Il prend en paramètre la recherche à effectuer pour supprimer les éléments.
    $bulk->delete(["_id"=>getId($id)]);
    $mongo->executeBulkWrite("blog.user", $bulk);
}
/**
 * Met à jour l'utilisateur via son id.
 *
 * @param string $username
 * @param string $email
 * @param string $password
 * @param string $id
 * @return void
 */
function updateUserById(string $username, string $email, string $password, string $id):void
{
    global $mongo, $bulk;
    // La fonction update prend en premier paramètre la recherche à effectuer et en second les paramètres à changer
    $bulk->update(["_id"=>getId($id)], ['$set'=>["username"=>$username, "email"=>$email, "password"=>$password]]);
    $mongo->executeBulkWrite("blog.user", $bulk);
}

?>