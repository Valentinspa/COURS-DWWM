let template, tbody, rowTemplate;
const API_URL = "http://localhost:8090/06-api/back/user";

/**
 * Fonction principale chargée d'afficher la liste des utilisateurs dans un tableau.
 * Elle récupère les données depuis l'API et remplit le tableau HTML.
 * @returns {Promise<void>}
 */
export default async function() {
    const response = await fetch(API_URL);
    if (!response.ok) return; // Arrêt si la requête a échoué

    tbody = document.querySelector("tbody");
    template = document.querySelector("#tableRow");
    rowTemplate = template.content;

    const data = await response.json();

    // Parcours chaque utilisateur et ajoute une ligne au tableau
    data.data.forEach(fillTable);
}

/**
 * Remplit une ligne du tableau avec les données d'un utilisateur.
 * @param {Object} u - Objet utilisateur contenant au moins idUser et username.
 */
function fillTable(u) {
    // Clone le template de ligne HTML
    const row = rowTemplate.cloneNode(true);

    // Remplit les colonnes avec les données utilisateur
    row.querySelector(".id").textContent = u.idUser;
    row.querySelector(".username").textContent = u.username;

    // Configure les liens de la ligne avec l'ID utilisateur
    setlinksId(row, u.idUser);

    // Ajoute la ligne au tbody
    tbody.append(row);
}

/**
 * Met à jour les liens dans la ligne pour y inclure l'ID utilisateur.
 * Cache certains liens selon la session en cours.
 * @param {DocumentFragment|Element} parent - Le conteneur dans lequel chercher les liens.
 * @param {string|number} id - ID utilisateur pour mettre à jour les href.
 */
function setlinksId(parent, id) {
    const links = parent.querySelectorAll("a");
    links.forEach(a => {
        // Cache les liens avec classe "limited" si ce n'est pas l'utilisateur connecté
        if (a.classList.contains("limited") && id != sessionStorage.getItem("idUser")) {
            a.style.display = "none";
        }
        // Ajoute l'ID utilisateur à la fin de l'attribut href
        a.href += id;
    });
}
