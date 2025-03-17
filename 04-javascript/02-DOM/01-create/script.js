"use strict";

// log et dir n'ont pas de différence sur firefox
console.log(document.body);
// mais sur chromium cela affiche soit le HTML soit l'objet javascript
// console.dir(document.body);

// createElement permet de créer un élément HTML
const span1 = document.createElement("span");
// textContent est une des propriétés permettant de changer le texte d'un élément HTML
span1.textContent = "Coucou";

console.log(span1);

// appendChild ajoute à la fin de l'élément qui le précède, l'élément mis en paramètre. (ici on ajoute notre span à la fin du body)
document.body.appendChild(span1);
// prepend permet de placer un élément HTML au début de son parent.
// * Si on tente d'ajouter un élément HTML qui est déjà présent, il sera juste déplacé.
document.body.prepend(span1);
// append fonctionne comme appendChild, mais peut prendre plusieurs paramètres et accepte aussi du texte
document.body.append(span1, "test");

span1.innerHTML = "<b>COUCOU mais en gras</b>";
// innerHTML gère les balises HTML alors que textContent.
span1.textContent = "<b>COUCOU mais en gras</b>";
// ! Pour des raisons de sécurité, si des informations textuelles viennent des utilisateurs, il faudra privilégié "textContent";

// Affiche le texte avec les indentations et sauts à la ligne
console.log(document.body.textContent);
// Affiche toute les balises et code HTML
console.log(document.body.innerHTML);
// Affiche le texte sans indentations et sauts à la ligne supplémentaires
console.log(document.body.innerText);

document.body.textContent = "";

const h = document.createElement("header");
const m = document.createElement("main");
const f = document.createElement("footer");

h.innerHTML = "<h1>Super site en JS</h1>";
f.innerHTML = /* html */ `<ul><li>MENU 1</li><li>MENU 2</li><li>MENU 3</li></ul>`;


if(document.body)
{
    // Si le CSS indique des règles pour des éléments qui n'existent pas au chargement de la page. Les nouveaux éléments prendrons bien en compte le CSS lors de leur ajout
    document.body.append(h, m, f);
}

for(let i = 0; i < 5; i++)
{
    const p = document.createElement("p");
    p.textContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A similique itaque, perspiciatis ea minima dolor iste, officiis, labore dignissimos deserunt quibusdam. Veniam, eaque facere cupiditate aperiam qui ducimus numquam incidunt.";
    m.append(p);
}