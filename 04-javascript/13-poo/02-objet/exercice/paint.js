"use strict";

const Paint = {

    create(){

        
        
        // Création du conteneur principal pour Paint
        const paintContainer = document.createElement("div");
        paintContainer.classList.add("paint-container");
        
        // Création de la div "toolbar"
        const toolbar = document.createElement("div");
        toolbar.id = "toolbar";

        // Création de l'input pour le sélecteur de couleur
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.id = "colorPicker";
        colorPicker.value = "#000000";

        // Création du label pour la taille du trait
        const labelTrait = document.createElement("label");
        labelTrait.htmlFor = "trait";
        labelTrait.textContent = "Taille du trait :";

        // Création de l'input pour la taille du trait
        const traitInput = document.createElement("input");
        traitInput.type = "range";
        traitInput.id = "trait";
        traitInput.min = "1";
        traitInput.max = "20";
        traitInput.value = "1";

        // Création des boutons "Annuler", "Refaire" et "Sauvegarder"
        const undoButton = document.createElement("button");
        undoButton.textContent = "Annuler";
        undoButton.onclick = () => this.undo();

        const redoButton = document.createElement("button");
        redoButton.textContent = "Refaire";
        redoButton.onclick = () => this.redo();

        const saveButton = document.createElement("button");
        saveButton.textContent = "Sauvegarder";
        saveButton.onclick = () => this.saveImage();

        // Création de l'input pour charger une image
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.id = "charger";
        fileInput.accept = "image/*";

        // Ajout des éléments dans la toolbar
        toolbar.append(
            colorPicker,
            labelTrait,
            traitInput,
            undoButton,
            redoButton,
            saveButton,
            fileInput
        );

        // Création du canvas
        const canvas = document.createElement("canvas");

        // Ajout de la toolbar et du canvas au body
        paintContainer.append(toolbar, canvas);

        // Ajout du conteneur principal dans la div `.appli`
        const appliContainer = document.querySelector(".appli");
        appliContainer.append(paintContainer);

        this.style();

    },
    style(){
        if (document.getElementById("paint-style")) return;
        const style = document.createElement("style");
        style.id = "paint-style";
        style.textContent = 
        ` * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .paint-container {
            position: relative;
            width: 100%;
            height: 100%;
        }

        canvas {
            border: 1px solid black;
            display: block;
            margin: 20px auto;
            background-color: white;
        }

        #toolbar {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 100;
            background-color: orange;
            padding: 10px;
            border-radius: 8px;
            display: flex;
            flex-direction: row;
            gap: 10px;
            align-items: center;
            color: white;
            font-family: Arial, Helvetica, sans-serif;
        }

        #toolbar input[type="color"],
        #toolbar input[type="range"],
        #toolbar button,
        #toolbar input[type="file"] {
            padding: 5px;
            font-size: 1rem;
            border: none;
            border-radius: 5px;
            
        }
        #toolbar button {
            background-color: #4a90e2;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #toolbar button:hover {
            background-color: #357ab8;
        }

        #appli {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 100;
            width: auto;
            height: 60px;
            overflow: auto;
        }`
        document.head.append(style);
    }
}

export {Paint};