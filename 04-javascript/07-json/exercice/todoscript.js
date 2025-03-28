"use strict";
/*
    1. Créer une todo list. à chaque appui sur le bouton ajout,
    créer un nouvel élément dans la liste.
    cet élément doit contenir la valeur de l'input et une croix.
    On en profitera pour vider l'input.
    2. le clique sur un élément de la liste lui ajoutera une classe qui aura pour 
    effet de barrer l'élément.
    3. le clique sur la croix supprimera l'élément concerné.
    4. sauvegarder la liste en localstorage.
    5. afficher la liste sauvegardé au chargement de la page.
    6. éditer la liste lorsque l'on coche ou supprime un élément.
    Bonus : Utiliser le drag and drop pour déplacer nos éléments dans la liste. il faudra penser à sauvegarder les éléments déplacé.
*/

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const input = document.querySelector('input');
const btn = document.querySelector('button');
form.addEventListener("submit", addTodo);

function addTodo (e)
{
    e.preventDefault();
    const li = document.createElement('li');
    li.textContent = input.value;
    const span = document.createElement('span');
    span.textContent = '✗';
    li.appendChild(span);
    ul.appendChild(li);
    input.value = '';
    saveTodo();
}
li.addEventListener("click", checkTodo);
function checkTodo (e)
{

}
deleteTodo();
