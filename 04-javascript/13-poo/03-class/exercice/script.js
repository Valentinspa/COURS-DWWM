import Balle from "./Balle.js";

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le canvas
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Créer 100 balles aléatoires
    Balle.creerBalles(100);
    
});