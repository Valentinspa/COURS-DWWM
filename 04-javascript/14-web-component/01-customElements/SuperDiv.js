"use strict";
/* 
    Le second type d'élément personnalisé, est l'élément personnalisé intégré.
    Il héritera d'un élément HTML particulier, ici la DIV.

    De plus on devra ajouter un troisième paramètre au define.
    Celui ci sera un objet avec la propriété "extends" indiquant le nom de la balise à hérité:
        {extends: "div"}, {extends: "img"}...
*/
export class SuperDiv extends HTMLDivElement
{
    constructor()
    {
        super();
        this.#setStyle();
        this.addEventListener("click", this.hide);
    }
    #setStyle()
    {
        this.style.display = "block";
        this.style.overflow = "hidden";
        this.style.backgroundColor = this.getAttribute("bg")??"red";
        this.style.transition = "height 0.3s linear";

        this.sizes = this.getBoundingClientRect();
        this.style.height = this.sizes.height +"px";
    }
    hide()
    {        
        if(this.style.height == "1lh")
            this.style.height = this.sizes.height +"px";
        else
            this.style.height = "1lh";
    };

    /* 
        On peut aussi ajouter à nos éléments personnalisées, intégré ou autonome, des cycles de vie.
        Ce sont des fonctions prédéfinie qui se lanceront automatiquement à certains moments un peu comme le constructor.

        On trouvera par exemple :
            connectedCallback qui se déclenchera quand notre élément integrera le DOM.
    */
    connectedCallback()
    {
        console.log("Je viens d'arriver dans le DOM");        
    }
    /* 
        disconnectedCallback() 
        Il se déclenchera quand l'élément quittera le DOM.
    */
    disconnectedCallback()
    {
        console.log("Je viens de quitter le DOM");        
    }
    /* 
        adoptedCallback()
        Il se déclenchera lorsque l'élément sera adopté par un DOM différent. 
        (Rarement utilisé, il a surtout son intéret si on joue avec des iframe)
    */
    adoptedCallback()
    {
        console.log("Je viens d'arriver depuis un DOM différent");        
    }
    /* 
        attributeChangedCallback()
        Il se déclenchera lorsque les attributs indiqué changeront.
        Il prendra 3 arguments :
            - le nom de l'attribut modifié
            - la valeur de l'attribut avant modification
            - la valeur de l'attribut après modification
        
        Pour lui indiqué quels attributs surveillés, on l'accompagnera d'un getter static appelé "observedAttributes" qui retournera un tableau contenant le nom des attributs à surveiller.
    */
    attributeChangedCallback(name, old, now)
    {
        console.log("On a changé l'attribut : ", name);
        console.log("avant : ", old);
        console.log("après : ", now);        
    }
    static get observedAttributes()
    {
        return ["style"];
    }
}

customElements.define("super-div", SuperDiv, {extends: "div"});