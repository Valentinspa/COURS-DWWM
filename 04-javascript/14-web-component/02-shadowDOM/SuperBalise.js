"use strict";

export class SuperBalise extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow = this.attachShadow({mode:"open"});
        this.info = document.createElement("div");
        // Je transfère le texte dans la balise vers le shadowDOM
        this.shadow.textContent = this.textContent;
        this.textContent = "";
        this.info.textContent = this.getAttribute("text")||"rien à dire";
        this.shadow.append(this.info);

        this.initStyle();
        this.addEventListener("mouseenter", this.toggle);
        this.addEventListener("mouseleave", this.toggle);
    }
    initStyle()
    {
        const style = document.createElement("style");
        this.shadowRoot.append(style);
        style.textContent = /* CSS */
        `
        :host{
            font-weight: bold;
            color: red;
            position: relative;
        }
        div
        {
            position: absolute;
            bottom: -3em;
            right: -2em;
            border: 2px solid blue;
            border-radius: 5px;
            background-color: rgba(0,0,255,0.7);
            color: yellow;
            display: none;
        }
        `;
    }
    toggle()
    {
        if(this.info.style.display === "" )
            this.info.style.display = "block";
        else
            this.info.style.display = "";
    }
}
customElements.define("super-balise", SuperBalise);