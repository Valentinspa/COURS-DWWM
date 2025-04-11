// importation de l'objet JustePrix
import { JustePrix } from "./justePrix.js";

// importation de l'objet Paint
import { Paint } from "./paint.js";

const select = document.getElementById("appli");
const appliContainer = document.querySelector(".appli");

// Écouteur d'événement pour le changement de sélection
const selectedApp = () => {
    const selectedValue = select.value;

    // Vider le conteneur avant d'afficher une nouvelle application
    appliContainer.innerHTML = "";

    if (selectedValue === "justePrix") {
        // Afficher le jeu "Juste Prix"
        JustePrix.create();
    } else if (selectedValue === "paint") {
        // Afficher l'application de desssin "Paint"
        Paint.create();
        
    } else if (selectedValue === "slider") {
        // Placeholder pour une autre application (Slider)
        
    }
};

select.addEventListener("change", selectedApp);

selectedApp();
    


