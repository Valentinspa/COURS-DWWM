"use strict";
// Un commentaire sur une ligne
/*
    Un commentaire
    sur plusieurs lignes (alt + shift + a)
*/
// ? Déclaration des variables
/* 
    Il existe trois mots clefs pour déclarer les variables.
    Les noms des variables peuvent contenir n'importe quelle lettres ou chiffres, mais ne peuvent pas commencer par un chiffre
*/
let banane;
// let estv le mot clef le plus conseillé pour déclarer une variable.
console.log("Contenu de banane :", banane);
//  la fin d'une instruction en JS, se fait soit par un saut à la ligne, soit par un ";"
var tomate;
// var était l'unique déclaration de variable avant 2016

const cerise = 5 ;
// const peremet de déclarer une variable dont la valeur ne changera pas.
// Tenter de la changer, provoque une erreur. On doit indiquer sa valeur, dès la déclaration.
// cerise = 1;

let a, b, c;
let d = 1, e, f = 12;
// On ne peut pas redéclarer une variable qui à déja été déclarer.
//let d;
// Pour changer sa valeur, on ne renet pas le mot clef, qui est là juste pour la déclaration.
d = 2;

// La portée des variables.

let glet = 1;
var gvar = 1;
//Il est possible de créer des blocs de code avec {}, rarement utile seul, ils le seront ici pour parler de la porter des variables.
{
    let hlet = 2;
    var hvar = 3;
    console.log(glet, gvar,hlet, hvar);
    // Les variables déclarés dans un bloc, sont accessible depuis ce bloc et dans leurs enfants.
    {
        console.log(glet, gvar,hlet, hvar);
    }
}
// Une variable déclaré en "let" dans un bloc, n'existera que dans celui ci. En "var", elle sera accesible partout.
// console.log(glet, gvar,hlet, hvar);
console.log(glet, gvar,hlet, hvar);

{
    let glet = 5;
    var gvar = 5;
    console.log("dans le bloc :", glet, gvar);
}
/* 
    Il est possible de redéclarer des variables, si elles sont dans un bloc différent.
    en let ce sera une variable différente, qui n'existera que dans son bloc.
    en var, cela viendra remplacer la variable d'origine.
*/
console.log("hors du bloc :", glet, gvar);

// Types de variable.

let num = 5,
    str = "Coucou",
    bol = true
    arr = [],
    obj = {},
    und;

console.log("Num", typeof num); // type number
console.log("str", typeof str); // type string
console.log("arr", typeof bol); // type boolean
console.log("obj", typeof arr); // type object
console.log("und", typeof obj); // type object
console.log("und", typeof und); // type undefined

// particularité de JS, les tableaux (array) sont des objets.

// javascript est un langage non typé, c'est à dire, que mes variables peuvent changer de type à tout moment :
bol= 42;
console.log("bol MAJ", typeof bol);

// Chaine de caractères (string)
// On peut déclarer nos strings avec 3 caractères différents "" '' ``
let s1 = "Coucou",
    s2 = 'Coucou',
    s3 = `Coucou`;

s1 = "L'apostrophe ne pose pas de problème ici";
s2 = 'L\'apostrophe pose problème ici, je dois l\'échapper avec \\';
console.log(s1, s2);
s1 = 'Le grand ordinateur a dit "42"';
s2 = "Le grand ordinateur a dit \"42\"";
console.log(s1, s2);

s1 = "Je ne peux pas sauter de ligne";
s2 = 'Je ne peux pas sauter de ligne';
s3 = `Je peux
sauter à la ligne`;

s1 = "Karl";
// En JS, la concaténation se fait avec "+";
s2 = "Bonjour" + s1 + "Comment ça va ?";
console.log(s2);
// En JS l'interpolation se fait avec "${}" uniquement dans un string avec ``
s3 = `Bonjour ${s1} Comment ça va ?`;
s2 = "Bonjour ${s1} Comment ça va ?";
console.log(s3, s2);

// les Nombres (number)

console.log(24, 3.14);
// Si on veut faciliter la lecture des grands nombres, on peut espacer ceux-ci avec "_"
console.log(123_456_789);
// JS peut prendre en précision avec les très grand nombres:
console.log(9_999_999_999_999_999);
// Il existe aussi certains mystères comme :
console.log(0.2 + 0.1);

console.log(
    5+5,
    5-5,
    5*5,
    5/5,
    5%5,
    5**5
);
// représente un modulo, le reste d'une division.
// ** représenter une puissance, 2**3 signifie 2*2*2

// ATTENTION L'addition et la concaténation utilisent le même symbole 
console.log(
    5 + "5",
    5 - "5",
    5 + "Banane",
    5 - "Banane"
);
// Si JS ne comprend pas comment faire un calcul, il affiche NaN (Not a Number)
console.log("Type de NaN", typeof NaN);
//Il existe une fonction qui permet de vérifier si un calcul retourne "NaN" :
console.log(isNaN(5-"Chausette"), isNaN(5-"2"));
// Il existe un mot clef représentant un nombre infini :
console.log(Infinity)

let n = 0;
// Il est classique de vouloir changer la valeur d'une variable en ajoutant, soustrayant... un autre nombre.
// n = n + 5;
// plutôt que de réécrire toute l'opération, on peut indiquer l'opération suivi d'un égale et du chiffre :
n += 5; // 0 + 5
n -= 2; // 5 - 2
n *= 3; // 3 * 3
n /= 4; // 9 / 4
n %= 3; // 2.25 * 2.25
n **=2; //
console.log(n);

// il est encore plus classique, de vouloir augmenter de 1 ou diminuer de 1. On appelle cela l'incrémentation ou la décrémentation.

n++
n--
++n
--n

// D'abbord il envoi le contenu de la variable, puis il l'augmente.
console.log("n++", n++, "n", n);
//D'abbord il augmente la variable, puis il envoi son contenu.
console.log("++n", ++n, "n", n);

n = 17;
// toString() permet de transformer un nombre en string.
console.log(n, n.toString());
// Il peut aussi changer sa base mathématique :
console.log(n, n.toString(2));

//Et a l'inverse on utilisera parseInt();
let s = "10011101";
console.log(s, parseInt(s));
// On peut aussi changer la base mathématique :
console.log(s, parseInt(s,2));

// Les Tableaux (array)

const a1 = [5, "truc", true],
      a2 = new Array(5, "truc", true);
console.log(a1, a2);
/* 
    Dans les tableaux, les éléments sont indéxés par une valeur numérique.
    Elle commencera par 0 pour le premier élément.

    Pour accèder à une valeur du tableau, j'indiquerai son index []
*/
console.log(a1[1]);
// La propriété ".length" permet de connaître la taille d'un tableau
console.log(a1.length);
// Récupérer le dernier élément d'un tableau de longueur inconnu :
console.log(a1[a.length -1]);
// La fonction ".at()" permet aussi de récuperer l'élément à un index donné, mais des nombres négatifs peuvent être données pour compter depuis la fin
console.log(a1.at(-1));
// Les strings fonctionnent un peu comme des tableaux :
console.log("salut"[0], "Salut".at(-1));

// Ajoute un élément à la fin du tableau
a1.push("Bidule");
console.log(a1);
// Retire le dernier élément du tableau
a1.pop();
console.log(a1);
// Ajoute un élément au début du tableau :
a1.unshift("machin");
console.log(a1);
// Retirer au début :
a1.shift();
console.log(a1);
/* 
    .splice permet d'ajouter, supprimer ou remplacer des éléments.
    Le premier paramètre represente l'index auquel interragir.
    Le second, le nombre d'élément à supprimer.
    Les suivants, les éléments à ajouter.
*/
a1.splice(1, 0, "au milieu");
console.log(a1);

const a3s = ["Salut", "Bonjour", "Coucou"];
const a3n = [4, 1, 42, 8, 14];
// Permet de trier les éléments du tableau :
a3s.sort();
console.log(a3s);
// Par défaut, il ne fonctionne guère pour les nombres :
a3n.sort();
console.log(a3n);
/* 
    Pour les tableaux et les objets, JS ne stocke pas le contenu dans les variables. Mais seulement l'adresse de l'objet dans la mémoire de l'ordinateur.
    Donc en indiquant ici a4 = a1, ce n'est pas le contenu du tableau qui est copié, mais l'adresse.
    Par ce fait, modifier l'une des variables, modifiera le tableau pour les deux variables.
*/
const a4 = a1;
console.log(a4);
a4.push("Copie de 01");
console.log(a4, a1);
// Pour obtenir une copie, on devra utilisé le "spread operator" (...).
console.log(a1, ...a1);
// console.log(a1[0], a1[1], a1[2], a1[3], a1[4])
const a5 = [...a1];
console.log(a5);
a5.unshift("Vrai copie !");
console.log(a5, a1);
// Un tableau multidimensionel, est un élément qui contient un autre.
const a6 = ["voiture", "avion", ["chausette", "banane"]];
console.log(a6);
// Pour séléctionner un élément dans un tableau multidimensionel, je demande d'abbord l'index du second tableau, puis l'index de l'élément que je souhaite afficher
console.log(a6[2][0]);
// Il n'y a pas de limite au nombre de tableau :
const a7 =[[[[[["Coucou"]]]]]];
console.log(a7, a7[0][0][0][0][0][0]);

// ? les objets (object)

/* 
    Les objets ont des "propriétés" qui sont des mots suivi de ":"
    et dans ses propriétés, on place des "valeurs" qui peuvent être n'importe quoi (string, number, array...)
*/
const o1 = {nom: "Dupont", prenom: "Maurice",age: 45, loisirs: ["Bowling", "Mahjong"]};
console.log(o1);
// Pour sélectionner une propriété, nous écrirons ".nomPropriété"
console.log(o1.nom, o1.age, o1.loisirs);
// On peut aussi les sélectionnés avec [""]
console.log(o1["nom"], o1["age"], o1["loisirs"]);
console.log(o1.loisirs[0]);
// Ajouter une propriété :
o1.signe = "Balance";
console.log(o1);
// Supprimer une propriété :
delete o1.signe;
console.log(o1);

// les Booleans
// Un boolean est soit "true" soit "false", rien d'autre n'est un boolean
let b1 = true, b2 = false;

// Il existe plusieurs façon de les faire apparaître, par exemple, avec des comparaisons :
// "Plus petit" ou "plus grand"
console.log("1 < 2", 1 < 2);
console.log("1 > 2", 1 > 2);
// "Plus petit ou égale" ou "plus grand ou égale"
console.log("1 <= 2", 1 <= 2);
console.log("1 >= 2", 1 >= 2);
// Est ce que c'est égale 
console.log('1 == "1"', 1 == "1");
// Est ce que c'est strictement égale (le type et la valeur)
console.log('1 === "1"', 1 === "1");
// Est ce que c'est différent 
console.log('1 != "1"', 1 != "1");
// Est ce que c'est strictement différent (le type et la valeur)
console.log('1 !== "1"', 1 !== "1");

console.log("b1:",b1,"b2:", b2);
// le ! devant un boolean, inverse sa valeur
console.log("!b1:",!b1,"!b2:", !b2);

// Pour obtenir "true" avec un AND(&&), il faut que les deux côtés soient "true"
console.log(true && true, true && false, false && false);
// Pour obtenir "true" avec un OR(||) il faut qu'au moins un côté soit "true"
console.log(true || true, true || false, false || false);

// On peut "court-circuiter" un code, c'est à dire empêcher l'execution d'une partie du code avec && et ||
let nb = 0;
// dans le cas d'un "&&" si le premier est faux, le second ne sera pas vérifié
console.log(true && ++nb, nb);
console.log(false && ++nb, nb);
// Dans le cas d'un "||" si le premier est true, le second ne sera pas vérifié.
console.log(true || ++nb, nb);
console.log(false || ++nb, nb);