"use strict";

/* 
    Par défaut, toute programmation en JS est synchrone.
    C'est à dire que chaque instruction attend la fin de la précédente avant de s'executer.
    On a pu voir avec fetch l'arrivé de l'asynchrone.
*/

for (let i = 0; i < 1_000_000_000; i++) 
{
    if(i === 999_999_999)console.log("Synchrone : Fin boucle");    
}
console.log("Synchrone : Après la boucle");
/* 
    En asynchrone, (comme avec fetch),
    La code continue de s'executer pendant que la partie asynchrone fonctionne.
    Ici le console.log après le fetch s'executera avant celui dans le fetch.
*/
fetch("test.json").then(function(){
    for (let i = 0; i < 1_000_000_000; i++) 
    {
        if(i === 999_999_999)console.log("Asynchrone : Fin boucle");    
    }
});
console.log("Asynchrone : Après la boucle");

/* 
    Une fonction peut ne rien retourner (undefined)
    Ou retourner une valeur, (number, string, object...)
    Dans le cas de fetch, il retourne bien quelque chose.
*/
const request = fetch("test.json");
// Il retourne un objet "promise"
console.log(request);
// C'est cet objet sur lequel on utilise ".then()", ".catch()" ou ".finally()"
// qui respectivement s'enclenchent si la promesse est "tenue (réussite)", "rejeté (échoué)" ou "traité (terminé qu'elle soit réussite ou échouée)"

request.then(function(){console.log("promesse réussite");});
request.catch(()=>{console.log("promesse échoué");});
request.finally(()=>console.log("promesse terminée"));
// ici j'utilise catch et finally sur request, mais chacun d'entre eux retourne eux même la promesse, donc je pourrait les enchainer
// request.then().catch().finally();

const r1 = fetch("test.json");
const r2 = fetch("index.html");
// Il est posssible de résoudre plusieurs promesse en même temps.
Promise.all([r1, r2]).then(function(resultat){
    // Promise.all() prend un argument un tableau de promesse et en résultat fourni un tableau contenant les différents résultat des promesses
    console.log(resultat);
    resultat.forEach(function(res){
        if(res.ok)
        {
            res.text().then(function(data){
                // console.log(data);                
            })
        }
    })
}); 
/* 
    Il existe aussi "Promise.race()" et "Promise.any()" qui prennent aussi en paramètre un tableau de promesse.
    Mais qui ne rendront que la plus rapide à s'executer.
        .race() va déclencher le catch si la promesse la plus rapide a échouté.
        .any() va déclencher le catch, si toute les promesses ont échouées.

        On peut créer nos propres promesses.
        Celles-ci prendront en paramètre, une fonction callback.
*/
const randomPromise = new Promise(maPromesse);
/* 
    la fonction callback d'une promesse recevra deux paramètres.
    Ces deux paramètres sont des fonctions callback qui représente respectivement, la fonction à déclencher pour le ".then()" et celle à déclencher pour le ".catch()"
*/
function maPromesse(resolve, reject) 
{
    const r = Math.floor(Math.random()*10);
    if(r<5)
    {
        resolve("Promesse validé, r est plus petit que 5");
    }
    else
    {
        reject("Promesse échouée, r est plus grand ou égale à 5");
    }
}

randomPromise
    .then(res=>console.log("then", res))
    .catch(err=>console.log("catch", err))
    .finally(()=>console.log("finally", "mon random est terminé"));

// exemple :
burger1();
function burger1()
{
    console.clear();
    pain1();
    sauce1();
    viande1();
    salade1();
    console.log("le burger est terminé");
}
function pain1()
{
    setTimeout(()=>console.log("Le pain est grillé et placé"), 1000);
}
function sauce1()
{
    console.log("La sauce est versé");
}
function viande1()
{
    setTimeout(()=>console.log("La viande est cuite et placé"), 3000)
}
function salade1()
{
    console.log("la salade est placé");
}
// avec promesse :
burger2();
// Problème, on se retrouve dans un callback hell.
function burger2(){
    pain2().then(pain=>{
            console.log(pain);
            sauce2().then(sauce=>{
                console.log(sauce);
                viande2().then(viande=>{
                    console.log(viande);
                    salade2().then(salade=>{
                        console.log(salade);
                        console.log("burger 2 : Le burger est terminé");
                    })
                })
            })
        })
}
function pain2()
{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("burger 2 : Le pain est grillé et placé");
        }, 1000)}
    );
}
function sauce2()
{
    return new Promise((resolve)=>{
        resolve("burger 2 : La sauce est versé");
    });
}
function viande2()
{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("burger 2 : La viande est cuite et placé");
        }, 3000)}
    );
}
function salade2()
{
    return new Promise((resolve)=>{
        resolve("burger 2 : la salade est placé");
    });
}