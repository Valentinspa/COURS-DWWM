<?php 
// Après avoir créé notre AbstractController.php
$this->getFlash();

if($users):
?>
<table>
    <thead>
        <tr>
            <th>id</th>
            <th>username</th>
            <th>action</th>
        </tr>
    </thead>
    <?php foreach($users as $row):?>
    <tr>
        <td><?php echo $row->getIdUser() ?></td>
        <td><?php echo $row->getUsername() ?></td>
        <td>
            <a href="./messages?id=<?php echo $row->getIdUser() ?>">
                Voir
            </a>
            <?php if(isset($_SESSION["idUser"]) && ($_SESSION["idUser"]) == $row->getIdUser()): ?>
            &nbsp;|&nbsp;
            <a href="./user/update?id=<?php echo $row->getIdUser() ?>">
                Éditer.
            </a>
            &nbsp;|&nbsp;
            <a href="./user/delete?id=<?php echo $row->getIdUser() ?>">
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
?>