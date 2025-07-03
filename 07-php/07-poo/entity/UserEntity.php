<?php
namespace Entity;

use Classes\Abstract\AbstractEntity;
/* 
    L'entité représente une table de notre BDD
    Elle a des propriétés dont les noms correspondent aux colonnes de notre table.
*/
class UserEntity extends AbstractEntity
{
    private int $idUser = 0;
    private string $username = "";
    private string $email = "";
    private string $password = "";
    private ?string $passwordConfirm = NULL;
    private ?string $plainPassword = NULL;
    private string $createdAt = "";

    private const REGEX_PASS = "/^(?=.*[!?@#$%^&*+-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/";
    /**
     * Vérifier que les différents champs de l'entité sont valide.
     *
     * @return array tableau contenant les erreurs;
     */
    public function validate():array
    {
        $errors = [];
        // username :
        if(empty($this->username))
        {
            $errors["username"] = "Veuillez saisir un nom d'utilisateur";
        }
        elseif(!preg_match("/^[a-zA-Z'\s-]{2,25}$/", $this->username))
        {
            $errors["username"] = "Veuillez saisir un nom d'utilisateur valide";
        }
        // email :
        if(empty($this->email))
        {
            $errors["email"] = "Veuillez saisir un email";
        }
        elseif(!filter_var($this->email, FILTER_VALIDATE_EMAIL))
        {
            $errors["email"] = "Veuillez saisir un email valide";
        }
        // password et confirm password :
        if(empty($this->password) || !empty($this->plainPassword))
        {
            //password :
            if(empty($this->plainPassword))
            {
                $errors["password"] = "Veuillez saisir un mot de passe";
            }
            elseif(!preg_match(self::REGEX_PASS, $this->plainPassword))
            {
                $errors["password"] = "Veuillez saisir un mot de passe valide (toute la collection de caractères habituelle)";
            }
            //confirm password 
            if(empty($this->passwordConfirm))
            {
                $errors["passwordConfirm"] = "Veuillez confirmer votre mot de passe";
            }
            elseif($this->passwordConfirm !== $this->plainPassword)
            {
                $errors["passwordConfirm"] = "Veuillez saisir le même mot de passe";
            }

            if(empty($errors))
            {
                $this->password = password_hash($this->plainPassword, PASSWORD_DEFAULT);
                $this->plainPassword = "";
                $this->passwordConfirm = "";
            }
        }
        return $errors;
    }
    // Setter et Getter :
    # id :
    public function getIdUser(): int
    {
        return $this->idUser;
    }
    public function setIdUser(int $id):void
    {
        $this->idUser = (int)$id;
    }
    # username :
    public function getUsername(): string
    {
        return $this->username;
    }
    public function setUsername(string $username): void
    {
        $username = $this->cleanData($username);
        // Je change le nom d'utilisateur seulement si il est différent du nom actuel.
        if($username !== $this->username)
        {
            $this->username = $username;
        }
    }
    #email
    public function getEmail():string
    {
        return $this->email;
    }
    public function setEmail(string $email): void
    {
        $email = $this->cleanData($email);
        if($email !== $this->email)
        {
            $this->email = $email;
        }
    }
    #password
    public function getPassword(): string
    {
        return $this->password;
    }
    public function setPassword(string $pass): void
    {
        $pass = trim($pass);
        // J'utilise plainPassword tant que le mot de passe n'est pas haché.
        $this->plainPassword = $pass;
    }
    #confirm password 
    public function getPasswordConfirm(): ?string
    {
        return $this->passwordConfirm;
    }
    public function setPasswordConfirm(string $passwordConfirm):void
    {
        $this->passwordConfirm = trim($passwordConfirm);
    }
    #created At
    public function getCreatedAt(): string
    {
        return $this->createdAt;
    }
    public function setCreatedAt(string $createdAt): void
    {
        $this->createdAt = $createdAt;
    }
}