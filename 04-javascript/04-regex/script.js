"use strict";

/* 
    Les REGEX ou Regular Expression
    Permettent de rechercher la présence de caractères dans un string.

    Une regex commence et se termine par "/" (ou se termine par un flag, voir plus bas dans le cours)
*/

const r1 = /ou/;
const r2 = /[ou]/;
/* 
    En javascript, il existe plusieurs fonctions qui peuvent utiliser les regex,
    Le première que l'on va voir est "maRegex.test(monString);"
    qui retourne un boolean selon si la regex a trouvé ce qui était recherché.

    La première regex va vérifier la présence de "ou" dans le string
*/
console.log(r1, r1.test("Bonjour"), r1.test("Salut"));
// r2 va vérifier la présence d'un des caractères
console.log(r2, r2.test("Bonjour"), r2.test("Salut"));

const r3 = /^ou/;
// ^ indique que cela doit commencer par "ou"
console.log(r3, r3.test("Bonjour"), r3.test("outre"));

const r4 = /ou$/;
// $ indique que cela doit terminer par "ou"
console.log(r4, r4.test("Bonjour"), r4.test("mou"));

const r5 = /ou|oi/;
// | est un "or", ici on veut soit "ou" soit "oi"
console.log(r5, r5.test("Bonjour"), r5.test("Bonsoir"));

const r6 = /[a-z]/;
// const r6 = /[a-zA-Z]/;
// vérifie la présence de caractère entre a et z (donc n'importe quelle lettre de l'alphabet)
console.log(r6, r6.test("Bonjour"), r6.test("0612345678"));

const r7 = /[^a-z]/;
// "^" entre "[]" indique que les caractères ne doivent pas être présent
console.log(r7, r7.test("bonjour"), r7.test("0612345678"));

const r8 = /(ou)?/;
// le "?" indique que l'élément précédent doit être présent 0 ou 1 fois
console.log(r8, r8.test("Bonjour"), r8.test("Pizza"));

const r9 = /(ou)+/;
// Le "+" indique que l'élément précédent doit être présent 1 fois ou plus
console.log(r9, r9.test("Bonjour"), r9.test("Pizza"));

const r10 = /(ou)*/;
// Le "*" indique que l'élément précédent doit être présent 0 fois ou plus
console.log(r10, r10.test("Bonjour"), r10.test("Pizza"));

const r11 = /^(cou){2}$/;
// "{}" avec un chiffre, indique le nombre de fois où l'élément précédent doit apparaître.
console.log(r11, r11.test("coucou"), r11.test("coup"));

const r12 = /(cou){1,3}/;
// Ici j'indique un minimum et un maximum de fois où l'élément doit apparaître.
console.log(r12, r12.test("coucou"), r12.test("coup"));

const r13 = /(cou){2,}/;
// sans chiffre après la virgule, on indique un minimum mais pas de maximum
console.log(r13, r13.test("coucou"), r13.test("coup"));

const r14 = /\^/;
// On peut utiliser "\" pour échapper un caractère et lui faire perdre son effet habituel. Ici je cherche juste "^"
console.log(r14, r14.test("coucou^_^"), r14.test("coucou-_-"));

const r15 = /\s/;
// const r15 = / /;
// Vérifie la présence d'un espace. ("\" peut aussi donner un effet à un caractère qui n'en a normalement pas)
console.log(r15, r15.test("Hello World"), r15.test("Bonjour"));

const r16 = /\d/;
// const r16 = /[0-9]/;
// Vérifie la présence d'un chiffre.
console.log(r16, r16.test("Bonjour 8 fois"), r16.test("Bonjour à tous"));

const r17 = /(ou|oi).*\1/;
// "." signifie n'importe quel caractère
// "\" suivi d'un chiffre, indique que l'on souhaite voir le même contenu qu'une parenthèse précédente.
// Ici, si il trouve un "ou" il veut un autre "ou", si il trouve un "oi" il veut un autre "oi"
console.log(r17, r17.test("Bonjour à tous"), r17.test("Bonsoir à tous"));

// ? Les flags

/* 
    Les flags sont des caractères qui viennent se placer à la fin d'une regex pour lui donner de nouvelles capacités.

    On va les tester sur la méthode "string.match(regex)" qui retourne un tableau contenant les résultats de la regex.
*/
const phrase = "J'aime la pizza, les cannelés et les okonomiyaki";

console.log(phrase.match(/pizza/));
// par défaut, les regex s'arrêtent au premier résultat trouvé
console.log(phrase.match(/les/));
// le flag "g" pour "global" permet de chercher dans tous le string.
console.log(phrase.match(/les/g));

const phrase2 = "Vive les regex et vive javascript !";

// Par défaut, les regex sont sensible à la casse (minuscule ou majuscule)
console.log(phrase2.match(/vive/g));
// le flag "i" pour "insensitive" le rend insensible à la casse (majuscule et minuscule)
console.log(phrase2.match(/vive/gi));

const phrase3 = `1er : Maurice
2ème : Paul
3ème : Charlie`;

// Mon string commence par un chiffre, mais les sauts à la ligne ne sont pas des strings différent. Donc je n'ai qu'un résultat
console.log(phrase3.match(/^\d/g));
// "m" pour "multiple" indique de traiter chaque saut à la ligne comme un nouveau string
console.log(phrase3.match(/^\d/gm));

// ! ATTENTION

const rAlpha = /^[a-zA-Z]+$/;
// Les accents et autres lettres particulières ne sont pas prise comme des lettres entre a et z
console.log(rAlpha.test("Paul"), rAlpha.test("élodie"));
// Si on veut les acceptés, il faut les écrires :
const rAlpha2 = /^[a-zA-Zàéèêûçù]+$/;
console.log(rAlpha2.test("Paul"), rAlpha2.test("élodie"));




