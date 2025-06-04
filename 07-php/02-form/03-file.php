<?php 
$error = $target_file = $target_name = $mime_type = $oldName = "";
// Chemin vers le dossier où seront téléversé les fichiers :
$target_dir = "./upload/";
// types mime permis par l'upload : 
$types_permis = ["image/png", "image/jpeg", "image/gif", "application/pdf"];

if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['upload']))
{
    // echo '<pre>'.print_r($_FILES, 1).'</pre>';

    // Je vérifie que le fichier a bien été téléversé.
    if(!is_uploaded_file($_FILES["monFichier"]["tmp_name"]))
    {
        $error = "Veuillez Sélectionner un fichier.";
    }
    else
    {
        /* 
            Basename va récupérer le dernier élément du nom du fichier.
            exemple :
                si le fichier s'appelle "pizza/margarita.png"
                on va récupérer uniquement "margarita.png"
        */
        $oldName = basename($_FILES["monFichier"]["name"]);
        /* 
            Si deux fichiers portent le même nom,
            celui qui vient d'être upload va remplacer celui qui était déjà présent.
            On va donc générer un nom unique à chaque fichier.
            Plusieurs solutions existent, ici je vais utiliser "uniqid"
        */
        $target_name = uniqid(time()."-", true) . "-".$oldName;
        // var_dump($target_name);

        // Je concatène le chemin vers le dossier d'upload avec le nouveau nom du fichier.
        $target_file = $target_dir . $target_name;

        // Je récupère le type mime du fichier :
        $mime_type = mime_content_type($_FILES["monFichier"]["tmp_name"]);

        // Je vérifie que l'on n'a pas déjà un fichier du même nom.
        if(file_exists($target_file))
        {
            $error = "Ce fichier existe déjà";
        }

        /* 
            Je vérifie que le fichier n'est pas trop lourd.
            ! ATTENTION, les paramètres de PHP, ont déjà une limite de taille d'envoie de fichier, et une limite de taille d'envoi de donnée en post. (voir fichier php.ini)
        */
        if($_FILES["monFichier"]["size"] > 500000)
        {
            $error = "Fichier trop volumineux";
        }
        //Je vérifie que le fichier utilise un type permis :
        if(!in_array($mime_type, $types_permis))
        {
            $error = "Type de fichier interdit";
        }

        if(empty($error))
        {
            /* 
                Je déplace le fichier depuis la zone temporaire, vers le dossier de téléversement. 
                La fonction move_uploaded_file retourne un boolean indiquant si le déplacement s'est bien passé
            */
            if(move_uploaded_file($_FILES["monFichier"]["tmp_name"], $target_file))
            {
                // On pourrait ici enregistrer les données du fichier dans la BDD.
            }else
            {
                $error = "Erreur lors du téléversement";
            }
        }
    }//fin vérification fichier
}

$title = " Upload / Téléversement ";
require("../ressources/template/_header.php");
?>

<form action="03-file.php" method="post" enctype="multipart/form-data">
    <label for="monFichier">Choisir un fichier :</label>
    <input type="file" name="monFichier" id="monFichier">
    <input type="submit" value="Envoyer" name="upload">
    <span class="error"><?= $error??"" ?></span>
</form>

<!-- Confirmation de l'upload : -->
<?php if(isset($_POST["upload"]) && empty($error)):?>
    <p>
        Votre fichier a bien été téléversé sous le nom "<?= $target_name ?>". <br>
        Vous pouvez le télécharger 
        <a 
            href="<?= $target_file ?>" 
            download="<?= $oldName ?>"
            >
            ICI
        </a>
    </p>
<?php 
endif;
require("../ressources/template/_footer.php");
?>