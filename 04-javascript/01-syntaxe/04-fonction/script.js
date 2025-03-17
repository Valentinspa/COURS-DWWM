"use strict";

salut();
function salut(){
    console.log("salut les gens");
}
salut();

const salut2 = function()
{
    console.log("Salut anonyme !");
}
salut2();
const salut3 = ()=>{
    console.log("Salut fléché !");
}
salut3();
const monObjet = {salut:()=>{console.log("coucou depuis objet")}};
monObjet.salut();

function bonsoir(nom)
{
    console.log("Bonsoir" + nom);    
}
bonsoir("Maurice");
bonsoir();
bonsoir("Maurice", "Pierre");

function bonneNuit(nom1, nom2)
{
    console.log("%cBonne nuit" + nom1+ "et"+ nom2,"backgroud: blue;color: yellow;font-size:40px;");
}
bonneNuit("Maurice", "Pierre");

function goodBye(nom1, nom2="les autres")
{
    console.log(`Goodbye ${nom1} et ${nom2}`);
    if(nom1 === undefined)
    {
        console.error("Veuillez donner au moins un nom");
        console.warn("Un second nom serait bien mais pas obligatoire");
    }
}
goodBye("Maurice", "Pierre");
goodBye("Maurice");
goodBye();

function goodMorning(...noms)
{
    console.table(noms);
    console.log("Good Morning" + noms.toString());
    console.log("Good Morning" + noms.join("et"));
}
goodMorning("Maurice", "Pierre", "Charles");

function insulte(nom)
{
    if(nom === indefined)
    {
        console.error("Veuillez entrer un nom");
        return;
    }
    return nom + "Le Poltron !";
    console.log("fin fonction");
}
insulte();
const newName = insulte("Bob");
console.log(newName);
console.log(insulte("Bil"));

const add = (a,b)=>a+b;
console.log(add(7,8));

function decompte(x)
{
    console.log(x--);
    if(x<0)return;
    decompte(x);
}
decompte(10);

const pr = ["Alice", "Ariel", "Mulan", "Belle"];

pr.forEach(bonsoir);
pr.forEach(function(nom){
    console.log("Bienvenue" + nom);
});

function compliment(maFonction, nom)
{
    maFonction(nom + "Le magnifique");
}
compliment(bonsoir, "Greg");