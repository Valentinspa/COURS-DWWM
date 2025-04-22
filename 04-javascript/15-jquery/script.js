"use strict";

/* 
    $("") sert à la fois de querySelectorAll et de createElement.
    $("div") selectionne toute les div.
    $("<div>") crée une nouvelle div.
*/
const btnSlide = $("#slide");
console.log(btnSlide);
// Peu importe qu'il y ai un ou plusieurs résultats, il sera rendu sous forme d'objet.
// Mais pas besoin de faire de boucle, jquery s'en occupe tout seul.
btnSlide.on("click", slideTitle);
// .on correspond au addEventListener

function slideTitle()
{
    /* 
        Certains effets classique de CSS sont géré par défaut par jquery:
            fade, slide, hide
        Pour cela on utilisera les methodes correspondante :
            slideIn(), slideOut(), slideToggle()
        On pourra optionnellement, ajouté une durée ou une fonction à lancer après que l'animation soit terminé.
    */
    $("h1").slideToggle(500, function()
    {
        console.log("Animation Terminé");
        // pour modifier le CSS, j'utiliserai la méthode .css()
        btnSlide.css("background-color", "green");
        // Si je ne lui donne qu'un seul argument, il me retournera la valeur de la propriété :
        console.log(btnSlide.css("background-color"));        
    });
}
// document.querySelector("#fade").addEventListener("click", fadeSpan);
$("#fade").on("click", fadeSpan);
function fadeSpan() 
{
    // document.querySelectorAll("h1 span").forEach(span=>{span.style.opacity = span.style.opacity === ""?"0":""})
    $("h1 span").fadeToggle();
}

$("h1 span").on("mouseenter mouseleave", function(e){
    if(e.type === "mouseenter")
    {
        $(this).css("font-size", "4em");
    }
    else
    {
        $(this).css("font-size", "");
    }
});
/* 
    $(function(){}) ou dans les versions plus anciennes 
        $("document").ready(function(){})
    représente document.addEventListener("DOMContentLoaded", function(){})
    un évènement qui se lance une fois que tout le HTML est chargé.
*/
$(function()
{
    $("#load").on("click", function(){
        $("ol").hide(200);
        // $.ajax correspond au fetch
        $.ajax("liste.json")
            //.then()
            .done(data=>{
                data.forEach(d=>{
                    /* 
                        const li = document.createElement("li");
                        li.textContent = d;
                        document.querySelector("ol").append(li);
                    */
                    $("<li>").text(d).appendTo($("ol"));
                })
                $("ol").show(500);
            })
            //.catch()
            .fail(err=>console.error("err"))
            //.finally()
            .always(()=>console.log("requête terminé !"));
    });
})

$("#anime").on("click", function(){
    $(this).css("position", "absolute");
    // La version animate de jquery prendra en premier argument, un objet, et en second la durée
    $(this).animate({
        width: "50vw",
        height: "5rem",
        top: "+=50px",
        left: "-=50px"
    }, 500);
})