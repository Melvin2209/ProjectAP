-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 15 jan. 2025 à 11:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `marieteam`
--

-- --------------------------------------------------------

--
-- Structure de la table `bateau`
--

CREATE TABLE `bateau` (
  `Id_Bateau` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `longueur` double DEFAULT NULL,
  `largeur` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `bateau`
--

INSERT INTO `bateau` (`Id_Bateau`, `nom`, `longueur`, `largeur`) VALUES
(1, 'Kor Ant', 37.2, 8.6),
(2, 'Ar Solen', 25, 7),
(3, 'Al xi', 30.5, 8);

-- --------------------------------------------------------

--
-- Structure de la table `bateaufret`
--

CREATE TABLE `bateaufret` (
  `Id_Bateau` int(11) NOT NULL,
  `capacite_chargement` double DEFAULT NULL,
  `type_Fret` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bateauvoyageur`
--

CREATE TABLE `bateauvoyageur` (
  `Id_Bateau` int(11) NOT NULL,
  `vitesse` int(11) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `bateauvoyageur`
--

INSERT INTO `bateauvoyageur` (`Id_Bateau`, `vitesse`, `image`) VALUES
(1, 26, 'kor_ant.jpg'),
(2, 20, 'ar_solen.jpg'),
(3, 18, 'al_xi.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `lettre` varchar(50) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`lettre`, `libelle`) VALUES
('A', 'Passager'),
('B', 'Véh.inf.2m'),
('C', 'Véh.sup.2m');

-- --------------------------------------------------------

--
-- Structure de la table `contenir`
--

CREATE TABLE `contenir` (
  `lettre` varchar(50) NOT NULL,
  `Id_Bateau` int(11) NOT NULL,
  `capaciteMax` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contenir`
--

INSERT INTO `contenir` (`lettre`, `Id_Bateau`, `capaciteMax`) VALUES
('A', 1, 238),
('A', 2, 276),
('A', 3, 250),
('B', 1, 11),
('B', 2, 5),
('B', 3, 3),
('C', 1, 2),
('C', 2, 1),
('C', 3, 0);

-- --------------------------------------------------------

--
-- Structure de la table `enregistrer`
--

CREATE TABLE `enregistrer` (
  `lettre` varchar(50) NOT NULL,
  `Id_Type` int(11) NOT NULL,
  `Id_Reservation` int(11) NOT NULL,
  `quantite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `equipement`
--

CREATE TABLE `equipement` (
  `id_Equipement` int(11) NOT NULL,
  `libelle_Equip` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `equipement`
--

INSERT INTO `equipement` (`id_Equipement`, `libelle_Equip`) VALUES
(1, 'Accès Handicapé'),
(2, 'Bar'),
(3, 'Pont Promenade'),
(4, 'Salon Vidéo');

-- --------------------------------------------------------

--
-- Structure de la table `liaison`
--

CREATE TABLE `liaison` (
  `code` varchar(50) NOT NULL,
  `distance` decimal(15,2) DEFAULT NULL,
  `Id_Port` int(11) NOT NULL,
  `Id_Port_1` int(11) NOT NULL,
  `Id_Secteur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `liaison`
--

INSERT INTO `liaison` (`code`, `distance`, `Id_Port`, `Id_Port_1`, `Id_Secteur`) VALUES
('LIA001', 8.30, 1, 2, 1),
('LIA002', 8.00, 1, 3, 1),
('LIA003', 7.70, 6, 7, 3);

-- --------------------------------------------------------

--
-- Structure de la table `periode`
--

CREATE TABLE `periode` (
  `Id_Periode` int(11) NOT NULL,
  `dateDeb` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `periode`
--

INSERT INTO `periode` (`Id_Periode`, `dateDeb`, `dateFin`) VALUES
(1, '2024-01-01', '2024-06-15'),
(2, '2024-06-16', '2024-09-15'),
(3, '2024-09-16', '2024-12-31');

-- --------------------------------------------------------

--
-- Structure de la table `port`
--

CREATE TABLE `port` (
  `Id_Port` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `port`
--

INSERT INTO `port` (`Id_Port`, `nom`) VALUES
(1, 'Quiberon'),
(2, 'Le Palais'),
(3, 'Sauzon'),
(4, 'Vannes'),
(5, 'Port St Gildas'),
(6, 'Lorient'),
(7, 'Port-Tudy');

-- --------------------------------------------------------

--
-- Structure de la table `proposer`
--

CREATE TABLE `proposer` (
  `Id_Bateau` int(11) NOT NULL,
  `id_Equipement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `proposer`
--

INSERT INTO `proposer` (`Id_Bateau`, `id_Equipement`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `Id_Reservation` int(11) NOT NULL,
  `Id_Utilisateur` int(11) NOT NULL,
  `num` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `secteur`
--

CREATE TABLE `secteur` (
  `Id_Secteur` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `secteur`
--

INSERT INTO `secteur` (`Id_Secteur`, `nom`) VALUES
(1, 'Belle-Ile-en-Mer'),
(2, 'Houat'),
(3, 'Ile de Groix');

-- --------------------------------------------------------

--
-- Structure de la table `tarifer`
--

CREATE TABLE `tarifer` (
  `Id_Periode` int(11) NOT NULL,
  `lettre` varchar(50) NOT NULL,
  `Id_Type` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `tarif` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tarifer`
--

INSERT INTO `tarifer` (`Id_Periode`, `lettre`, `Id_Type`, `code`, `tarif`) VALUES
(1, 'A', 1, 'LIA001', 18.00),
(2, 'B', 1, 'LIA002', 95.00),
(3, 'C', 2, 'LIA003', 226.00);

-- --------------------------------------------------------

--
-- Structure de la table `traversee`
--

CREATE TABLE `traversee` (
  `num` varchar(50) NOT NULL,
  `dateT` date DEFAULT NULL,
  `heure` time DEFAULT NULL,
  `code` varchar(50) NOT NULL,
  `Id_Bateau` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `traversee`
--

INSERT INTO `traversee` (`num`, `dateT`, `heure`, `code`, `Id_Bateau`) VALUES
('TR001', '2024-07-10', '07:45:00', 'LIA001', 1),
('TR002', '2024-07-10', '09:15:00', 'LIA002', 2),
('TR003', '2024-07-11', '10:50:00', 'LIA003', 3);

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `lettre` varchar(50) NOT NULL,
  `Id_Type` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`lettre`, `Id_Type`, `libelle`) VALUES
('A', 1, 'Adulte'),
('A', 2, 'Junior 8 à 18 ans'),
('A', 3, 'Enfant 0 à 7 ans'),
('B', 1, 'Voiture long.inf.4m'),
('B', 2, 'Voiture long.inf.5m'),
('C', 1, 'Fourgon'),
('C', 2, 'Camping Car'),
('C', 3, 'Camion');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `Id_Utilisateur` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mdp` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`Id_Utilisateur`, `nom`, `prenom`, `email`, `mdp`) VALUES
(1, 'Doe', 'John', 'john.doe@example.com', 'password123'),
(2, 'Smith', 'Anna', 'anna.smith@example.com', 'secure456'),
(3, 'DUpuis', 'Melvin', 'dsmelvin22@gmail.com', 'dza');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bateau`
--
ALTER TABLE `bateau`
  ADD PRIMARY KEY (`Id_Bateau`);

--
-- Index pour la table `bateaufret`
--
ALTER TABLE `bateaufret`
  ADD PRIMARY KEY (`Id_Bateau`);

--
-- Index pour la table `bateauvoyageur`
--
ALTER TABLE `bateauvoyageur`
  ADD PRIMARY KEY (`Id_Bateau`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`lettre`);

--
-- Index pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD PRIMARY KEY (`lettre`,`Id_Bateau`),
  ADD KEY `Id_Bateau` (`Id_Bateau`);

--
-- Index pour la table `enregistrer`
--
ALTER TABLE `enregistrer`
  ADD PRIMARY KEY (`lettre`,`Id_Type`,`Id_Reservation`),
  ADD KEY `Id_Reservation` (`Id_Reservation`);

--
-- Index pour la table `equipement`
--
ALTER TABLE `equipement`
  ADD PRIMARY KEY (`id_Equipement`);

--
-- Index pour la table `liaison`
--
ALTER TABLE `liaison`
  ADD PRIMARY KEY (`code`),
  ADD KEY `Id_Port` (`Id_Port`),
  ADD KEY `Id_Port_1` (`Id_Port_1`),
  ADD KEY `Id_Secteur` (`Id_Secteur`);

--
-- Index pour la table `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`Id_Periode`);

--
-- Index pour la table `port`
--
ALTER TABLE `port`
  ADD PRIMARY KEY (`Id_Port`);

--
-- Index pour la table `proposer`
--
ALTER TABLE `proposer`
  ADD PRIMARY KEY (`Id_Bateau`,`id_Equipement`),
  ADD KEY `id_Equipement` (`id_Equipement`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`Id_Reservation`),
  ADD KEY `Id_Utilisateur` (`Id_Utilisateur`),
  ADD KEY `num` (`num`);

--
-- Index pour la table `secteur`
--
ALTER TABLE `secteur`
  ADD PRIMARY KEY (`Id_Secteur`);

--
-- Index pour la table `tarifer`
--
ALTER TABLE `tarifer`
  ADD PRIMARY KEY (`Id_Periode`,`lettre`,`Id_Type`,`code`),
  ADD KEY `lettre` (`lettre`,`Id_Type`),
  ADD KEY `code` (`code`);

--
-- Index pour la table `traversee`
--
ALTER TABLE `traversee`
  ADD PRIMARY KEY (`num`),
  ADD KEY `code` (`code`),
  ADD KEY `Id_Bateau` (`Id_Bateau`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`lettre`,`Id_Type`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`Id_Utilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `Id_Utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bateaufret`
--
ALTER TABLE `bateaufret`
  ADD CONSTRAINT `bateaufret_ibfk_1` FOREIGN KEY (`Id_Bateau`) REFERENCES `bateau` (`Id_Bateau`);

--
-- Contraintes pour la table `bateauvoyageur`
--
ALTER TABLE `bateauvoyageur`
  ADD CONSTRAINT `bateauvoyageur_ibfk_1` FOREIGN KEY (`Id_Bateau`) REFERENCES `bateau` (`Id_Bateau`);

--
-- Contraintes pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD CONSTRAINT `contenir_ibfk_1` FOREIGN KEY (`lettre`) REFERENCES `categorie` (`lettre`),
  ADD CONSTRAINT `contenir_ibfk_2` FOREIGN KEY (`Id_Bateau`) REFERENCES `bateau` (`Id_Bateau`);

--
-- Contraintes pour la table `enregistrer`
--
ALTER TABLE `enregistrer`
  ADD CONSTRAINT `enregistrer_ibfk_1` FOREIGN KEY (`lettre`,`Id_Type`) REFERENCES `type` (`lettre`, `Id_Type`),
  ADD CONSTRAINT `enregistrer_ibfk_2` FOREIGN KEY (`Id_Reservation`) REFERENCES `reservation` (`Id_Reservation`);

--
-- Contraintes pour la table `liaison`
--
ALTER TABLE `liaison`
  ADD CONSTRAINT `liaison_ibfk_1` FOREIGN KEY (`Id_Port`) REFERENCES `port` (`Id_Port`),
  ADD CONSTRAINT `liaison_ibfk_2` FOREIGN KEY (`Id_Port_1`) REFERENCES `port` (`Id_Port`),
  ADD CONSTRAINT `liaison_ibfk_3` FOREIGN KEY (`Id_Secteur`) REFERENCES `secteur` (`Id_Secteur`);

--
-- Contraintes pour la table `proposer`
--
ALTER TABLE `proposer`
  ADD CONSTRAINT `proposer_ibfk_1` FOREIGN KEY (`Id_Bateau`) REFERENCES `bateauvoyageur` (`Id_Bateau`),
  ADD CONSTRAINT `proposer_ibfk_2` FOREIGN KEY (`id_Equipement`) REFERENCES `equipement` (`id_Equipement`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`Id_Utilisateur`) REFERENCES `utilisateur` (`Id_Utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`num`) REFERENCES `traversee` (`num`);

--
-- Contraintes pour la table `tarifer`
--
ALTER TABLE `tarifer`
  ADD CONSTRAINT `tarifer_ibfk_1` FOREIGN KEY (`Id_Periode`) REFERENCES `periode` (`Id_Periode`),
  ADD CONSTRAINT `tarifer_ibfk_2` FOREIGN KEY (`lettre`,`Id_Type`) REFERENCES `type` (`lettre`, `Id_Type`),
  ADD CONSTRAINT `tarifer_ibfk_3` FOREIGN KEY (`code`) REFERENCES `liaison` (`code`);

--
-- Contraintes pour la table `traversee`
--
ALTER TABLE `traversee`
  ADD CONSTRAINT `traversee_ibfk_1` FOREIGN KEY (`code`) REFERENCES `liaison` (`code`),
  ADD CONSTRAINT `traversee_ibfk_2` FOREIGN KEY (`Id_Bateau`) REFERENCES `bateau` (`Id_Bateau`);

--
-- Contraintes pour la table `type`
--
ALTER TABLE `type`
  ADD CONSTRAINT `type_ibfk_1` FOREIGN KEY (`lettre`) REFERENCES `categorie` (`lettre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
