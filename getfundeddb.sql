-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2021 at 05:37 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `getfundeddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `commenterId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `commentText` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `commenterId`, `eventId`, `commentText`, `createdAt`, `updatedAt`) VALUES
(1, 3, 6, 'axaxaxaxaxaxax', '2021-01-04 04:45:01', '2021-01-04 04:45:01');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `donorId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `donationMessage` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `isApprove` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `amount`, `donorId`, `eventId`, `donationMessage`, `createdAt`, `updatedAt`, `isApprove`) VALUES
(1, 244, 3, 1, 'goodluck', '2020-11-03 00:00:00', '2021-01-03 18:38:22', 1),
(2, 200, 3, 3, 'goodluck', '2020-11-22 15:10:29', NULL, 0),
(3, 1560, 3, 1, 'goodluck', '2020-11-22 15:23:59', NULL, 0),
(4, 1560, 3, 1, 'thats good', '2020-11-22 15:23:59', '2021-01-03 18:00:16', 1),
(5, 100, 3, 1, 'thats good', '2020-11-22 15:53:43', NULL, 0),
(6, 100, 3, 1, 'thats good', '2020-11-22 15:53:43', NULL, 0),
(7, 560, 3, 1, 'cool', '2020-11-22 22:43:28', NULL, 0),
(8, 100, 3, 1, 'have a nice day', '2020-11-22 22:44:24', NULL, 0),
(9, 400, 3, 1, 'fine', '2020-11-22 22:57:10', NULL, 0),
(10, 1560, 3, 1, 'sfffeeeeeee', '2020-11-22 22:59:44', NULL, 0),
(11, 160, 1, 1, 'good luck..', '2020-11-25 03:54:07', NULL, 0),
(12, 100, 1, 3, 'good luck..', '2020-11-25 03:57:16', NULL, 0),
(13, 100, 1, 3, 'have a nice day', '2020-11-25 03:58:58', NULL, 0),
(14, 160, 1, 3, 'good luck..', '2020-11-25 04:03:37', NULL, 0),
(15, 100, 1, 3, 'good luck..', '2020-11-25 04:35:56', NULL, 0),
(16, 1560, 1, 1, 'good luck..', '2020-11-25 19:34:08', NULL, 0),
(17, 300, 1, 1, 'have a nice day', '2020-11-29 23:25:53', NULL, 0),
(18, 900, 3, 4, 'hy there...', '2021-01-03 17:39:38', '2021-01-03 18:28:06', 1),
(19, 10000, 3, 6, 'best of luck to you', '2021-01-04 04:28:38', '2021-01-04 04:28:38', 1),
(20, 900, 3, 6, 'best of luck t', '2021-01-04 04:29:30', '2021-01-04 04:29:30', 0),
(21, 5000, 1, 1, 'good luck', '2021-01-06 14:29:29', '2021-01-06 14:29:29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `eventcategories`
--

CREATE TABLE `eventcategories` (
  `id` int(11) NOT NULL,
  `categoryName` text NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `eventName` text NOT NULL,
  `creatorId` int(11) NOT NULL,
  `description` text NOT NULL,
  `categoryId` int(11) NOT NULL,
  `goalAmount` float NOT NULL,
  `goalDate` date NOT NULL,
  `isApproved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `eventPicture` text NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `managerId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `eventName`, `creatorId`, `description`, `categoryId`, `goalAmount`, `goalDate`, `isApproved`, `createdAt`, `eventPicture`, `updatedAt`, `managerId`) VALUES
(1, '1 taka meal', 3, 'we collect money  and distribute them to general mass. ', 5, 3101, '2020-11-24', 1, '2020-11-03 00:00:00', '4.png', '2021-01-04 08:18:21', 5),
(2, 'study for everyone', 5, 'we provide money to students who are intelligent.  ', 3, 3444, '2020-11-03', 0, '2020-11-22 23:49:24', '5.png', NULL, 3),
(3, 'orphan', 1, 'we support to orphan kids in there basic needs ', 1, 43333, '2020-11-04', 1, '2020-11-23 00:50:52', '3.png', '2021-01-05 08:21:10', 6),
(4, 'aaaaa', 3, 'aaaaaaaaaaaaaaaaaaaaaa', 1, 5000, '2021-01-05', 1, '2021-01-03 13:17:55', '2.jpg', '2021-01-04 08:13:55', 1),
(6, 'xxxxx', 3, 'xxxxxxxxxxxxxxxxxxxx', 1, 15000, '2021-01-05', 0, '2021-01-03 18:34:02', '1.jpg', '2021-01-04 08:08:31', 4),
(7, 'yyyyyyyy', 1, 'yyyyyyyyyyyyyyyyyyyyyyy', 1, 35000, '2021-01-06', 0, '2021-01-05 08:30:01', '5.png', '2021-01-05 08:30:01', 1),
(8, 'study', 1, 'i need money to study.', 0, 5000, '2021-01-12', 0, '2021-01-06 14:30:09', '3.png', '2021-01-06 14:30:09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `messageText` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `senderId`, `receiverId`, `messageText`, `createdAt`, `updatedAt`) VALUES
(1, 5, 1, 'hi there...', '2020-11-03 02:37:43', '2021-01-14 12:13:48'),
(2, 5, 1, 'have a good day', '2020-11-03 02:37:43', '2021-01-14 12:13:44'),
(3, 5, 1, 'hi there...', '2020-11-03 02:37:43', '2021-01-13 12:13:54'),
(4, 5, 3, 'hi there...', '2020-11-03 02:37:43', '2021-01-15 12:14:38'),
(5, 3, 1, 'how r u?', '2020-11-03 02:37:43', '2021-01-04 12:14:44'),
(6, 6, 1, 'hi there...', '2020-11-03 02:37:43', '2021-01-05 12:14:48'),
(7, 6, 3, 'jdfbjdf', '2020-11-03 02:37:43', '2021-01-13 12:14:57'),
(9, 7, 5, 'hi bro...', '2020-11-24 15:07:02', '2021-01-05 12:14:53'),
(10, 7, 6, 'what are you doing now???', '2020-11-24 15:09:25', '2021-01-08 12:15:01'),
(11, 1, 5, 'can you plz go farther ', '2020-11-24 15:10:12', '2021-01-13 12:15:07'),
(12, 1, 1, 'can you plz go farther ', '2020-11-24 23:11:13', '2021-01-19 12:15:23'),
(13, 1, 1, 'hello', '2020-11-25 02:29:31', '2021-01-05 12:15:12'),
(14, 1, 1, 'hi rimi', '2020-11-25 19:35:38', '2021-01-28 12:15:16'),
(16, 1, 3, 'hiiii', '2021-01-05 11:29:09', '2021-01-07 12:15:27'),
(25, 1, 7, 'how are you', '2021-01-05 12:14:07', '2021-01-05 12:14:07'),
(26, 1, 6, 'hello there !!!', '2021-01-06 10:38:18', '2021-01-06 10:38:18'),
(27, 1, 6, 'hi', '2021-01-06 11:08:03', '2021-01-06 11:08:03');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `creatorId`, `eventId`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 3, 6, 'bad bad bad', '2021-01-04 04:51:17', '2021-01-04 04:51:17'),
(2, 1, 7, 'bad bad', '2021-01-06 09:28:08', '2021-01-06 09:28:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `userName` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `userType` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `userName`, `email`, `password`, `userType`, `createdAt`, `image`) VALUES
(1, 'user', 'user', 'xyz@gmail.com', '123', 'user', '2020-11-18 13:28:19', 'user1.png'),
(3, 'rimi', 'rimi', 'rimi@ame.com', '123', 'user', '2020-11-02 13:09:53', 'user2.png'),
(5, 'abc', 'abc', 'abc@ame.com', '123', 'userSupport', '2020-11-02 13:09:53', 'user3.png'),
(6, 'xyz', 'xyz', 'xyz@ame.com', '123', 'userSupport', '2020-11-02 13:09:53', 'user2.png'),
(7, 'pqr', 'pqr', 'pqr@gmail.com', '124', 'userSupport', '0000-00-00 00:00:00', 'user3.png');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `voterId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `voterId`, `eventId`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 2, 5, 1, '2021-01-12 22:14:59', NULL),
(2, 3, 6, 2, '2021-01-04 08:40:44', '2021-01-04 08:40:44'),
(3, 3, 6, 1, '2021-01-04 08:41:09', '2021-01-04 08:41:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eventcategories`
--
ALTER TABLE `eventcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `eventcategories`
--
ALTER TABLE `eventcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
