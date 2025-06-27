"use strict";
import routes from "./routes.js";

const main = document.querySelector('main');

/**
 * Fonction principale de routage côté client.
 * Change l'URL, charge le contenu HTML associé et exécute le script JS lié.
 * 
 * @param {string} uri - Chemin à charger dans l'application.
 * @returns {Promise<void>}
 */
export default async function router(uri) {
    // Met à jour l'URL dans l'historique sans recharger la page
    window.history.pushState({}, "", uri);

    // Cache le contenu principal pendant le chargement
    main.classList.remove("show");

    const path = window.location.pathname,
          route = "/06-api/front/view/" + (routes[path]?.html || "404.html");

    // Charge le contenu HTML de la route demandée
    const response = await fetch(route);

    if (!response.ok) return; // En cas d'erreur, on ne fait rien

    // Injecte le contenu HTML dans la balise <main>
    const data = await response.text();
    main.innerHTML = data;

    // Si un script JS est associé à la route, on l'importe dynamiquement et on l'exécute
    if (routes[path]?.js) {
        const script = await import("./" + routes[path].js);
        await script.default(routes[path].option ?? undefined);
    }

    // Active la gestion des liens internes pour SPA
    getLinks();

    // Affiche le contenu principal une fois chargé
    main.classList.add("show");
}

/**
 * Gestionnaire d'événement pour les clics sur les liens.
 * Empêche le comportement classique et déclenche le router.
 * 
 * @param {MouseEvent} e - L'événement click sur un lien.
 */
function goToHref(e) {
    e.preventDefault();
    router(this.href);
}

/**
 * Ajoute aux liens du parent donné le comportement SPA
 * (navigation sans rechargement de page) et gestion visibilité selon session.
 * 
 * @param {Element} [parent=document] - Élément DOM parent dans lequel chercher les liens.
 */
export function getLinks(parent = document) {
    const links = parent.querySelectorAll("a");
    links.forEach(setLink);
}

/**
 * Configure un lien :
 * - Définit l'événement onclick pour utiliser le router.
 * - Affiche ou masque le lien selon la connexion de l'utilisateur et classes CSS.
 * 
 * @param {HTMLAnchorElement} a - Le lien à configurer.
 */
function setLink(a) {
    a.onclick = goToHref;

    const logged = sessionStorage.getItem("logged");

    if (a.classList.contains("logged")) {
        // Montre le lien seulement si connecté
        a.parentElement.style.display = logged ? "block" : "none";
    } else if (a.classList.contains("logout")) {
        // Montre le lien seulement si non connecté
        a.parentElement.style.display = logged ? "none" : "block";
    }
}
