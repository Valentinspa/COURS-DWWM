"use strict";

function test(event)
{
    console.log("Coucou", event);    
}

const h1 = document.querySelector('header > h1');
/* 
    Pour ajouter un écouteur d'évènement, nous avons deux possibilités :
    Soit elementHTML.addEventListener("nomEvent", fonction)
    Soit elementHTML.onNomEvent = fonction

    Le nom des évènements sont toujours en minuscule.

    Pour retirer un évènement, on pourra utiliser :
        elementHTML.removeEventListener("nomEvent", fonction);
        elementHTML.onNomEvent = "";

    Les écouteurs d'évènement passent toujours en paramètre de la fonction callback, un objet correspondant à l'évènement écouté.
    On pourra y récupérer plusieurs informations correspondant à cet évènement.
    Par exemple sur un clique, la position de la souris, l'élément cliqué...
*/
h1.addEventListener("click", test);

h1.onclick = test;

h1.removeEventListener("click", test);

h1.onclick = "";
/* 
    Si une fonction anonyme est placé en paramètre d'un addEventListener.
    Il n'est pas possible d'utiliser "removeEventListener"
*/
h1.addEventListener("click", function(e) 
{
    let r = Math.floor(Math.random()*360);
    /* 
        le ".target" de l'objet "Event" permet de récupérer la cible de l'évènement.
        Attention, pour un click, la cible est l'élément cliqué.
        Si il y avait un span dans mon H1, si je clique dessus, la ligne suivante s'appliquerait au span et non au H1
    */
    e.target.style.transform = `rotate(${r}deg)`;
    // h1.style.transform = `rotate(${r}deg)`;
    /* 
        this, représente par défaut, l'élément HTML sur lequel a été placé l'écouteur d'évènement, ici H1.
        !attention, this ne fonctionne pas, si il est dans une fonction fléché ()=>{}
    */
    // this.style.transform = `rotate(${r}deg)`;
});
/* 
    Il est possible d'ajouter autant d'écouteur d'évènement sur un même évènement que l'on souhaite avec addEventListener.
    Par contre, avec ".onclick", on ne peut mettre qu'une seule fonction
*/
// ? Input et change event
/* 
    Lorsque vous créer votre code, la première chose à faire, est de réfléchir à quel sont les éléments avec lesquels vous allez interragir, et de les sélectionner
*/
const input1 = document.querySelector('.div1 input');
const btn1 = document.querySelector('.div1 button');

/* 
    Ensuite je peux penser à quels sont les types d'évènements que je souhaite écouter.
    Par exemple ici, je veux écouter le fait que l'utilisateur tape dans l'input.
    Deux choix possible ici, l'évènement "input" ou l'évènement "change"

    "input" se déclenchera à chaque touche entré (dans le cas d'un champ textuel)
    "change" se déclenchera une fois le champ validé (lorsqu'on le quitte)
*/
input1.addEventListener("input", e=>{
// input1.addEventListener("change", e=>{
    console.log(e.target.value, input1.value, this.value);  
    if(e.target.value != "")
    {
        btn1.textContent = e.target.value;
    }
    else
    {
        btn1.textContent = "Clique moi !";
    }
});
// ? Options supplémentaires
/* 
    l'option "once" permet que l'écouteur d'évènement ne se déclenche qu'une seule fois.
*/
btn1.addEventListener("click", ()=>{h1.textContent = input1.value}, {once: true});

const div4 = document.querySelector('.div4');
const gp = div4.querySelector('.grandParent');
const pa = div4.querySelector('.parent');
const en = div4.querySelector('.enfant');
/* 
    Si plusieurs écouteurs d'évènements doivent être déclenché par une même action.
    Ce sera d'abbord l'enfant le plus profond puis cela remontera jusqu'au parent le plus élevé

    Le navigateur va d'abbord capturer pour lister les évènements qui doivent se déclencher, du parent vers l'enfant.
    Puis remonter en déclenchant les évènements.

    On peut indiquer au navigateur d'activer un évènement lors de la phase de capture avec l'option "capture: true"
*/
div4.addEventListener("click", ()=>{console.log("div4")}, {capture: true});
gp.addEventListener("click", ()=>{console.log("gp")});
pa.addEventListener("click", (event)=>{
    console.log("pa");
    // permet de stopper la suite d'évènement ici.
    event.stopPropagation();
});
en.addEventListener("click", ()=>{console.log("en")});

const menu5 = document.querySelector('.menu5 a');
menu5.addEventListener("click", event=>{
    /* 
        preventDefault() permet d'annuler l'effet par défaut d'un évènement.
        le changement de page d'un lien, la soumission d'un formulaire...
    */
    event.preventDefault();
    console.log("Coucou le monde !");    
});