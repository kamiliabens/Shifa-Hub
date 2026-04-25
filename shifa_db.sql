-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 25 avr. 2026 à 16:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `shifa_db`
--
CREATE DATABASE IF NOT EXISTS `shifa_db`;
USE `shifa_db`;

-- --------------------------------------------------------

--
-- Structure de la table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `expiry_date` varchar(255) DEFAULT NULL,
  `wilaya` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `taken_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `medicines`
--

INSERT INTO `medicines` (`id`, `user_id`, `item_name`, `category`, `expiry_date`, `wilaya`, `image_path`, `status`, `taken_by`) VALUES
(17, 5, 'Panadol ', 'medicine', '20/2/2025', 'laghouat', '1776961800_Panadol Extra 455x455.avif', 'approved', NULL),
(18, 5, 'blood-glucose-metere', 'equipment', '20/2/2025', 'laghouat', '1776961835_blood-glucose-metere.webp', 'approved', NULL),
(19, 5, 'Crutches', 'equipment', '20/2/2025', 'laghouat', '1776961874_Crutches.jpg', 'approved', NULL),
(20, 5, 'doliprane', 'medicine', '20/2/2025', 'laghouat', '1776961908_doliprane.jpg', 'approved', NULL),
(21, 5, 'measuring blood pressure', 'equipment', '20/2/2025', 'laghouat', '1776961949_measuring blood pressure.jpg', 'approved', NULL),
(22, 5, 'oxygen machine', 'equipment', '20/2/2025', 'laghouat', '1776961986_oxygen machine.webp', 'approved', NULL),
(23, 5, 'ventolin', 'medicine', '20/2/2025', 'laghouat', '1776962014_ventolin.jpg', 'approved', NULL),
(24, 5, 'vit_c_zinc_v1', 'medicine', '20/2/2025', 'laghouat', '1776962044_vit_c_zinc_v1.png', 'approved', NULL),
(25, 5, 'vitamineD3', 'medicine', '20/2/2025', 'laghouat', '1776962068_vitamineD3.jpg', 'approved', NULL),
(26, 5, 'wheelchair', 'equipment', '20/2/2025', 'laghouat', '1776962096_wheelchair.jpg', 'approved', NULL),
(39, 6, 'vitamineD3', 'medicine', '20/2/2025', 'laghouat', '1776967601_1776962068_vitamineD3.jpg', 'taken', 5);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(5, 'wissu', 'w.chahed.inf@lagh-univ.dz', 'wissal'),
(6, 'kamillia', 'k.benabdeslam.inf@lagh-univ.dz', 'kamillia'),
(7, 'safia', 'sa.rahmani.inf@lagh-univ.dz', 'safia'),
(8, 'chahra', 'c.hattabi.inf@lagh-univ.dz', 'chahra'),
(9, 'imane', 'i.kouidri.inf@lagh-univ.dz', 'imane');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
