"use strict"

const copyright = document.querySelector('footer span');
const mainTime = document.querySelector('main time');
const mainBtn = document.querySelector('main button');
const progress = document.querySelector('.progress');

const date = new Date();
console.log(date);

copyright.textContent = date.getFullYear();
// Je récupère l'heure, les minutes et les secondes
mainTime.textContent = date.toLocaleTimeString();

function timer()
{
    const date2 = new Date();
    mainTime.textContent = date2.toLocaleTimeString();
    //console.log("Coucou");
    
}

let idInterval = setInterval(timer, 1000);
console.log(idInterval);

mainBtn.addEventListener("click", ()=>{
    // permet d'arrêter l'interval dont l'id est fourni en argument.
    clearInterval(idInterval);
});

let idTimeOut = setTimeout(()=>{console.log("Coucou en retard !")}, 3000);
// permet d'arrêter un timeout.
clearTimeout(idTimeOut);

let w = 0;

function load()
{
    console.log(w);
    if(w===100)return;
    w++;
    progress.style.width = w+ "%";
    setTimeout(load, 100);
}
load();