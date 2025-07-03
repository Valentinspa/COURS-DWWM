<?php 
namespace Classes\Abstract;
use \PDO;
use \PDOStatement;

require __DIR__."/../../../ressources/service/_pdo.php";
/**
 * Classe abtraite devant être hérités aux différents modèles.
 */
abstract class AbstractModel
{
    protected PDO $pdo;
    protected string $linkedClass = "ChangeInModelClass";

    public function __construct()
    {
        $this->pdo = connexionPDO();
        // On change le fetch mode pour avoir des classes plutôt que des tableaux associatif :
        $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_CLASS);
    }
    /**
     * Paramètre le fetch mode pour indiquer quelle classe utiliser
     * 
     * le & devant le paramètre permet d'indiquer que les modifications devront être apportée à la variable même en dehors de la fonction.
     *
     * @param PDOStatement $sql Requête SQL.
     * @return PDOStatement
     */
    private function setFetchMode(PDOStatement &$sql):PDOStatement
    {
        $sql->setFetchMode(PDO::FETCH_CLASS, $this->linkedClass);
        return $sql;
    }
    /**
     * Lance la requête en argument et paramètre le fetch mode
     *
     * @param string $query requête SQL
     * @return PDOStatement
     */
    protected function runQuery(string $query):PDOStatement
    {
        $sql = $this->pdo->query($query);
        $this->setFetchMode($sql);
        return $sql;
    }
    /**
     * Prepare la requête en argument et paramètre le fetch mode
     *
     * @param string $query requête SQL
     * @return PDOStatement
     */
    protected function prepareQuery(string $query):PDOStatement
    {
        $sql = $this->pdo->prepare($query);
        $this->setFetchMode($sql);
        return $sql;
    }
}