"use strict";
/* 
    Lorsque nous codons en JS nous somme par défaut dans l'objet window
*/
console.log(window, parseInt("45"), window.parseInt("45"), window.fetch(""));
/* 
    Le mot clef "this" représente par défaut, l'objet dans lequel nous nous trouvons.
    Donc ici, il vaut l'objet window :
*/
console.log(this);

function showThis()
{
    console.log(this);    
}
/* 
    Dans une fonction appelé ainsi, 
    "this" vaudra "undefined" si "use strict" est utilisé
    Sinon il vaudra encore une fois "window"
*/
showThis();
/* 
    Mais "this" ne sera que rarement utilisé dans ces cas là.
    On va commencer à le voir utiliser dans le cas des eventListener.
    Dans ces cas là, il vaudra l'élément HTML sur lequel est placé l'écouteur d'évènement
*/
document.body.addEventListener("click", showThis);
/* 
    Cela diffère de "event.target" qui lui retourne l'élément HTML sur lequel l'évènement a eu lieu,
    ce qui dans le cas d'un clique, peut grandement varier :
*/
document.body.addEventListener("click", function(e){
    console.log("anonyme", this, e.target);
});
/* 
    !Attention, dans le cas d'une fonction fléché, la valeur de this change.
    Il devient égale à l'objet englobant, (ici window)
*/
document.body.addEventListener("click", ()=>{
    console.log("fléché", this);    
});

document.body.click();
/* 
    La méthode ".bind()", cette méthode crée une copie d'une fonction,
    Mais dans laquelle, la valeur de "this" aura changé.
    Dans cette copie, "this" prendra comme valeur, le paramètre de "bind"
*/
const bindedThis = showThis.bind("Coucou tout le monde !");
bindedThis();

const span = document.querySelector("span");
document.body.addEventListener("click", showThis.bind(span));
document.body.click();