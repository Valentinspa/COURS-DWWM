<?php 
namespace Classes\Interface;

/**
 * Interface indiquant qu'une classe servant de CRUD doit contenir une fonction pour chaque élément du CRUD.
 */
interface CrudInterface
{
    function create();
    function read();
    function update();
    function delete();
}