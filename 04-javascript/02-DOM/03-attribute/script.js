"use strict";

const h1 = document.querySelector('#mainTitle');
// console.dir(h1);

// ? Attribut style 

/* 
    Une fois un élément HTML selectionner, nous pouvons modifier son attribut "style" afin d'y insérer du CSS.
        monElementHTML.style.maPropriétéCSS
        h1.style.color

    ! ATTENTION, Les propriétés CSS qui s'écrivent avec un tiret "background-color", sont écrite ici en version camelCase "backgroundColor"
*/
h1.style.backgroundColor = "rgb(123, 45, 98)";
h1.style.fontStyle = "italic";
h1.style.textShadow = "5px 5px rgba(0,0,0,0.3)";
h1.style.fontSize = "5rem";
// ! ATTENTION, Si on se trompe sur le nom d'une propriété, ou sur une valeur, JS ne provoquera pas d'erreur, mais n'appliquera aucun effet.
h1.style.couleur = "red";
h1.style.color = "rgbaaa(255,255,255,0.8)";

// ? les classes
/* 
    Changer le style peut être pratique, mais très verbeux si on a beaucoup de propriété à changer.
    Une autre possibilité est d'ajouter ou retirer une classe qui a les propriétés attendues.

    Pour cela deux possibilités,
    Soit className qui gère l'attribut class, comme un simple string.
    Soit classList qui gère l'attribut class, comme un objet avec plusieurs fonctionnalités.
*/
// Change tout l'attribut class :
h1.className = "banane";
// Ajoute une classe :
h1.className += " chaussette";
// Retire toute les classes :
h1.className = "";

// Ajoute une classe :
h1.classList.add("banane");
// Retire une classe :
h1.classList.remove("banane");
// Ajoute la classe si elle n'y est pas, et la retire si elle est présente.
h1.classList.toggle("banane");
// Vérifie la présence de la classe et retourne un boolean
console.log(h1.classList.contains("banane"));

// ? les autres attributs

/* 
    Pour la plupart des autres attributs,
    Il est possible de les modifier soit directement par leurs noms.
    Soit via les méthodes "getAttribute" et "setAttribute"
*/
// Par exemple si je veux connaître l'id de mon élément :
console.log(h1.id, h1.getAttribute("id"));
// h1.setAttribute("id", h1.getAttribute("id")+"2");
h1.id += "2";

const a = document.querySelector('footer ul li a');
console.log(a);
// Le premier paramètre, c'est l'attribut que l'on souhaite modifier
// Le second paramètre, c'est la valeur que l'on donne à cet attribut 
a.setAttribute("target", "_blank");

/* 
    Les data-attributes fonctionnent un peu différement
    On devra passer par "dataset" suivi du nom de l'attribut
*/
console.log(a.dataset.color);
// pour le modifier :
a.dataset.color = "Je ne suis pas une couleur";
// Pour ajouter un data-attribute qui n'existe pas encore, il suffit d'utiliser un nouveau nom :
a.dataset.bidule = "je ne sert à rien";



