"use strict";

/**
 * Objet contenant la configuration des routes front-end.
 * Chaque clé est un chemin URI,
 * chaque valeur un objet avec :
 *  - html : chemin relatif vers le fichier HTML à charger,
 *  - js : (optionnel) script JS à importer dynamiquement pour cette route,
 *  - option : (optionnel) option passée au script (ex: méthode HTTP).
 */
export default {
    "/06-api/front/": {
        html: "user/list.html",
        js: "tableUser.js"
    },
    "/06-api/front/inscription": {
        html: "user/inscription.html",
        js: "form.js",
        option: "POST"
    },
    "/06-api/front/user/update": {
        html: "user/inscription.html",
        js: "form.js",
        option: "PUT"
    },
    "/06-api/front/user/delete": {
        html: "user/list.html",
        js: "delete.js"
    },
    "/06-api/front/connexion": {
        html: "auth/connexion.html",
        js: "auth.js",
        option: "POST"
    },
    "/06-api/front/deconnexion": {
        html: "auth/connexion.html",
        js: "auth.js"
    }
    // Exemple de route commentée
    // "/index.html": "pages/home.html"
};
