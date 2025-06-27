import router from "./router.js";

const API_URL = "http://localhost:8090/06-api/back/user";

/**
 * Fonction principale qui demande confirmation à l'utilisateur
 * avant de lancer la suppression de l'utilisateur courant.
 */
export default function() {
    if (confirm("Êtes vous sûr de vouloir supprimer cet utilisateur?")) {
        deleteUser();
    }
}

/**
 * Envoie une requête HTTP DELETE pour supprimer l'utilisateur courant.
 * Met à jour l'interface en fonction du résultat.
 * 
 * @async
 */
async function deleteUser() {
    // Envoi de la requête DELETE vers l'API avec les paramètres d'URL actuels
    const res = await fetch(API_URL + window.location.search, {
        method: "DELETE",
        credentials: 'include' // inclut les cookies/session
    });

    const main = document.querySelector("main");

    if (res.ok) {
        // Si suppression OK, on vide la session et on affiche un message
        sessionStorage.clear();
        main.textContent = "Utilisateur supprimé";

        const h2 = document.querySelector("header h2");
        h2.textContent = "Non connecté";

        // Redirection vers la page front après 3 secondes
        setTimeout(router, 3000, "/06-api/front/");
    } else {
        // En cas d'erreur, récupère le message et l'affiche
        const data = await res.json();
        main.textContent = data.message ?? "Erreur inconnue";
    }
}
