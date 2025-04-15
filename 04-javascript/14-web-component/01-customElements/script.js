import { SuperBalise } from "./SuperBalise.js";
import { SuperDiv } from "./SuperDiv.js";

/* 
    Pas besoin de faire de nouvelles instances ou autre.
    Juste l'importé est suffisant.
    * Si besoin on pourra très bien faire un 
        * "document.createElement('super-balise')"
    
    Mais autrement, je peux l'utiliser directement en HTML.
        * <nom-balise></nom-balise>
    Pour un élément personnalisé intégré, on prendra la balise de base avec un attribut "is":
        * <div is="super-div"></div>
*/
adoptSuperDiv()
function adoptSuperDiv()
{
    const iframe = document.querySelector("iframe");
    if(!iframe)return;
    iframe.addEventListener("load", ()=>{
        const maDiv = iframe.contentWindow.document.querySelector("div");
        if(!maDiv)return;
        const fragment = document.adoptNode(maDiv);
        document.body.append(fragment);
    })
}