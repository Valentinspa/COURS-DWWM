"use strict";

import { getLinks } from "./router.js";

const API_URL = "http://localhost:8090/06-api/back/auth";

let method;

/**
 * Fonction principale d'authentification.
 * Configure le mode d'authentification selon l'option passée.
 * Si la méthode est GET, on effectue une déconnexion.
 * Sinon, on écoute la soumission du formulaire pour un login.
 * 
 * @param {string} [option="GET"] - La méthode HTTP utilisée pour l'authentification (ex: "GET", "POST").
 */
export default function(option = "GET") {
    method = option;
    console.log(method);

    if (method === "GET") {
        logout();
    } else {
        const form = document.querySelector("form");
        form.addEventListener("submit", login);
    }
}

/**
 * Gère la soumission du formulaire de connexion.
 * Envoie les données au serveur sous forme JSON.
 * Met à jour l'interface selon la réponse du serveur.
 * 
 * @param {SubmitEvent} e - L'événement de soumission du formulaire.
 */
async function login(e) {
    e.preventDefault();

    // Récupère les données du formulaire sous forme clé-valeur
    const formData = new FormData(this);

    // Ajoute une propriété avec le nom du formulaire à true (ex: checkbox ou flag)
    formData.append(this.name, true);

    // Convertit les données en JSON pour l'envoi
    const json = JSON.stringify(Object.fromEntries(formData));

    // Envoie la requête fetch au serveur avec les données JSON et les credentials pour la session
    const response = await fetch(this.action, {
        method: method,
        body: json,
        credentials: 'include'
    });

    // Parse la réponse JSON
    const data = await response.json();

    if (response.ok) {
        // Si la réponse est OK, met à jour l'URL et l'interface utilisateur
        window.history.pushState({}, "", "/06-api/front/");

        const main = document.querySelector("main");
        main.textContent = data.message;

        // Sauvegarde dans sessionStorage les infos de l'utilisateur
        sessionStorage.setItem("logged", true);
        sessionStorage.setItem("username", data.data.username);
        sessionStorage.setItem("idUser", data.data.idUser);

        // Met à jour l'affichage du nom utilisateur dans l'en-tête
        const h2 = document.querySelector("header h2");
        h2.textContent = data.data.username;

        // Actualise les liens disponibles (via router.js)
        getLinks();
    } else {
        // En cas d'erreur, affiche les messages de validation sous les champs correspondants
        for (const error of data.data.violations) {
            const span = document.querySelector(`[name=${error.propertyPath}]+span.erreur`);
            console.log(error);
            if (span) {
                span.textContent = error.message;
            }
        }
    }
}

/**
 * Effectue une requête GET pour la déconnexion.
 * Si la déconnexion échoue, vide le stockage de session.
 * Met à jour l'interface pour indiquer la déconnexion.
 */
async function logout() {
    const response = await fetch(API_URL, {
        method: "GET",
        credentials: 'include'
    });

    if (!response.ok) {
        sessionStorage.clear();
    }

    const main = document.querySelector("main");
    main.textContent = "Utilisateur déconnecté";

    const h2 = document.querySelector("header h2");
    h2.textContent = "Non connecté";

    getLinks();
}
