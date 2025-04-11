"use strict";

/* 
    Ecmascript permet l'export/import de fonctions et objets (entre autres choses).
    Cela va permettre de diviser notre projet en plusieurs fichiers afin de s'y retrouver plus facilement.
    Pour utiliser l'import/export notre fichier chargé dans le html doit inclure l'attribut suivant :
        * type="module"

    ? Export :
    Dans les fichiers non chargé par le HTML, on ira placer le mot clef "export" ou "export default" devant les fonctions que l'on souhaite utiliser ailleurs.
    On peut exporter autant d'élément que l'on souhaite, mais un seul par fichier peut avoir "export default".

    ? Import :
    Par défaut, l'import ne peut se trouver qu'au niveau le plus haut du code. c'est à dire, par dans une fonction, une condition, une boucle...

    Pour importer un élément, on utilisera le mot clef "import" suivi d'entre accolade les éléments à importer séparés de virgules,
    Puis le mot clef "from" suivi du chemin vers le fichier.

    import { salut, coucou } from "./salutation.js";
        La première fois qu'on importe un fichier, si il contient du code, il sera exécuté.

    import b, { salut, coucou } from "./salutation.js";
        Pour importé l'élément par défaut, il faut placer un nom (n'importe lequel) avant les accolades.

    import b, { salut, coucou as c } from "./salutation.js";
        Si besoin, je peux renommer un élément importé avec le mot clef "as" suivi du nouveau nom.

    import * as sa from "./salutation.js";
        "* as unNom" permet d'importer tout les exports du fichier rassemblé dans un objet.
*/
import * as sa from "./salutation.js";

// b();
// salut();
// coucou("Maurice");
// c("Maurice");

console.log(sa);
sa.coucou("Maurice");
sa.salut();
sa.default();

/* 
    Si notre import doit dépendre d'une action utilisateur, une condition ou autre.
    On n'utilisera pas le mot clef "import" mais la fonction "import()"

    Celle ci prendra en paramètre le chemin vers le fichier.
    et retournera une "promesse" qui une fois réalisé rendra un objet contenant tous les exports.
*/
hello();
async function hello() 
{
    const salut = await import("./salutation.js");
    salut.default();
    salut.coucou("Pierre");
    salut.salut();   
}