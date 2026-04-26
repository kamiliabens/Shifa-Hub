-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 26 avr. 2026 à 14:22
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
(41, 10, 'Alledra24', 'medicine', '20/2/2025', 'laghouat', '1777203296_alledra24.webp', 'approved', NULL),
(42, 10, 'Panadol Extra', 'medicine', '21/2/2025', 'laghouat', '1777203332_panadol.jpg', 'approved', NULL),
(43, 10, 'wheelchair', 'equipment', '21/2/2025', 'laghouat', '1777203394_wheelchair.webp', 'approved', NULL),
(44, 11, 'Allerfin', 'medicine', '20/2/2026', 'tizi ouzou', '1777203493_allerfin.webp', 'approved', NULL),
(45, 11, 'blood measurement', 'equipment', '20/2/2026', 'tizi ouzou', '1777203528_blood measurement.jpg', 'approved', NULL),
(46, 11, 'Cetamol', 'medicine', '25/2/2026', 'tizi ouzou', '1777203561_cetamol.jpg', 'approved', NULL),
(47, 11, 'Ventolin', 'medicine', '25/6/2026', 'tizi ouzou', '1777203663_ventolin.jpg', 'approved', NULL),
(48, 14, 'Claritine', 'medicine', '25/2/2026', 'tyaret', '1777203899_claritine.webp', 'approved', NULL),
(49, 14, 'Crutches ', 'equipment', '21/2/2025', 'tyaret', '1777203963_crutches (2).jpg', 'taken', 11),
(50, 14, 'Feroglobin', 'medicine', '25/6/2026', 'tyaret', '1777204091_feroglobin.jpeg', 'approved', NULL),
(51, 14, 'Measuring blood sugar', 'medicine', '20/2/2026', 'tyaret', '1777204135_measuring blood sugar.jpg', 'approved', NULL),
(52, 12, 'Excedrin', 'medicine', '01/6/2026', 'laghouat', '1777204227_excedrin.jpg', 'approved', NULL),
(53, 12, 'Crutches ', 'equipment', '01/6/2026', 'laghouat', '1777204257_Crutches.jpg', 'approved', NULL),
(54, 12, 'Loratadine', 'medicine', '01/6/2026', 'laghouat', '1777204313_loratadine.webp', 'approved', NULL),
(55, 12, 'oxygen vakum', 'equipment', '25/2/2026', 'laghouat', '1777204376_oxygen vakum.webp', 'taken', 11),
(56, 13, 'Seretide', 'medicine', '01/6/2026', 'laghouat', '1777204422_seretide.jpg', 'approved', NULL),
(57, 13, 'Xydolgyn', 'medicine', '21/2/2025', 'laghouat', '1777204449_xydolgyn.jpg', 'approved', NULL),
(58, 13, 'oxygen machine', 'equipment', '20/2/2026', 'laghouat', '1777204472_oxygen_at_home.jpg', 'taken', 11),
(59, 13, 'Panadol Woman', 'medicine', '20/2/2026', 'laghouat', '1777204526_Panadol_Woman.avif', 'approved', NULL),
(60, 10, 'Vitamine-E', 'medicine', '20/2/2026', 'laghouat', '1777204776_Nutrigest-Vitamine-E.webp', 'approved', NULL),
(61, 10, 'Vitamine-c', 'medicine', '01/6/2026', 'laghouat', '1777204808_vitamine-c.jpg', 'approved', NULL),
(62, 10, 'Vitamine-D3', 'medicine', '21/2/2025', 'laghouat', '1777204860_vitamine-d3-.jpg', 'approved', NULL),
(63, 10, 'Srepsils', 'medicine', '01/6/2026', 'laghouat', '1777204937_Srepsils.jpg', 'taken', 11),
(64, 11, 'Biafine', 'medicine', '01/6/2026', 'tizi ouzou', '1777205247_Biafine.webp', 'approved', NULL),
(65, 11, 'Flamazine', 'medicine', '21/2/2025', 'tizi ouzou', '1777205282_Flamazine.jpg', 'taken', 10),
(66, 11, 'Excedrin', 'medicine', '20/2/2026', 'tizi ouzou', '1777205303_excedrin.jpg', 'approved', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`) VALUES
(10, 'wissu', 'w.chahed.inf@lagh-univ.dz', 'wissal', '0000000000'),
(11, 'kamillia', 'k.benabdeslam.inf@lagh-univ.dz', 'kamillia', '0000000000'),
(12, 'safia', 'sa.rahmani.inf@lagh-univ.dz', 'safia', '0000000000'),
(13, 'imane', 'i.kouidri.inf@lagh-univ.dz', 'imane', '0000000000'),
(14, 'chahra', 'c.hattabi.inf@lagh-univ.dz', 'chahra', '0000000000');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
