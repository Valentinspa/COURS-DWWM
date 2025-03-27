"use strict"; 
/* 
    Exemple du risque de innerHTML, attaque XSS
    écrire dans l'input :
    
    <p onclick=alert("hack")>clique moi !</p>
*/
const uI = document.querySelector('#userInput');
const testZ = document.querySelector('.testZone');

// * Dangereux
uI.onchange = ()=>testZ.innerHTML = uI.value;    
// * Safe
// uI.onchange = ()=>testZ.textContent = uI.value;

/* 
    Avec innerHTML l'utilisateur peu insérer son propre code.
    Avec textContent il ne peut pas.
*/