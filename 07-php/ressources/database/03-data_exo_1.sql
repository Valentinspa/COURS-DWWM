-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : bddsql
-- Généré le : mar. 10 juin 2025 à 11:03
-- Version du serveur : 11.7.2-MariaDB-ubu2404
-- Version de PHP : 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog`
--

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`idMessage`, `message`, `createdAt`, `editedAt`, `idUser`) VALUES
(1, 'Mon super message', '2025-06-10 11:03:19', NULL, 1),
(2, 'Un autre message très interessant', '2025-06-10 11:03:38', NULL, 1);

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `username`, `email`, `password`, `createdAt`) VALUES
(1, 'Maurice', 'mo@gmail.com', 'banane', '2025-06-10 09:37:29');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
