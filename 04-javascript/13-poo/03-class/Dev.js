"use strict";

import Human from "./Human.js";

/* 
    le mot clef "extends" permet l'héritage d'une classe.
    Cela permet à ma nouvelle classe d'obtenir presque toute les propriétés et méthodes de son parent.

    Seul les propriétés et méthodes privées ne sont pas héritées.
*/

export default class Dev extends Human
{
    constructor(prenom, nom, age, techniques)
    {
        /* 
            Si l'on modifie le constructor d'une classe qui a hérité,
            Il faut appeler la fonction "super()".
            Elle appellera le constructor du parent, de ce fait, il faudra lui donner les paramètres attendu par le parent.
        */
        super(prenom, nom, age);
        // console.log(this.#age);
        this.setTechniques = techniques;
    }
    set setTechniques(t)
    {
        if(Array.isArray(t))
        {
            this.tech = t;
        }else
        {
            this.tech = [t];
        }
    }
    get getTechniques()
    {
        return this.tech.join(", ");
    }

    /* 
        Si je nomme une méthode comme celle du parent.
        Celle du parent sera oubliée et il prendra la nouvelle méthode définie :
    */
    salutation()
    {
        // Optionnellement je pourrais choisir d'appeler aussi la méthode du parent avant de la réécrire :
        super.salutation();
        console.log(`Je maîtrise ${this.getTechniques}.`);        
    }
}