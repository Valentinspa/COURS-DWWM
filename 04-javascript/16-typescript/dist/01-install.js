"use strict";
/*
    Typescript est une surcouche à Javascript.
    Il permet d'ajouter des fonctionnalités que l'on trouve habituellement dans les langages de développement plus classique.

    Dont la principale, qui se trouve dans le nom, le typage.

    ? Installation :
        * npm install typescript --save-dev

    ? transpiler un fichier :
        * npx tsc pathToFile.ts
    ? transpiler vers un autre dossier :
        * npx tsc pathToFile.ts --outDir pathToFolder


    Pour éviter de retaper cela à chaque fois, on peut créer un fichier "tsconfig.js" à la racine du projet et y entrer :
        {
            "compilerOptions": {
                "outDir": "dist"
            },
            "files": [
                "src/01-install.ts"
            ]
        }

    Ensuite on aura plus qu'à taper :
        * npx tsc
    Ou si on veut que le terminal surveille tout changement:
        * npx tsc --watch
*/
const btn = document.querySelector("#compte");
let i = 0;
btn?.addEventListener("click", () => {
    i++;
    // btn.textContent = i;
    btn.textContent = i.toString();
});
/*
    Par défaut typescript transpile vers ES3 qui est assez vieux.
    On peut modifier cela en ajoutant à notre tsconfig :
        * target: ESNext (ou autre version de ES)
    On peut profiter d'être ici pour ajouter des options supplémentaires comme :
        * noEmitOnError: true
    Ou :
        * strict : true
*/ 
