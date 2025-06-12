<?php

require "../../ressources/service/_pdo.php";

$username = "";
$password = "";
$errors = [];

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['logIn'])) {
    $pdo = connexionPDO();
    $user;

    // Username verification
    if(empty($_POST['username'])) {
        $errors['username'] = "Please enter your username.";
    } else {
        $username = trim($_POST['username']);
        $sql = $pdo -> prepare("SELECT * FROM users WHERE username=?");
        $sql -> execute([$username]);
        $user = $sql->fetch();
    }

    // Password verification
    if(empty($_POST['password'])) {
        $errors['password'] = "Please enter your password.";
    } else {
        $password = trim($_POST["password"]);
        if(!$user || !password_verify($password, $user['password'])) {
            $errors['password'] = "Incorrect username/password.";
        }
    }

    if(empty($errors)) {
        $_SESSION["user_id"] = $user['idUser'];
        $_SESSION["username"] = $user['username'];
        $_SESSION["logged_in"] = true;
        header("Location: ./messages.php");
    }
}

?>

<h1>Log in</h1>
<form action="./login.php" method="post">
    <fieldset>
        <!-- Username -->
        <label for="username">Username</label><br>
        <input type="text" name="username" id="username" placeholder="Enter your username">
        <br>
        <!-- Password -->
        <label for="password">Password</label><br>
        <input type="password" name="password" id="password" placeholder="Enter your password">
        <br>
        <!-- Error -->
        <?php if(!empty($errors)): ?>
            <ul>
                <?php if (!empty($errors["username"])): ?>
                    <li><?= $errors["username"] ?></li>
                <?php endif; ?>
                <?php if (!empty($errors["password"])): ?>
                    <li><?= $errors["password"] ?></li>
                <?php endif; ?>
            </ul>
        <?php endif; ?>
        <br>
        <!-- Submit -->
        <input type="submit" value="Log in" name="logIn">
    </fieldset>
</form>