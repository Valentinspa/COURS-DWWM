 
"use strict";
/* 
    Exercice 1 :
    Changer la taille de chaque paragraphe du main.
    Chaque paragraphe doit être plus gros que le précédent.
    (Exemple: 16px, 18px, 20px, etc.)
*/

const p = document.querySelectorAll('main p');
p.forEach((p, index) => {
    p.style.fontSize = `${16 + index * 2}px`;
});

/* 
    Exercice 2 :
    Faite apparaître aside via une transition depuis la gauche. 
*/

const aside = document.querySelector('aside');
aside.style.transition = 'transform 1s ease';
aside.style.transform = 'translate(150vw, 50vh)'; // Afficher l'aside

/* 
    Exercice 3 :
    Faite que la couleur de fond de la modale soit aléatoire à chaque rechargement de la page.
*/
const div = document.querySelector('div');
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
div.style.backgroundColor = getRandomColor();