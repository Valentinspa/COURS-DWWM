"use strict";
/* 
    La balise canvas n'a aucune utilisé sans JS.
    Mais avec, elle peut servire pour dessiner, animer, faire des jeux, des outils ou autre.
*/
const canvas = document.querySelector('canvas');
/* 
    Pour interagire avec le canvas, nous allons avoir besoin de récupérer son "contexte".
    Pour cela on va utiliser la méthode "getContext()" avec en paramètre, le contexte voulu:

    Ici nous allons lui indiquer "2d"; Mais il est aussi possible de faire de la 3D avec "webgl" par exemple.
    Pour se faciliter la tâche, les développeurs voulant faire de la 3D, utilisent souvent la bibliothèque "three.js". 
*/
const ctx = canvas.getContext("2d");
// ? Resize
function resize()
{
    /* 
        le canvas est comme une image, changer sa taille en CSS, ne fera que l'étiré.
        Il faudra changer sa taille avec les propriétés "width" et "height".

        getImageData, permet de récupérer les données de l'image. car une fois la taille changé, le context est reset.
        Il prendra en paramètre "position x à partir de laquelle prendre les données, position y, largeur, hauteur"
    */
    const snapshot = ctx.getImageData(0,0,canvas.width, canvas.height);
    // console.log(snapshot);    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // permet d'afficher les données de l'image, avec en paramètre, "données à afficher, position x, position y"
    ctx.putImageData(snapshot, 0,0);
}
resize();
window.addEventListener("resize", resize);
//? Canvas
// permet de dessiner un rectangle avec "position x, position y, largeur, hauteur".
ctx.strokeRect(50, 50, 150, 25);
// dessiner un rectangle rempli
ctx.fillRect(150, 250, 350, 55);

// fillStyle et strokeStyle permettent de changer la couleur.
ctx.fillStyle = "#987654";
ctx.strokeStyle = "chartreuse";
// lineWidth gère l'épaisseur (en pixel) des traits.
ctx.lineWidth = 8;
// ils ne changent la couleur que de ce qui suis :
ctx.strokeRect(50, 300, 34, 270);
ctx.fillRect(50, 300, 34, 270);

// ? forme plus complexe :
// Je lui indique que l'on commence un chemin.
ctx.beginPath();
// Je lui indique un point de départ.
ctx.moveTo(400, 300);
// Je lui indique jusqu'où je souhaite tracer mon trait :
ctx.lineTo(500, 200);
// je trace mon trait :
ctx.stroke();

ctx.beginPath();
ctx.moveTo(700, 100);
ctx.lineTo(800, 600);
ctx.lineTo(100, 500);

ctx.strokeStyle = "purple";
ctx.fillStyle = "lightblue";
ctx.lineWidth = 10;
// closePath permet de fermer la forme dessiné
ctx.closePath();
ctx.stroke();
// fill permet de remplir la forme dessiné
ctx.fill();

// ? cercle et arc de cercle

ctx.beginPath();
/* 
    Pour dessiner un arc de cercle (ou un cercle complet)
    On utilisera "arc" avec en paramètre 
        position x et y (indiquant le centre du cercle)
        rayon du cercle
        Position de départ de l'arc de cercle
        Position de fin (avec pour un cercle complet, au moins 2*Math.PI)
*/
ctx.arc(1000, 500, 82,0,2*Math.PI);
ctx.stroke();


// ? Animation
ctx.strokeStyle = "pink";
ctx.fillStyle = "fuchsia";
let x = 100, y = 100, vitesseX = 5, vitesseY = 5, r = 80;
// Je sauvegarde mon dessin avant de lancer l'animation.
let snapshot = ctx.getImageData(0,0, canvas.width, canvas.height);
AnimeCercle();
function AnimeCercle()
{
    // clearReact permet d'effacer en forme rectangulaire.
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.putImageData(snapshot, 0,0);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // Si la position x ou y de mon cercle atteint un bord du canvas, alors j'inverse son déplacement
    if(x + r > canvas.width || x - r < 0)
    {
        vitesseX = -vitesseX;
    }
    if(y + r > canvas.height || y - r < 0)
    {
        vitesseY = -vitesseY;
    }
    x += vitesseX;
    y += vitesseY;
    // setTimeout(AnimeCercle, 20)
    // requestAnimationFrame est un timeout qui s'adapte au taux de rafraichissement de l'écran pour avoir une animation fluide.
    requestAnimationFrame(AnimeCercle);
}

// ? Ajouter une image

//Je crée une nouvelle image.
const img = new Image();
img.src = "./HTML5_logo.svg";
// J'attends que l'image ai chargée
img.onload = function()
{
    // Je dessine mon image avec en paramètre (l'image, la position x et y, largeur, hauteur).
    ctx.drawImage(img, 50, 250, 100, 100);
    // Mon animation effaçant tout, je met à jour la snapshot.
    snapshot = ctx.getImageData(0,0, canvas.width, canvas.height);
};
// ? afficher du texte :
ctx.strokeStyle = "red";
ctx.lineWidth = 1;
// Permet de changer la taille et la police d'écriture
ctx.font = "82px serif";
// Affiche un texte à la position x et y donnée
ctx.strokeText("Coucou en Stroke", 500, 500);
ctx.fillText("Coucou en fill", 500, 400);
// Change l'alignement du texte
ctx.textAlign = "center";
ctx.fillText("Coucou en center", 500, 300);
// On peut ajouter une valeur supplémentaire pour limiter la largeur du texte
ctx.fillText("Coucou en 200px", 500, 200, 200);

// ? forme des traits 

ctx.lineWidth = 20;

ctx.beginPath();
ctx.lineCap = "round";
ctx.moveTo(700, 40);
ctx.lineTo(700, 400);
ctx.stroke();

ctx.beginPath();
ctx.lineCap = "square";
ctx.moveTo(750, 40);
ctx.lineTo(750, 400);
ctx.stroke();

ctx.beginPath();
ctx.lineCap = "butt";
ctx.moveTo(800, 40);
ctx.lineTo(800, 400);
ctx.stroke();

// pour éviter l'effacement venant de l'animation
snapshot = ctx.getImageData(0,0, canvas.width, canvas.height);