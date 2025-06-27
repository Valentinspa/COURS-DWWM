/**
 * Module de gestion d'envoi de formulaire avec fetch.
 * Initialise le mode d'envoi (GET ou POST), configure le formulaire,
 * puis écoute la soumission pour envoyer les données.
 */

let method;

/**
 * Initialise le formulaire selon la méthode passée.
 * Ajoute un écouteur sur la soumission du formulaire.
 * Ajuste les champs requis selon la méthode.
 * 
 * @param {string} [option="GET"] - Méthode HTTP pour l'envoi (GET ou POST)
 */
export default function(option = "GET") {
    method = option;

    const form = document.querySelector("form");
    form.addEventListener("submit", sendForm);

    setForm();
}

/**
 * Fonction déclenchée lors de la soumission du formulaire.
 * Envoie les données du formulaire au serveur via fetch.
 * Met à jour l'interface selon la réponse.
 * 
 * @param {SubmitEvent} e - L'événement de soumission du formulaire.
 */
async function sendForm(e) {
    e.preventDefault();

    // Récupère les données du formulaire
    const formData = new FormData(this);

    // Ajoute un champ avec le nom du formulaire à true
    formData.append(this.name, true);

    // Convertit les données en JSON
    const json = JSON.stringify(Object.fromEntries(formData));

    // Envoi de la requête fetch vers l'URL d'action du formulaire avec les paramètres d'URL actuels
    const response = await fetch(this.action + window.location.search, {
        method: method,
        body: json,
        credentials: 'include' // Inclut les cookies/session
    });

    const data = await response.json();
    const main = document.querySelector("main");
    console.log(data);

    if (response.ok) {
        // Affiche le message de succès
        main.textContent = data.message;

        // Si l'utilisateur est connecté, met à jour l'affichage du nom dans le header
        if (sessionStorage.getItem("logged")) {
            const h2 = document.querySelector("header h2");
            h2.textContent = data.data.username;
        }

        // Redirection vers la page principale après 3 secondes
        setTimeout(router, 3000, "/06-api/front/");
    } else if (data.data?.violations?.length > 0) {
        // Affiche les erreurs de validation sous les champs correspondants
        for (const error of data.data.violations) {
            const span = document.querySelector(`[name=${error.propertyPath}]+span.erreur`);
            if (span) {
                span.textContent = error.message;
            }
        }
    } else {
        // Message d'erreur générique
        main.textContent = data.message ?? "Erreur inconnue";
    }
}

/**
 * Ajuste le formulaire selon la méthode.
 * Si la méthode est GET, supprime la contrainte "required" sur tous les inputs.
 */
function setForm() {
    if (method === "POST") return;

    const inputs = document.querySelectorAll("input");
    inputs.forEach(inp => inp.required = false);
}
