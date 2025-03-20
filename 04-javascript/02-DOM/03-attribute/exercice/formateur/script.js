/* 
    Exercice 1 :
    Changer la taille de chaque paragraphe du main.
    chaque paragraphe doit être plus gros que le précédent.
*/
const ps = document.querySelectorAll('.step');

for(let i = 0; i<ps.length; i++)
{
    ps[i].style.fontSize = 16 + i +"px";
}


/* 
    Exercice 2 :
    Faite apparaître la modale via une transition depuis la gauche. 
*/
const aside = document.querySelector('aside');
if(aside)
{
    aside.style.transition = "left 1s linear";
    aside.style.left = "50%";
    aside.style.top = "50%";
}
/* 
    Exercice 3 :
    Faite que la couleur de fond de la modale soit aléatoire à chaque rechargement de la page.
*/

const modal = aside.querySelector('div');

function randColor()
{
    return `rbg(${randNumber(255)},${randNumber(255)},${randNumber(255)})`;
}
function randNumber(max)
{
    return Math.round(Math.random()*max);
}
modal.style.backgroundColor = randColor();