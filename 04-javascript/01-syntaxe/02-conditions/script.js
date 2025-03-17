"use strict";
/* 
    Math.random() génère un chiffre entre 0 et 1
    Math.floor() arrondi a l'inferieur
*/
const x = Math.floor(Math.random())*100;
console.log(x);

/*  Une condition commencera forcement par un "if" suivi de parenthèse.
Dans ces parenhèses se trouveron la condition à vérifier.
Si elle est 

*/
if (x < 50) 
{
    console.log("x est plus petit que 50");
}
else if (x > 50) 
{
    console.log("x est plus grand que 50");
}
else
 {
    console.log("x vaut 50")
 }

if (x < 50) 
    console.log("x est plus petit que 50");
else if (x > 50) 
    console.log("x est plus grand que 50");
else
    console.log("x vaut 50");

const message1 = x<=50?"x est plus petit ou égale à 50":"x est plus grans que 50";
console.log(message1);
const message2 =
    x < 50 ? 
        "x est plus petit que 50" :
    x > 50 ? 
        "x est plus grand que 50" :
        "x vaut 50";
console.log(message2);
let a, b = undefined, c = null, d = "J'aime la pizza";
console.log(
    a ?? "Coucou de a",
    b ?? "Coucou de b",
    c ?? "Coucou de c",
    d ?? "Coucou de d"
);
 const obj = {info: "cet objet est un exemple", superinfo: {a: "rien a dire"}},
    obj2={},
    obj3 = null;
    
console.log(
    obj.info,
    obj.superinfo.a,
    obj.fake?.info,
    obj2.superinfo?.a,
    obj3?.info
);

const ville =prompt("De quelle ville venez-vous?");
console.log(ville);

ville = ville??"sans réponse";


switch(ville.toLowerCase())
{   case "bordeaux" :
    case "lille":
        console.log("C'est trop bien");
        break;
    case "paris":
        console.log("C'est pas bien");
        break;
    default:
        console.log("Je ne connais pas")
}