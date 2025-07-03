<?php 
$title = "Sommaire PHP";
require "./ressources/template/_header.php";
?>
    <ol class="sommaire">
        <li>
            <h3>01 - Syntaxe :</h3>
            <ol>
                <li>
                    <a href="./01-syntaxe/01-variable.php">Variables</a>
                </li>
                <li>
                    <a href="./01-syntaxe/02-condition.php">Conditions</a>
                </li>
                <li>
                    <a href="./01-syntaxe/03-boucle.php">Boucles</a>
                </li>
                <li>
                    <a href="./01-syntaxe/04-fonction.php">Fonctions</a>
                </li>
                <li>
                    <a href="./01-syntaxe/05-include.php">Include</a>
                </li>
                <li>
                    <a href="./01-syntaxe/06-goto.php">Goto</a>
                </li>
                <li>
                    <a href="./01-syntaxe/07-a-session.php">session</a>
                </li>
                <li>
                    <a href="./01-syntaxe/08-date.php">Dates</a>
                </li>
                <li>
                    <a href="./01-syntaxe/09-a-header.php">header</a>
                </li>
                <li>
                    <a href="./01-syntaxe/10-a-poo.php">POO part 1</a>
                </li>
                <li>
                    <a href="./01-syntaxe/10-b-poo.php">POO part 2</a>
                </li>
                <li>
                    <a href="./01-syntaxe/10-c-poo.php">POO part 3</a>
                </li>
            </ol>
        </li>
        <li>
            <h3>02 - Formulaire :</h3>
            <ol>
                <li>
                    <a href="./02-form/01-get.php">GET</a>
                </li>
                <li>
                    <a href="./02-form/02-post.php">POST</a>
                </li>
                <li>
                    <a href="./02-form/03-file.php">FILE</a>
                </li>
                <li>
                    <a href="./02-form/04-connexion.php">Connexion</a>
                </li>
                <li>
                    <a href="./02-form/05-deconnexion.php">Déconnexion</a>
                </li>
                <li>
                    <a href="./02-form/06-security.php">Sécurité</a>
                </li>
                <li>
                    <a href="./02-form/07-mail.php">Mailer</a>
                </li>
            </ol>
        </li> 
        <li>
            <h3>03 - CRUD :</h3>
            <ol>
                <li>
                    <a href="./03-crud/00-database.php">Connexion à la bdd</a>
                </li>
                <li>
                    <a href="./03-crud/02-read.php">Liste Utilisateur</a>
                </li>
                <li>
                    <a href="./03-crud/01-create.php">Inscription</a>
                </li>
                <?php if(isset($_SESSION["logged_in"])) :?>
                    <li>
                        <a href="./03-crud/03-update.php">Profil</a>
                    </li>
                    <li>
                        <a href="./03-crud/04-delete.php">Supprimer Compte</a>
                    </li>
                <?php endif; ?>
                <li>
                    <h4>Exercice :</h4>
                    <ul>
                        <?php if(!isset($_SESSION["logged_in"])) :?>
                        <li>
                            <a href="./03-crud/exercice/login.php">connexion</a>
                        </li>
                        <?php else: ?>
                        <li>
                            <a href="./03-crud/exercice/deconnexion.php">déconnexion</a>
                        </li>
                        <?php endif; ?>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <h3>04 - ROUTER :</h3>
            <ol>
                <li>
                    <a href="./04-router">Liste utilisateur</a>
                </li>
                <li>
                    <a href="./04-router/inscription">Inscription</a>
                </li>
                <?php if(isset($_SESSION["logged"])) :?>
                    <li>
                        <a href="./04-router/profil">Profil</a>
                    </li>
                    <li>
                        <a href="./04-router/profil/supprimer">Supprimer Compte</a>
                    </li>
                <?php endif; ?>
                <li>
                    <h4>Exercice :</h4>
                    <ul>
                        <?php if(!isset($_SESSION["logged"])) :?>
                            <li>
                                <a href="./04-router/connexion">connexion</a>
                            </li>
                            <?php else: ?>
                            <li>
                                <a href="./04-router/deconnexion">deconnexion</a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <h3>05 - MVC :</h3>
            <ol>
                <li>
                    <a href="./05-mvc/">Liste Utilisateur</a>
                </li>
                <li>
                    <a href="./05-mvc/inscription">Inscription</a>
                </li>
                
                <?php if(isset($_SESSION["logged"])) :?>
                    <li>
                        <a href="./05-mvc/profil">Profil</a>
                    </li>
                    <li>
                        <a href="./05-mvc/profil/supprimer">Supprimer Compte</a>
                    </li>
                <?php endif; ?>
                <li>
                    <h4>Exercice :</h4>
                    <ul>
                        <?php if(!isset($_SESSION["logged"])) :?>
                            <li>
                                <a href="./05-mvc/connexion">connexion</a>
                            </li>
                            <?php else: ?>
                            <li>
                                <a href="./05-mvc/deconnexion">deconnexion</a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <h3>06 - API :</h3>
            <ol>
                <li>
                    <a href="./06-api/front">Liste Utilisateur</a>
                </li>
                <li>
                    <a href="./06-api/front/inscription">Inscription</a>
                </li>
                <li>
                    <h4>Exercice :</h4>
                    <ul>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <h3>07 - POO :</h3>
            <ol>
                <li>
                    <a href="./07-poo/">Liste Utilisateur</a>
                </li>
                <li>
                    <a href="./07-poo/inscription">Inscription</a>
                </li>
                <li>
                    <h4>Exercice :</h4>
                    <ul>
                    </ul>
                </li>
            </ol>
        </li>
    </ol>
<?php 
require "./ressources/template/_footer.php";
?>