"use strict";

/* 
    Le shadow DOM permet de créer un autre arbre DOM séparé du reste du DOM.
    Ce DOM fantôme obéit à ses propres règles, ignorant les scripts et styles appliqués au DOM principal.
    De même les règles qui s'appliquent au shadow DOM ne s'appliquent pas au DOM principal.

    Pour créer un "Hôte Fantôme (shadow host)" il suffit d'appeler sur l'élément HTML choisi la méthode ".attachShadow()"
    elle devra contenir un objet indiquant si le mode est "open" ou "closed".

    Cela permet juste de simplifier ou complexifier l'accès au shadow DOM depuis un script.
*/
const divOpen = document.querySelector('.open');
const divClose = document.querySelector('.close');

const shadowpen = divOpen.attachShadow({mode:"open"});
const shadowclose = divClose.attachShadow({mode:"closed"});

// en mode open, j'ai accès au shadowRoot via l'objet rendu par "attachShadow" ou via la propriété ".shadowRoot" sur mon hôte.
console.log(shadowpen, divOpen.shadowRoot);
// en mode closed, je n'ai accès au shadowRoot qu'avec l'objet rendu par "attachShadow"
console.log(shadowclose, divClose.shadowRoot);

// Une fois créé, je peux traiter mon shadowRoot comme si il était un body normal:
const style1 = document.createElement("style");
style1.textContent = /* CSS */
`
    :host{text-align:center;}
    h1{background-color:black;}
`;
const h01 = document.createElement("h1");
h01.textContent = "Je vois des fantômes dans les ombres.";
shadowpen.append(style1, h01);
// Le selecteur :host représente l'hôte du shadow DOM, donc ici la div.open
const style2 = document.createElement("style");
style2.textContent = /* CSS */
`
    :host{text-align:right;}
    h1{text-shadow: 5px 5px 5px red;}
`;
const h02 = document.createElement("h1");
h02.textContent = "Mon ombre cache un fantôme";
shadowclose.append(style2, h02);

// Ici seul le h1 hors du shadowDOM est trouvé.
const hx = document.querySelectorAll("h1");
console.log(hx);
// Si je veux selectionner un élément dans le shadowDOM, je dois le faire à partir de celui ci:
const hShadow = shadowpen.querySelectorAll("h1");
console.log(hShadow);

import { SuperBalise } from "./SuperBalise.js";

