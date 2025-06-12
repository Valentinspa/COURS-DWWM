<?php

require "../../ressources/service/_pdo.php";

if(session_status() !== PHP_SESSION_ACTIVE)
{
    session_start();
    
}

if(isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true)
{
    
    header("Location: /");
    exit;
}

$username = "";
$password = "";
$errors = [];

if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['logIn'])) {
    $pdo = connexionPDO();
    $user = null;

    // Username verification
    if(empty($_POST['username'])) {
        $errors['username'] = "Veuillez entrer votre nom d'utilisateur.";
    } else {
        $username = trim($_POST['username']);
        $sql = $pdo -> prepare("SELECT * FROM users WHERE username=?");
        $sql -> execute([$username]);
        $user = $sql->fetch();
    }

    // Password verification
    if(empty($_POST['password'])) {
        $errors['password'] = "Veuillez entrer votre mot de passe.";
    } else {
        $password = trim($_POST["password"]);
        if(!$user || !password_verify($password, $user['password'])) {
            $errors['password'] = "Nom d'utilisateur/mot de passe incorrect.";
        }
    }

    if(empty($errors)) {
        $_SESSION["user_id"] = $user['idUser'];
        $_SESSION["username"] = $user['username'];
        $_SESSION["logged_in"] = true;
        header("Location: /");
        exit;
    }
}
?>
<h1>Connexion</h1>
<form action="./exercice-connexion.php" method="post">
    <fieldset>
        <!-- Nom d'utilisateur -->
        <label for="username">Nom d'utilisateur</label><br>
        <input type="text" name="username" id="username" placeholder="Entrez votre nom d'utilisateur" value="<?php echo htmlspecialchars($username); ?>">
        <br>
        <!-- Mot de passe -->
        <label for="password">Mot de passe</label><br>
        <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe">
        <br>
        <!-- Erreurs -->
        <?php if(!empty($errors)): ?>
            <ul>
                <?php foreach($errors as $error): ?>
                    <li><?php echo htmlspecialchars($error); ?></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        <!-- Bouton de connexion -->
        <button type="submit" name="logIn">Se connecter</button>
    </fieldset>
</form>