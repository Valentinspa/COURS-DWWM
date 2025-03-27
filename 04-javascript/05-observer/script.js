"use strict";

const 
    indicator = document.querySelector(".scroll-indicator"),
    main = document.querySelector("main"),
    options = {
        /* 
            Indique sur quel défilement l'observer se base.
            Par défaut celui du viewport, mais on pourrait lui indiquer de se baser le défilement d'un élément HTML.
        */
        // root: main
        /* 
            Permet de déplacer où se fait la détection.
            Par défaut c'est le bord du viewport qui sert de détecteur.
            Mais en indiquant une valeur positive, la détection se fera avant d'être dans le viewport.
            Et une valeur négative poussera la détection à l'interieur du viewport
        */
        // rootMargin: "-150px"
        /* 
            Permet d'indiquer un pourcentage (sous forme 0 à 1) de l'élément observé qui doit être visible pour déclencher la détection.
        */
        // threshold: 0.02
    };

/* 
    L'intersection observer permet de détecter l'entrée ou la sortie d'un élément HTML du viewport (typiquement, au scroll)
    Il prendra deux arguments, une fonction callback et un objet contenant ses options.

    Ici nous allons l'utiliser pour activer ou désactiver un écouteur d'évènement.
    lorsque le main sera visible, nous activerons l'écouteur.
    lorsqu'il ne sera plus visible, nous désactiveront l'écouteur.
*/
const observer = new IntersectionObserver(setIndicator, options);
/* 
    Après avoir déclaré notre observer, nous devons lui indiquer quel élément html il doit observer.
    Ici je lui indique d'observer le main sélectionné précédement.
*/
observer.observe(main);

function setIndicator(entries)
{
    console.log(entries);    
    /* 
        l'intersection observer m'envoi un tableau contenant les éléments observés qui viennent d'être détecté.
        Au chargement de l'observer, il envoi un premier tableau contenant tous les éléments afin d'indiquer si ils sont détecté ou non.
        * Ici je n'observe qu'un seul élément, donc pour ne pas à avoir à traiter avec un tableau, je vais récupérer son premier élément :
    */
    const entry = entries[0];
    /* 
        L'objet "entry" contient plusieurs informations liées à la détection.
            target : l'élément détecté
            isIntersecting : Un boolean indiquant si l'élément est visible ou non
            intersectingRatio : un pourcentage (Entre 0 et 1) de l'élément visible lors de la détection
            boundingClientRect: la position et la taille de l'élément observé
            intersectionRect: la position et la taille visible de l'élément observé
            rootBounds : la position et la taille de l'élément racine (par défaut le viewport)
    */
    console.log(entry);
    if(entry.isIntersecting)
    {
        console.log("main est visible");  
        window.addEventListener("scroll", indicatorAnimation);      
    }else
    {
        console.log("main est caché");  
        window.removeEventListener("scroll", indicatorAnimation);       
    }
    
}
// Cette fonction est juste liée à l'animation au scroll.
function indicatorAnimation() 
{
    console.log("SCROOOOLLLLL!!!", window.scrollY);
    /* 
        scrollY représente le nombre de pixel qui ont été défillé.
        offsetTop représente le nombre de pixel entre le haut de la page et mon élément.
    */
    if(window.scrollY > main.offsetTop)
    {
        // console.log("true");
        /* 
            scrollHeight représente la hauteur total de l'élément incluant sont padding vertical.
            .toFixed(n) retourne le nombre le précédent, sous forme de string avec "n" chiffres après la virgule.

            Notre calcul permet d'obtenir le pourcentage du main ayant été scrollé.
        */
        const prc = ((window.scrollY - main.offsetTop)/main.scrollHeight).toFixed(2);
        console.log(prc);
        indicator.style.transform = `scaleX(${prc})`;        
    }else
    {
        indicator.style.transform = "scaleX(0)";
    }
}

// Si on souhaite arrêter d'observer un élément :
// observer.unobserve(main);
// On peut aussi arrêter toute les observations d'un coup:
// observer.disconnect()

// On trouvera un autre objet ressemblant, le "MutationObserver" qui lui détecte les changements dans le DOM