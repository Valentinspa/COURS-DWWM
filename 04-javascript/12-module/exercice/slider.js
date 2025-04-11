/**
 * Crée un slider d'images à partir d'un tableau d'images
 * @param {Array} images Tableau contenant les images à afficher dans le slider
 * @returns {HTMLElement} Un élément HTML contenant le slider
 */
export function createSlider (images) {
    const div = document.createElement("div");
    div.classList.add("slider");

    const img = document.createElement("img");
    img.src = images[0];
    img.classList.add("slider-image");
    div.appendChild(img);

    // Créez les boutons "Précédent" et "Suivant"
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&#9664;";
    prevButton.classList.add("prev-button");
    div.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&#9654;";
    nextButton.classList.add("next-button");
    div.appendChild(nextButton);

    // Ajouter les buttons pour chaque image
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    images.forEach((_,index) => {
        const button = document.createElement("button");
        button.classList.add("image-button");
        if (index === 0) {
            button.classList.add("active");
        }
            button.dataset.index = index;
            buttonsContainer.appendChild(button);

        });
        div.appendChild(buttonsContainer);

    return div;
}
 export function startSlider(div, images, interval = 4000) 
{   const img = div.querySelector(".slider-image");
    const buttons = div.querySelectorAll(".image-button");
    let currentIndex = 0;
    let autoScroll;

    const updateImage  = (index) => {
        currentIndex = (index + images.length) % images.length;
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = images[currentIndex];
            img.style.opacity = 1;
        }, 500);
        
        // Mettre à jour les boutons
        buttons.forEach((button, i) => {
            button.classList.toggle("active", i === currentIndex);
        });
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        autoScroll = setInterval(() => {
            updateImage(currentIndex + 1);
        }, interval);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScroll);
    };

   
    div.querySelector(".prev-button").addEventListener("click", () => {
        stopAutoScroll();
        updateImage(currentIndex - 1);
        startAutoScroll();
    });

    div.querySelector(".next-button").addEventListener("click", () => {
        stopAutoScroll();
        updateImage(currentIndex + 1);
        startAutoScroll();
    });

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            stopAutoScroll();
            updateImage(Number(button.dataset.index));
            startAutoScroll();
        });
    });

    div.addEventListener("mouseleave", () => {
        startAutoScroll();
    });


    startAutoScroll();
}