-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2021 at 11:28 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lorameter`
--

-- --------------------------------------------------------

--
-- Table structure for table `uimeter_dataantares`
--

CREATE TABLE `uimeter_dataantares` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ActiveTotal` varchar(10) NOT NULL,
  `ActivePlus` varchar(10) NOT NULL,
  `ActiveMinus` varchar(10) NOT NULL,
  `Voltage` varchar(10) NOT NULL,
  `Current` varchar(10) NOT NULL,
  `InstantPower` varchar(10) NOT NULL,
  `Frequency` varchar(10) NOT NULL,
  `PowerFactor` varchar(10) NOT NULL,
  `Status` varchar(10) NOT NULL,
  `no_meter` int(20) NOT NULL,
  `datetime` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `uimeter_datameter`
--

CREATE TABLE `uimeter_datameter` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `no_meter` int(20) NOT NULL,
  `nama_meter` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uimeter_datameter`
--

INSERT INTO `uimeter_datameter` (`id`, `no_meter`, `nama_meter`) VALUES
(1, 90111393, '90111393_UI-ATM-FMIPA1'),
(2, 90111393, '90111393_UI-ATM-FMIPA2'),
(3, 90111399, '90111399_UI-ATM-Balairung');

-- --------------------------------------------------------

--
-- Table structure for table `uimeter_rawdata`
--

CREATE TABLE `uimeter_rawdata` (
  `no_meter` varchar(50) NOT NULL,
  `rawdata` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uimeter_rawdata`
--

INSERT INTO `uimeter_rawdata` (`no_meter`, `rawdata`) VALUES
('90111393_UI-ATM-FMIPA2', '6893131190000068911d344393375a5b39335a5b393333333333a8558344333356333383b333339616');

-- --------------------------------------------------------

--
-- Table structure for table `uimeter_user`
--

CREATE TABLE `uimeter_user` (
  `no_meter` int(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uimeter_user`
--

INSERT INTO `uimeter_user` (`no_meter`, `password`, `nama`, `status`) VALUES
(9899898, 'john1234', 'abdul john', 1),
(99888922, 'kuki123', 'kuki kuku', 1),
(90111399, 'mipa123', 'FMIPA', 1),
(90111399, 'balairung123', 'Balairung', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `uimeter_dataantares`
--
ALTER TABLE `uimeter_dataantares`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `uimeter_datameter`
--
ALTER TABLE `uimeter_datameter`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `uimeter_dataantares`
--
ALTER TABLE `uimeter_dataantares`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `uimeter_datameter`
--
ALTER TABLE `uimeter_datameter`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
