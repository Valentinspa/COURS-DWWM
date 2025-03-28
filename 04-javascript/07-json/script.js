"use strict";

const form = document.querySelector('form');

form.addEventListener("submit", saveData);

/**
 * handle the form submission
 * @param {SubmitEvent} e 
 */
function saveData(e)
{
    e.preventDefault();
    /* 
        l'objet FormData prend en paramètre un HTMLFormElement (une balise form)
        Il permet de traiter tout un formulaire et ses données sous la forme d'un objet.
    */
    const data = new FormData(form);
    // console.log(data);
    // je déclare un objet vide
    const user = {};
    // je boucle sur les différentes données du formulaire :
    data.forEach(function(value, name){
        // j'obtien en premier paramètre, la valeur de chaque champs du formulaire, et en second, son nom.
        // console.log(value, name);
        user[name] = value;
    });
    // console.log(user);
    showUser(user);

    // localStorage.setItem("prenom", user.prenom);
    // localStorage.setItem("age", user.age);
    // * Impossible de sauvegarder un objet en entier.
    // localStorage.setItem("user", user);
    /* 
        JSON.stringify() va transformer en string sous le format json,
        tout élément qui lui sera passé en paramètre.

        Ici je transforme mon objet "user" en string au format json.
    */
    const strUser = JSON.stringify(user);
    // console.log(strUser);
    localStorage.setItem("user", strUser);
    // ! on ne peut pas transformer en json, un objet complexe avec des fonctions, cela doit rester des données (number, string, bool, array, object...)
    // console.log(JSON.stringify(data));
    
}
/**
 * show the user in the H1
 * @param {{prenom:string, age:string}} u 
 */
function showUser(u)
{
    const h1 = document.querySelector('h1');
    h1.textContent = `Je suis ${u.prenom} et j'ai ${u.age} ans!`;
}

const userString = localStorage.getItem("user");

if(userString)
{
    /* 
        JSON.parse() va prendre en paramètre un string au format JSON.
        Et le transformer en objet javascript.
    */
    console.log("avant parse",userString);
    const user = JSON.parse(userString);
    console.log("après parse",user);
    showUser(user);
}