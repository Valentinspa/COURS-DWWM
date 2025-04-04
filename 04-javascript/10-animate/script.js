"use strict";
const div = document.querySelector('.anime');
document.querySelector(".b1")?.addEventListener("click", animation1);
document.querySelector(".b2")?.addEventListener("click", animation2);
document.querySelector(".b3")?.addEventListener("click", animation3);
document.querySelector(".b4")?.addEventListener("click", animation4);
document.querySelector(".b5")?.addEventListener("click", animation5);

function animation1(){

    /* 
        La méthode "animate" prend deux arguments.
        Le premier est la liste des keyframes que l'élément HTML devra parcourir.
        Le second est un objet contenant les options de l'animation.

        les keyframes peuvent prendre deux formes, la première est un tableau d'objet :
    */

    const keyframes = [
        {left: 0, top: 0},
        {left: "80%", top: "-200px"},
        {left: "20%", top: "500px"}
    ];
    const options = {
        duration: 2000,
        iterations: 3,
        fill: "forwards",
        direction: "alternate"
    };
    div.animate(keyframes, options);
}
function animation2(){

    // les keyframes peuvent être aussi un objet contenant des tableaux:

    const keyframes = {
        backgroundColor:  ["blue", "red", "green"],
        opacity: [1, 0.1, 0.5]
    };
    div.animate(keyframes, {duration: 2000, direction: "alternate", iteration: 2});
}
function animation3(){

    // On peut récupérer l'objet "animate" afin d'avoir accès à de nouvelles fonctionnalités :

    const anime = div.animate({transform: ["skew(0, 0)", "skew(360deg, 180deg)"]}, {duration: 500, iteration: 1});

    console.log(anime);
    anime.addEventListener("finish", function(){
        document.querySelector(".b4").style.opacity = 1;
    });   
}
let a4 = false
function animation4(){
    if(!a4)
    {
        a4 = div.animate({borderRadius: [0, "50%", "5px", "25%"]}, {duration: 3000, fill: "forwards"});
    }else
    {
        // On peut utiliser la méthode cancel() pour annuler une animation
        a4.cancel();
        a4 = false;
    }   
}
// la méthode "animate" est un raccourci pour l'utilisation des objets suivants :
const keyframes = new KeyframeEffect(
    div,
    [
        {transform: "translate(0,0)"},
        {transform: "translate(100%, 50%)"}
    ],
    {duration: 3000, fill: "forwards"}
);
const anime5 = new Animation(keyframes, document.timeline);
 async function animation5(){
    const btn5 = document.querySelector('.b5');
    console.log(anime5);
    switch(anime5.playState)
    {
        case "idle":
            anime5.play();
            btn5.textContent = "Pause";
            await anime5.finished;
            btn5.textContent = "Reverse";
            break;
        case "running":
            anime5.pause();
            btn5.textContent = "Continue";
            break;
        case "paused":
            anime5.play();
            btn5.textContent = "Pause";
            break;
        case "finished":
            anime5.reverse();
            btn5.textContent =  "Pause";
            await anime5.finished;
            btn5.textContent = "start";
            break;
    }
    
}
//https://codepen.io/rachelnabors/details/PNYGZQ