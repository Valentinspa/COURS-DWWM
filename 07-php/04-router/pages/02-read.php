<?php
session_start();
require("../ressources/service/_pdo.php");
$pdo = connexionPDO();
/* 
    Aucune donnée n'est entré par l'utilisateur, donc je n'ai
    donc aucun risque, je peux lancer ma requête 
    sans aucune préparation avec "query"
*/
$sql = $pdo->query("SELECT idUser, username FROM users");
    /* 
        Quand on souhaite récupérer plusieurs résultats et non un seul
        on utilisera "fetchAll" au lieu de "fetch"
    */
$users = $sql->fetchAll();
// ajouter après update.
if(isset($_SESSION["flash"])){
    $flash = $_SESSION["flash"];
    unset($_SESSION["flash"]);
}
$title = " CRUD - Read ";
require("../ressources/template/_header.php");
// Si on a trouvé des utilisateurs on affiche un tableau
if(isset($flash)):
    ?>
    <div class="flash">
        <?php echo $flash ?>
    </div>
<?php endif; ?>

<h3>Liste des utilisateurs</h3>

<?php if($users): ?>
<table>
    <thead>
        <tr>
            <th>id</th>
            <th>username</th>
            <th>action</th>
        </tr>
    </thead>
    <!-- Pour chacun des utilisateurs trouvé, on ajoute une ligne -->
    <?php foreach($users as $row):?>
    <tr>
        <td><?php echo $row["idUser"] ?></td>
        <td><?php echo $row["username"] ?></td>
        <td>
            <a href="/04-router/blog?id=<?php echo $row["idUser"] ?>">
                Voir
            </a>
            <!-- On affiche le bouton éditer que si l'utilisateur est connecté -->
            <?php if(isset($_SESSION["idUser"]) && ($_SESSION["idUser"]) == $row["idUser"]): ?>
            &nbsp;|&nbsp;
            <a href="/04-router/profil?id=<?php echo $row["idUser"] ?>">
                Éditer.
            </a>
            &nbsp;|&nbsp;
            
            <a href="/04-router/profil/supprimer?id=<?php echo $row["idUser"] ?>">
                Supprimer.
            </a>
            <?php endif; ?>
        </td>
    </tr>
    <?php endforeach; ?>
</table>
<!-- Sinon on affiche un message -->
<?php else: ?>
    <p>Aucun utilisateur trouvé</p>
<?php 
endif;
require("../ressources/template/_footer.php");
?>