-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2025 at 10:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blood_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `approved_donations`
--

CREATE TABLE `approved_donations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `req_id` int(11) NOT NULL DEFAULT 0,
  `acceptance_date` date DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `rejection_date` date DEFAULT NULL,
  `approval_date` date DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0=accepted\r\n1=>confirmed\r\n2=>rejected',
  `rejected_by` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `approved_donations`
--

INSERT INTO `approved_donations` (`id`, `user_id`, `req_id`, `acceptance_date`, `rejection_reason`, `rejection_date`, `approval_date`, `status`, `rejected_by`) VALUES
(5, 5, 5, '2025-03-17', 'dgfsdf', NULL, '2025-03-17', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `zuraud_donation_request`
--

CREATE TABLE `zuraud_donation_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bloodGroup` varchar(10) DEFAULT NULL,
  `patientName` varchar(25) DEFAULT NULL,
  `attendeePhone` varchar(15) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `requiredDate` date DEFAULT NULL,
  `additionalNote` varchar(255) DEFAULT NULL,
  `criticalStatus` tinyint(1) NOT NULL DEFAULT 0,
  `address` varchar(255) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `state` varchar(25) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=>new\r\n1=>accepted by doner\r\n2=>approved\r\n3=>rejected',
  `doner` int(11) NOT NULL DEFAULT 0,
  `request_date` datetime NOT NULL DEFAULT current_timestamp(),
  `approve_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zuraud_donation_request`
--

INSERT INTO `zuraud_donation_request` (`id`, `user_id`, `bloodGroup`, `patientName`, `attendeePhone`, `unit`, `requiredDate`, `additionalNote`, `criticalStatus`, `address`, `latitude`, `longitude`, `pincode`, `state`, `city`, `status`, `doner`, `request_date`, `approve_date`) VALUES
(5, 4, 'A-', 'test', '8888888888', '1', '2025-03-20', '', 1, 'test', '25.4476288', '81.8577408', '211013', 'Uttar Pradesh', 'Allahabad', 2, 5, '2025-03-17 10:50:47', '2025-03-17 10:52:10'),
(6, 4, 'A-', 'test 2', '9999999999', '3', '2025-03-20', '', 1, 'test', '25.4497216', '81.862188', '211013', 'Uttar Pradesh', 'Allahabad', 0, 0, '2025-03-17 11:01:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zuraud_doner`
--

CREATE TABLE `zuraud_doner` (
  `id` int(11) NOT NULL,
  `uniqueId` varchar(25) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `bloodGroup` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `state` varchar(25) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `reg_status` tinyint(1) NOT NULL DEFAULT 0,
  `delete_status` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `otp` varchar(10) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zuraud_doner`
--

INSERT INTO `zuraud_doner` (`id`, `uniqueId`, `name`, `email`, `phone`, `dob`, `gender`, `bloodGroup`, `password`, `address`, `latitude`, `longitude`, `pincode`, `state`, `city`, `reg_status`, `delete_status`, `status`, `otp`, `otp_expiry`) VALUES
(4, 'BD1741766031', 'shubham', 'sbmksh@gmail.com', '9140380138', '1997-11-12', 'male', 'B+', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'phaphamau', '25.4476288', '81.8675712', '211013', 'Uttar Pradesh', 'Allahabad', 1, 0, 1, '', '0000-00-00 00:00:00'),
(5, 'BD1741851590', 'test', 'sbmksh2@gmail.com', '8181984673', '2023-12-12', 'male', 'A-', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'civil lines, prayagraj', '25.4476288', '81.8675712', '211013', 'Uttar Pradesh', 'Allahabad', 1, 0, 1, '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `zuraud_user`
--

CREATE TABLE `zuraud_user` (
  `id` int(11) NOT NULL,
  `type` text DEFAULT NULL,
  `u_name` text DEFAULT NULL,
  `u_email` text DEFAULT NULL,
  `u_phone` bigint(12) NOT NULL DEFAULT 0,
  `address` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `district` text DEFAULT NULL,
  `pin_code` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `dob` text DEFAULT NULL,
  `c_alter_phone` text DEFAULT NULL,
  `pass` text DEFAULT NULL,
  `reg_date` date NOT NULL DEFAULT current_timestamp(),
  `uid` text DEFAULT NULL,
  `avtar` text DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `otp` int(6) NOT NULL DEFAULT 0,
  `role` int(10) NOT NULL DEFAULT 0,
  `discription` text DEFAULT NULL,
  `delete_status` int(1) NOT NULL DEFAULT 0,
  `deleted_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zuraud_user`
--

INSERT INTO `zuraud_user` (`id`, `type`, `u_name`, `u_email`, `u_phone`, `address`, `state`, `district`, `pin_code`, `gender`, `dob`, `c_alter_phone`, `pass`, `reg_date`, `uid`, `avtar`, `status`, `otp`, `role`, `discription`, `delete_status`, `deleted_at`) VALUES
(4, 'Admin', 'Super Admin', 'admin@gmail.com', 9989999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', '2025-03-12', NULL, NULL, 1, 0, 0, NULL, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approved_donations`
--
ALTER TABLE `approved_donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zuraud_donation_request`
--
ALTER TABLE `zuraud_donation_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zuraud_doner`
--
ALTER TABLE `zuraud_doner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zuraud_user`
--
ALTER TABLE `zuraud_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `approved_donations`
--
ALTER TABLE `approved_donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `zuraud_donation_request`
--
ALTER TABLE `zuraud_donation_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `zuraud_doner`
--
ALTER TABLE `zuraud_doner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `zuraud_user`
--
ALTER TABLE `zuraud_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
