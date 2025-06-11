<?php 
// Je require ma fonction de connexion à la BDD
require "../ressources/service/_pdo.php";

// je me connecte à la BDD
$db = connexionPDO();

// je lance ma requête
$sql = $db->query("SELECT idUser, username FROM users");

// Je récupère tous mes utilisateurs
$users = $sql->fetchAll();
/* 
    CRUD signifie 
        Create
        Read
        Update
        Delete
    Ce sont les actions qui devraient être possible sur chaque table de la BDD.
*/
$title = " CRUD - Liste Utilisateur";
require "../ressources/template/_header.php";

if($users):
?>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>username</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Mes données sont sous forme de tableau (fetchAll) donc je vais devoir faire une boucle pour toute les afficher : -->
            <?php foreach($users as $row): ?>
                <tr>
                    <td><?= $row["idUser"] ?></td>
                    <td><?= $row["username"] ?></td>
                    <td>
                        <a href="TODO">Voir Blog</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php else:?>
    <p>Aucun utilisateur disponible.</p>
<?php endif;
require "../ressources/template/_footer.php";
?>
