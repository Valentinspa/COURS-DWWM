"Use strict";

function reset () {
    

    const nombre = Math.floor(Math.random() * 100);
    console.log("Nombre à deviner :", nombre);

    const input = document.getElementById('prix');
    const button = document.getElementById('proposer');
    const message= document.getElementById('message');
    const resultat = document.getElementById('resultat');
    const card = document.getElementById('flipCard');
    const recommencer = document.getElementById('return');
    

    input.value = '';
    button.disabled = false;
    message.textContent = 'Veuillez choisir un nombre entre 1 et 100, vous avez 7 essais : ';
    resultat.textContent = '';
    card.style.transform = 'rotateY(0deg)'; 

    let essais = 7;


    button.removeEventListener('click', remiseAZero);
    function remiseAZero() {
        const value = parseInt(input.value, 10);
        essais--;
    
    
        if (value < nombre) {
            message.textContent = 'C\'est plus grand !';
            
        } else if (value > nombre) {
            message.textContent = 'C\'est plus petit !';
            
        } else {
            message.textContent = 'Bravo !';
            resultat.textContent = nombre;
            button.disabled = true;
            card.style.transform = 'rotatey(180deg)';
            return;
        }
        if (essais === 0) {
            resultat.textContent = nombre;
            message.textContent = 'Perdu';
            button.disabled = true;
            card.style.transform = 'rotatey(180deg)';
        }
    
    };
    button.addEventListener('click', remiseAZero);
    recommencer.removeEventListener('click', reset);
    recommencer.addEventListener('click', reset);
    
};
reset();