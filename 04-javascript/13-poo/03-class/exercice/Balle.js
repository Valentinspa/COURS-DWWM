export default class Balle {
    static balles = []; // Tableau statique pour stocker toutes les balles
    
    canvas = document.querySelector('canvas');
    ctx = this.canvas.getContext("2d");

    constructor() {
        // Propriétés aléatoires pour chaque balle
        this.rayon = Math.random() * 30 + 10; // Rayon entre 10 et 40
        this.x = Math.random() * (this.canvas.width - 2 * this.rayon) + this.rayon;
        this.y = Math.random() * (this.canvas.height - 2 * this.rayon) + this.rayon;
        
        // Vitesse aléatoire
        this.vitesseX = Math.random() * 6 - 3; // Entre -3 et 3
        this.vitesseY = Math.random() * 6 - 3; // Entre -3 et 3
        
        // Couleur aléatoire
        this.couleur = this.genererCouleurAleatoire();
        
        // Ajouter cette balle au tableau statique
        Balle.balles.push(this);
        
        // Si c'est la première balle, initialiser l'animation et les événements
        if (Balle.balles.length === 1) {
            this.initialiserEvenements();
            this.animer();
        }
    }
    
    // Initialiser les événements
    initialiserEvenements() {
        // Redimensionnement de la fenêtre
        window.addEventListener('resize', () => this.resize());
        
        // Clic pour ajouter une balle
        this.canvas.addEventListener('click', (event) => {
            const nouvelleBalle = new Balle();
            nouvelleBalle.x = event.clientX;
            nouvelleBalle.y = event.clientY;
        });
    }
    
    // Méthode pour redimensionner le canvas
    resize() {
        const snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.putImageData(snapshot, 0, 0);
        
    }
    
    // Méthode pour générer une couleur aléatoire
    genererCouleurAleatoire() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Méthode pour dessiner la balle
    dessiner() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2);
        this.ctx.fillStyle = this.couleur;
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    // Méthode pour mettre à jour la position de la balle
    deplacer() {
        // Vérifier les collisions avec les bords du canvas
        if (this.x + this.rayon > this.canvas.width || this.x - this.rayon < 0) {
            this.vitesseX = -this.vitesseX;
        }
        
        if (this.y + this.rayon > this.canvas.height || this.y - this.rayon < 0) {
            this.vitesseY = -this.vitesseY;
        }
        
        // Mettre à jour la position
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
    
    // Méthode pour animer toutes les balles
    animer() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Mettre à jour et dessiner chaque balle
        for (const balle of Balle.balles) {
            balle.deplacer();
            balle.dessiner();
        }
        
        // Continuer l'animation
        requestAnimationFrame(() => this.animer());
    }
    
    // Méthode statique pour créer plusieurs balles
    static creerBalles(nombre) {
        for (let i = 0; i < nombre; i++) {
            new Balle();
        }
    }
}