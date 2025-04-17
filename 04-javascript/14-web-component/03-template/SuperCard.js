"use strict";

export class SuperCard extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode:"open"});
        const template = document.querySelector("#card");
        this.shadowRoot.append(template.content.cloneNode(true));
    }
}
customElements.define("super-card", SuperCard);