"use strict";
// Juste Prix


const JustePrix = {

    //stockage du nombre à deviner
    randomNumber : null,
    
    create(){

        // Génère un nombre aléatoire entre 1 et 100
        this.randomNumber = Math.floor(Math.random() * 100) + 1; 
        console.log(this.randomNumber);

        // Création du conteneur principal pour Juste Prix
        const justePrixContainer = document.createElement("div");
        justePrixContainer.classList.add("juste-prix-container");

        //Creation des éléments HTML

        // Création d'un élément h1 pour le titre
        const h1 = document.createElement("h1");
        h1.textContent = "Juste Prix";
        
        //Création d'un paragraphe pour le texte d'instruction
        const p = document.createElement("p");
        p.textContent = "Quel est le prix ?";
        
        // Création d'un input pour entrer le prix
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "Entrez le prix";
        
        // Création d'un bouton pour valider le prix
        const button = document.createElement("button");
        button.textContent = "Valider";
        
        // Création d'un élément pour afficher le résultat
        const result = document.createElement("p");
        result.classList.add("result");
        
        
        // Ajout des éléments dans le conteneur principal
        justePrixContainer.append(h1, p, input, button, result);
        

        // Ajout d'un écouteur d'événement sur le bouton
        // pour vérifier le nombre entré par l'utilisateur
        button.addEventListener("click", () => {
            const choixNombre = parseInt(input.value);
            if(isNaN(choixNombre)){
                result.textContent = "Veuillez entrer un nombre !";
                return;
            } else if (choixNombre < this.randomNumber) {
                result.textContent = "Plus Grand !";   
            } else if (choixNombre > this.randomNumber) {
                result.textContent = "Plus Petit !";
            }
            else {
                result.textContent = "Gagné!";
                this.randomNumber = Math.floor(Math.random() * 100) + 1;
                console.log("Nouveau nombre généré :", this.randomNumber);
            }

            input.value = ""; // Réinitialiser l'input
        });
        
        //ajout du style par défaut
        this.style();

        // Ajout du conteneur dans la div `.appli`
        const appliContainer = document.querySelector(".appli");
        appliContainer.append(justePrixContainer);
    },
    // Ajoute un style par défaut
    style() {
        
        const style = document.createElement("style");
        style.textContent = 
        `
        .juste-prix-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 20px;
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }

        input {
            margin: 10px 0;
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: calc(100% - 22px);
        }

        button {
            padding: 10px 20px;
            font-size: 1rem;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #357ab8;
        }

        `;

        // Ajout du style au head du document
        document.head.append(style);
    }

    
};
// exportation de l'objet JustePrix
export {JustePrix};
