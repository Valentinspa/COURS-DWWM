/*
    ---------------- EXO 1 --------------------
    1. Rendre tous les paragraphes du main, invisible (js ou css).
    2. Ajouter Une observation sur chaque paragraphes.
    3. Lorsque l'élément est au moins à moitié dans le viewport, le rendre visible.
    4. Désactiver la détection de l'élément une fois l'action terminé.
    (Bonus). Faire venir le paragraphe depuis le côté.
    ---------------- EXO 2 ----------------------
    1. Lorsque le dernier paragraphe est à 200px en dessous du viewport.
        Créer 10 paragraphes et les ajouter à la suite du main (de simple paragraphes avec du lorem).
    2. Désactiver la détection du dernier paragraphe.
    3. Ajouter l'animation de l'exercice 1 aux nouveaux paragraphes.
    4. Ajouter la détection du dernier paragraphe au nouveau dernier paragraphe qui vient d'être ajouté.
*/

//TODO EXO 1

//1
const 
    p = document.querySelectorAll("main p"),
    main = document.querySelector("main"),
    options = {
        threshold: 0.5
    };
for(let i = 0; i < p.length; i++){
    p[i].style.opacity = 0;
    
};
//2
function para() {
    console.log("paragraphe")
};
const observer = new IntersectionObserver(para,options);

p.forEach((i) => observer.observe(i));

//3
function para(entries){
    
    for (let para = 0; para < entries.length; para++) {
        const entry = entries[para];
        if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        //4
        observer.unobserve(entry.target);  
        }    
    }
    
}
 


