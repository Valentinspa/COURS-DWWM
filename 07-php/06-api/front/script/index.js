"use strict";

import router from "./router.js";

/**
 * Si l'utilisateur est connecté (info stockée en sessionStorage),
 * met à jour le header avec son nom d'utilisateur.
 */
if (sessionStorage.getItem("logged")) {
    const h2 = document.querySelector("header h2");
    h2.textContent = sessionStorage.getItem("username");
}

/**
 * Appelle la fonction router avec le chemin actuel de la page
 * pour gérer le rendu ou la navigation.
 */
router(window.location.pathname);
