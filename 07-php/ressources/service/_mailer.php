
<?php 
/* 
    __DIR__ est une constante qui contient le chemin vers le dossier où elle est appelé.
        Exemple : Ici elle contient le chemin complet vers le dossier "service"

    Cela me permet d'avoir un chemin toujours valide peu importe où sera require "_mailer.php".

    autoload.php cet autoloader va nous permettre d'éviter de require chaque bibliothèque que l'on va utiliser.
    Lorsqu'il verra qu'on appelle une nouvelle classe, il va tenter lui même de require le fichier correspondant.
*/

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__."/../../vendor/autoload.php";

/**
 * Envoi un mail
 *
 * @param string $from auteur du mail
 * @param string $to destinataire du mail
 * @param string $subject sujet du mail
 * @param string $body contenu du mail
 * @return string Message de validation ou d'erreur
 */
function sendMail(string $from, string $to, string $subject, string $body): string
{
    try
    {
        /* 
            Je crée un nouvel objet PHPMailer
            Le paramètre "true" permet d'activer les exceptions
        */
        $mail = new PHPMailer(true);
        /* 
            Active la connexion SMTP
            PHPMailer va se connecter à un serveur de mail via SMTP
            (Simple Mail Transfer Protocol)
        */
        $mail->isSMTP();
        /* 
            L'adresse du serveur de mail.
            N'importe quel serveur peut être utilisé, si vous avez un compte gmail, hotmail...
            Pour les test ici, on utilisera "mailtrap"
            Un service qui capture les mails et crée une mini boîte mail pour les tests.
        */
        $mail->Host = "smtp.mailtrap.io";
        // Active l'authentification via smtp
        $mail->SMTPAuth = true;
        // Port utilisé par le serveur de mail
        $mail->Port = 2525;
        // identifiant pour le serveur de mail
        $mail->Username = "5775f7f33ede50";
        $mail->Password = "a0b9074998f3a0";
        $mail->CharSet = 'UTF-8';
        // Indique de nombreux détails sur le déroulement de la requête
        // $mail->SMTPDebug = STMP::DEBUG_SERVER;
        // Permet de sécurisé l'envoi du mail (mais ne fonctionne pas avec mailtrap)
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTILS;

        // paramètre l'auteur du mail
        $mail->setFrom($from);
        // ajouter un destinataire
        $mail->addAddress($to);
        /* 
            On trouvera d'autres methodes comme :
                - addReplyTo
                - addCC
                - addBCC
                - addAttachment

            isHTML permet d'activer la gestion de HTML dans le mail
        */
        $mail->isHTML(true);
        // Paramètre le sujet du mail
        $mail->Subject = $subject;
        // Paramètre le contenu du mail
        $mail->Body = $body;
        /* 
            On peut optionnellement ajouté un "AltBody" qui sera affiché dans le cas où le HTML n'est pas géré par le destinataire.
        */
        $mail->send();
        echo "Message envoyé avec succès via Mailtrap";
        return "Email envoyé";
    }
    // catch(PHPMailer\PHPMailer\Exception $error)
    catch(Exception $error)
    {   echo "Erreur lors de l'envoi : {$mail->ErrorInfo}";
        return "Le mail n'a pas pu être envoyé. Mailer Error : {$error->ErrorInfo}";
    }
}

 sendMail("pierre@gmail.com", "maurice@gmail.com", "Test d'envoi de mon 1er mail avec Mailtrap", "<h1>Voila mon premier mail. j'espère que j'ai reussi</h1>");
?>