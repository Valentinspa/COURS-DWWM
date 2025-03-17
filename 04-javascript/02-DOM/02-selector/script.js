"use strict";
/* 
    Permet de récupérés des éléments HTML via le nom de leur balise.
*/
const lis = document.getElementsByTagName("li");
/* 
    On obtient un objet "HTMLCollection" contenant toutes les balises demandées.
    Ici j'ai cherché dans tout mon document, mais il est possible de préciser une recherche dans un élément précis.
    Imaginons que j'ai une variable "footer" qui contient mon footer, je peux écrire :
        footer.getElementsByTagName("li");
*/
console.log(lis);
/* 
    !ATTENTION, je ne peux pas modifier tous les li d'un seul coup,
    Il me faudra préciser lequel je modifie :
*/
lis.textContent = "Coucou";
// Ceci fonctionnera :
lis[0].textContent = "Coucou";

/* 
    Permet de récupéré des éléments HTML via leurs nom de classe
    Pour le reste, il fonctionne comme getElementsByTagName
*/
const ps = document.getElementsByClassName("step");
const p1 = document.getElementsByClassName("marche1");
console.log(ps,p1);

/* 
    Selectionne un élément HTML via son ID.
    Un id devant être unique, ici pas de HTMLCollection, mais directement l'élément HTML
*/
const h1 = document.getElementById("mainTitle");
console.log(h1);

/* 
    Prend en paramètre, les même selecteurs qu'en CSS.
    Il selectionnera le premier élément correspondant à ce selecteur.
*/
const p2 = document.querySelector(".marche2");
// const p2 = document.querySelector("main > p:nth-of-type(2)");
// const p2 = document.querySelector("body main p.marche2.step");
console.log(p2);

/* 
    Fonctionne comme le querySelector
    Mais ne s'arrêtera pas au premier résultat,
    Il rangera la totalité des balises correspondante dans un tableau nommé "NodeList"
*/
const lis2 = document.querySelectorAll("footer li");
console.log(lis2);
// On peut préciser la recherche à un élément plutôt qu'au document en entier.
const header = document.querySelector('header');
const h = header.querySelector('h1');

// ? Selecteurs Bonus :

// Sélectionne l'élément HTML suivant (ici le main)
console.log(header.nextElementSibling);
// Sélectionne ce qui suis (ici du text consistant à un saut à la ligne et de l'indentation)
console.log(header.nextSibling);
// On trouvera aussi "previousElementSibling"
console.log(header.previousElementSibling);
// retourne un objet HTMLCollection contenant tous les enfants
console.log(header.children);
// retourne le parent de l'élément.
console.log(lis[2].parentElement);
// retourne le parent le plus proche qui correspond au selecteur CSS
console.log(lis[2].closest("footer"));

// ? déplacer ou supprimer.
// Si je demande d'ajouter un élément déjà présent, il sera déplacé :
// header.append(lis[2]);
// retirer l'élément indiqué :
// lis2[2].remove();
/* 
    Si l'élément est présent directent en variable ou dans une nodeList, il sera toujours présent.
    Mais dans un HTMLCollection, il sera retiré.
*/
console.log(lis2, lis);
// Il existe une autre façon de retirer :
// header.removeChild(h);
// Dans le header, je retire mon h1


