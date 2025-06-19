<?php
use MongoDB\BSON\ObjectId;
use MongoDB\Driver\Query;

function connexionMongo()
{
    $config = require __DIR__."/../config/_mongoConfig.php";
    
    $dsn = "mongodb://{$config['user']}:{$config['password']}@{$config['host']}:{$config['port']}";

    try
    {
        $mongo = new \MongoDB\Driver\Manager($dsn);
        return $mongo;
    }catch(Exception $e){
        echo "Exception reçue :{$e->getMessage()}\n";
    }

}
/**
 * récupère le résultat d'une requête.
 *
 * @param string $collection
 * @param Query $query
 * @param string $idName
 * @param boolean $one
 * @return array
 */
function queryResult(string $collection, Query $query, string $idName, bool $one = false): array
{
    global $mongo;
    // Execute la requête donné en argument.
    $cursor = $mongo->executeQuery($collection, $query);
    /* 
        Défini sous quel forme les résultats doivent être affiché
        https://www.php.net/manual/fr/mongodb.persistence.deserialization.php#mongodb.persistence.typemaps
    */
    $cursor->setTypeMap(['root' => 'array']);
    // Retourne le résultat sous forme de tableau
    $result = $cursor->toArray();
    // change l'objet id en string
    $result = setId($result, $idName);
    if($one && count($result)) return $result[0];
    return $result;
}
/**
 * Traduit l'id en string utilisable.
 * Car l'id de mongoDB est un objet.
 *
 * @param array $result
 * @param string $idName
 * @return array
 */
function setId(array $result, string $idName):array
{
    for($i= 0; $i < count($result); $i++)
    {
        $result[$i][$idName] = (string)$result[$i]["_id"];
    }
    return $result;
}
/**
 * transforme l'id en ObjectId
 *
 * @param string $id
 * @return void
 */
function getId(string $id)
{
    return new ObjectId((string)$id);
}
?>