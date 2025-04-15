"use strict";
/* 
    Un élément personnalisé (custom element) est une balise HTML que nous allons créer nous même.

    Il en existe deux types, le premier étant l'élément personnalisé autonome

    Il sera représenté par une classe qui hérite de "HTMLElement".

    Pour la déclaré nous allons utiliser :
        * customElements.define("nom-balise", classeDeLaBalise);

    On placera un tiret dans le nom de notre balise afin d'éviter de futur conflit avec de nouvelles balises HTML qui pourraient arriver.
*/
export class SuperBalise extends HTMLElement
{
    constructor()
    {
        super();
        this.info = document.createElement("div");
        this.info.textContent = this.getAttribute("text")||"rien à dire";
        this.append(this.info);
        this.addEventListener("mouseenter", this.toggle);
        this.addEventListener("mouseleave", this.toggle);
        this.initStyle();
    }
    toggle()
    {
        if(this.info.style.display === "none")
            this.info.style.display = "";
        else
            this.info.style.display = "none";
    }
    initStyle()
    {
        /*  if(document.querySelector("[href='monSuperStyle.css']"))return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "monSuperStyle.css";
        document.head.append(link); */
        this.style.fontWeight = "bold";
        this.style.color = "red";
        this.style.position = "relative";
        const {info} = this;
        // const info = this.info;
        info.style.position = "absolute";
        info.style.bottom = "-3em";
        info.style.right = "-1em";
        info.style.border = "2px solid blue";
        info.style.borderRadius = "5px";
        info.style.backgroundColor = "rgba(0,0,255, 0.4)";
        info.style.color = "yellow";
        info.style.display = "none";
    }
}

customElements.define("super-balise", SuperBalise);