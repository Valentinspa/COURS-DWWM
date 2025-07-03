<?php 
namespace Classes\Abstract;
/**
 * Classe abstraite qui devra être hérité aux entités.
 * Une entité est une classe qui représente une table de ma base de donnée.
 * Par exemple une entité "user" contiendrait les même champs que ma table user en bdd.
 */
abstract class AbstractEntity
{
    /**
     * Valide les différentes propriétés de l'entité
     *
     * @return array tableau contenant les erreurs possible.
     */
    abstract public function validate():array;
    /**
     * Nettoie le string fourni pour éviter les attaques XSS ou de simples erreurs d'espace en trop.
     *
     * @param string $data données à nettoyer
     * @return string données propres
     */
    protected function cleanData(string $data):string
    {
        $data = trim($data);
        $data = stripslashes($data);
        return htmlspecialchars($data);
    }
}