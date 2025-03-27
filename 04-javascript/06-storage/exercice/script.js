"use strict";
/* 
    1. Ajouter un menu de selection qui permettra de choisir entre 3 thèmes.
    2. Appliquer le thème selectionné grâce à JS (pas besoin de thème compliqué)
    3. Faire en sorte que le choix de l'utilisateur soit toujours appliqué lorsqu'il change de page. (que ce soit visible dans le menu de selection autant que dans les couleurs du site.)
    4. Bonus: Faire un bouton qui change aléatoirement les couleurs du site et les sauvegarder.
*/
const select = document.getElementById("select-theme");
const pink = document.getElementById("pink");
const red = document.getElementById("red");
const green = document.getElementById("green");
select.addEventListener("change", changeTheme);
pink.addEventListener("click", changeTheme);
red.addEventListener("click", changeTheme);
green.addEventListener("click", changeTheme);

function changeTheme() {

if (pink.selected){
    document.documentElement.style.setProperty("--fond", "#ffc0cb");
    document.documentElement.style.setProperty("--text", "antiquewhite");
    localStorage.setItem("theme", "pink");
}else if (red.selected) {
    document.documentElement.style.setProperty("--fond", "black");
    document.documentElement.style.setProperty("--text", "#ff0000");
    localStorage.setItem("theme", "red");
}else if (green.selected) {
    document.documentElement.style.setProperty("--fond", "green");
    document.documentElement.style.setProperty("--text", "yellow");
    localStorage.setItem("theme", "green");
}else {
    document.documentElement.style.setProperty("--fond", "");
    document.documentElement.style.setProperty("--text", "");
    localStorage.removeItem("theme");
}

};
pink.selected = localStorage.getItem("theme") === "pink";
red.selected = localStorage.getItem("theme") === "red";
green.selected = localStorage.getItem("theme") === "green";

changeTheme();

button.addEventListener("click", function() {
    const themes = ["pink", "red", "green"];
    const buttonTheme = themes[Math.floor(Math.random() * themes.length)];
    
    if (buttonTheme === "pink") {
        document.documentElement.style.setProperty("--fond", "#ffc0cb");
        document.documentElement.style.setProperty("--text", "antiquewhite");
        localStorage.setItem("theme", "pink");
        pink.selected = true;
        red.selected = false;
        green.selected = false;
    } else if (buttonTheme === "red") {
        document.documentElement.style.setProperty("--fond", "black");
        document.documentElement.style.setProperty("--text", "#ff0000");
        localStorage.setItem("theme", "red");
        pink.selected = false;
        red.selected = true;
        green.selected = false;
    } else if (buttonTheme === "green") {
        document.documentElement.style.setProperty("--fond", "green");
        document.documentElement.style.setProperty("--text", "yellow");
        localStorage.setItem("theme", "green");
        pink.selected = false;
        red.selected = false;
        green.selected = true;
    } else {
        document.documentElement.style.setProperty("--fond", "");
        document.documentElement.style.setProperty("--text", "");
        localStorage.removeItem("theme");
        pink.selected = false;
        red.selected = false;
        green.selected = false;
    }

    select.value = buttonTheme;
});


  
  