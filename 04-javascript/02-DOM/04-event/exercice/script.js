/*
    Exercice 1 :

    Faire que lors de la selection d'une couleur dans l'input de la div 2
    le texte du bouton change de couleur, 
    et lors de l'appuie sur le bouton, 
    le background de la div change de couleur.    
*/
const colorInput = document.querySelector(".div2 > input[type='color']");
const buttonInDiv2 = document.querySelector(".div2 > button");
const div2 = document.querySelector(".div2");

colorInput.addEventListener("input", function(){

    const selectedColor = this.value;
    buttonInDiv2.style.color = selectedColor;
});
buttonInDiv2.addEventListener("click", function(){

    const selectedColor = colorInput.value;
    div2.style.backgroundColor = selectedColor;
    
});
/* 
    Exercie 2 :

    Lors du clique sur le bouton de la div 3,
    faire apparaître la modale
    Cette modale doit contenir un élément permettant de la faire disparaître.
*/
const boutonDiv3 = document.querySelector('.div3 button');
const modale = document.querySelector('.modal.m2.hidden');

function afficherModale(){
    modale.style.display = 'block';
};

function cacherModale(){
    modale.style.display = 'none';
};

boutonDiv3.addEventListener("click", afficherModale);

const boutonFermer = modale.querySelector('button:nth-of-type(2)');
boutonFermer.addEventListener("click", cacherModale);

//Bonus : cache la modale en cliquant ailleurs dans la modale
window.addEventListener('click', function(event) {
    if (event.target === modale) {
      cacherModale();
    }
});


/* 
    Exercice 3 :

    Faites que tous nos li dans la nav double de taille lorsque l'on clique dessus.
    puis retournent à leurs tailles d'origine si on clique de nouveau dessus.
*/

document.addEventListener('DOMContentLoaded', function() {
    
    const menuItems = document.querySelectorAll('nav ul li');
    
    
    menuItems.forEach(function(item) {
      
      item.addEventListener('click', function(event) {
        
        if (event.target === item && item.querySelector('a')) {
          event.preventDefault();
        }
        
        const currentSize = window.getComputedStyle(item).fontSize;
        const numericSize = parseFloat(currentSize);
        
        
        if (item.dataset.enlarged === "true") {
          
          item.style.fontSize = '';
          item.dataset.enlarged = "false";
        } else {
          
          item.style.fontSize = (numericSize * 2) + 'px';
          item.dataset.enlarged = "true";
        }
      });
    });
  });

/* 
    Exercie 4 :
    
    Utilise les évènements "mouseenter" et "mousemove" pour 
    faire que lorsque l'on passe sur le span du footer, il commence à suivre la souris
    et cela jusqu'à ce que l'on clique, il retournera alors à sa position d'origine.
*/