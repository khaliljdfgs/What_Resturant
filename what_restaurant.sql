-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2023 at 07:29 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `what_restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_to_cart`
--

CREATE TABLE `add_to_cart` (
  `id` int(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `restaurant_id` varchar(255) NOT NULL,
  `restaurant_name` varchar(255) NOT NULL,
  `dish_id` varchar(255) NOT NULL,
  `dish_name` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `amount` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `serving_size_id` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `add_to_cart`
--

INSERT INTO `add_to_cart` (`id`, `userId`, `restaurant_id`, `restaurant_name`, `dish_id`, `dish_name`, `date`, `amount`, `status`, `serving_size_id`, `quantity`) VALUES
(11, '19', '17', '', '78', 'chicken tikka Pizza', '2023-07-05 05:42:13', '300', 'true', '', ''),
(12, 'null', '16', '', '88', 'chcicken karahi', '2023-07-05 10:40:00', '1500', 'false', '', ''),
(13, '19', '17', '', '78', 'chicken tikka Pizza', '2023-07-05 10:42:43', '300', 'true', '', ''),
(14, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 13:17:29', '1400', 'true', '7', ''),
(18, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 14:37:41', '1400', 'true', '7', ''),
(19, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 15:19:41', '1400', 'true', '7', ''),
(20, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 15:19:55', '1400', 'true', '7', ''),
(21, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 15:22:12', '1400', 'true', '7', ''),
(22, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 15:22:14', '1400', 'true', '7', ''),
(23, '9', '18', '', '78', 'chicken tikka Pizza', '2023-07-09 15:24:12', '300', 'true', '4', ''),
(24, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 15:24:16', '1400', 'true', '7', ''),
(25, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 21:57:19', '1400', 'true', '7', ''),
(26, '9', '18', '', '84', 'pepproni pizza', '2023-07-09 21:57:23', '1400', 'true', '7', ''),
(29, '9', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-09 23:24:27', '300', 'true', '4', ''),
(36, '9', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-10 02:41:03', '1600', 'true', '4', '2'),
(37, '9', '17', 'Dominos', '82', 'Fajita Pizza', '2023-07-10 03:29:05', '1200', 'true', '5', '1'),
(38, '9', '17', 'Dominos', '82', 'Fajita Pizza', '2023-07-10 03:29:10', '400', 'true', '6', '1'),
(39, '19', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-10 04:19:45', '800', 'true', '4', '1'),
(40, '19', '18', 'Alam Mart', '84', 'pepproni pizza', '2023-07-10 04:19:47', '1000', 'true', '7', '1'),
(41, '19', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-10 04:21:13', '800', 'true', '4', '1'),
(42, '19', '18', 'Alam Mart', '84', 'pepproni pizza', '2023-07-10 04:21:16', '1000', 'true', '7', '1'),
(43, '19', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-11 05:33:10', '800', 'true', '4', '1'),
(44, '19', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-11 05:42:52', '800', 'true', '4', '1'),
(45, '19', '18', 'Alam Mart', '86', 'grill burger', '2023-07-11 05:53:08', '400', 'true', '20', '1'),
(46, '19', '18', 'Alam Mart', '80', 'Biryani', '2023-07-11 05:58:42', '150', 'true', '9', '1'),
(47, '19', '18', 'Alam Mart', '90', 'white chicken karahi', '2023-07-11 05:59:26', '2000', 'true', '27', '1'),
(48, '19', '18', 'Alam Mart', '84', 'pepproni pizza', '2023-07-11 06:01:49', '300', 'true', '17', '1'),
(49, 'undefined', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-12 15:25:32', '800', 'true', '4', '1'),
(50, 'undefined', '18', 'Alam Mart', '84', 'pepproni pizza', '2023-07-12 15:25:39', '300', 'true', '17', '1'),
(51, '19', '17', 'Dominos', '81', 'Zinger Burger', '2023-07-14 01:59:43', '300', 'false', '10', '1'),
(52, '9', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-19 23:53:55', '800', 'true', '4', '1'),
(53, 'undefined', '18', 'Alam Mart', '84', 'pepproni pizza', '2023-07-20 12:18:09', '1000', 'false', '7', '1'),
(54, 'undefined', '17', 'Dominos', '81', 'Zinger Burger', '2023-07-20 12:18:30', '300', 'false', '10', '1'),
(55, '9', '18', 'Alam Mart', '84', 'pepproni pizza', '2023-07-21 18:02:29', '300', 'true', '17', '1'),
(56, '9', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-21 18:02:34', '800', 'true', '4', '1'),
(57, '9', '16', 'Loaf N Leaf', '85', 'chicken burger', '2023-07-21 18:03:03', '400', 'false', '19', '1'),
(58, '9', '18', 'Alam Mart', '78', 'chicken tikka Pizza', '2023-07-30 22:26:54', '800', 'true', '4', '1'),
(59, '9', '18', 'Alam Mart', '84', 'pepproni pizza', '2023-07-30 22:27:05', '300', 'true', '17', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  `created-at` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `imgUrl`, `created-at`) VALUES
(1, 'restaurants/4kU3oWjDDQW55ubi3hURx6VUxRkdgWUIyTdkefKB.png', '2023-07-18 02:53:15'),
(2, 'restaurants/7Bs34XQqG3uKTkE7hPldQV31X99BSjEDbNmPUima.png', '2023-07-18 03:03:08'),
(3, 'restaurants/K3dcYLGtrPjo3Yh1AVnCdsH47T89JPO2MZdmxHGF.png', '2023-07-18 03:04:49'),
(4, 'restaurants/2DYXDwZrj8h2F9D3ByowF1bIRx4t7CH9nMDOmWNb.png', '2023-07-18 15:19:07'),
(5, 'restaurants/JDwJh7poXKfdKpCSudpk3fiXFcrKWk1Q9g19wECV.jpg', '2023-07-18 15:35:14'),
(6, 'restaurants/eH6oltxJT5AXhuqMJcSbGK1suRRzlVvgvc6DAD3q.png', '2023-07-18 15:36:43'),
(7, 'restaurants/FtDaL107Yer7m9j2XxR4RzocWRwGobfiochA4B8h.png', '2023-07-21 18:17:48'),
(8, 'restaurants/zmqueZUPkMHavkdfJq4ObPfCWQ54vQoVVEq2w26s.png', '2023-07-21 22:55:12');

-- --------------------------------------------------------

--
-- Table structure for table `device_token`
--

CREATE TABLE `device_token` (
  `id` int(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `deviceToken` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `device_token`
--

INSERT INTO `device_token` (`id`, `userId`, `deviceToken`) VALUES
(2, '9', 'ExponentPushToken[eFh0XgK-Ja05ZPDuQNGZEW]'),
(3, '9', 'ExponentPushToken[eFh0XgK-Ja05ZPDuQNGZEW]'),
(4, '9', 'ExponentPushToken[eFh0XgK-Ja05ZPDuQNGZEW]');

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `id` int(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_description` varchar(255) NOT NULL,
  `item_price` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `restaurant_id` int(255) NOT NULL,
  `category_id` int(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `avg_rating` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`id`, `item_name`, `item_description`, `item_price`, `image`, `restaurant_id`, `category_id`, `status`, `avg_rating`) VALUES
(78, 'chicken tikka Pizza', 'A type of pizza', '300', 'restaurants/RRzKMMPlSffE7v6WBz1usr6aTXXdZvf7sxiMKOOm.jpg', 18, 11, 'accept\r\n', '3.7166666666667'),
(80, 'Biryani', 'A plate of biryaniii', '300', 'restaurants/RRzKMMPlSffE7v6WBz1usr6aTXXdZvf7sxiMKOOm.jpg', 18, 9, 'pending', '0'),
(81, 'Zinger Burger', 'A type of burger', '200', 'restaurants/RRzKMMPlSffE7v6WBz1usr6aTXXdZvf7sxiMKOOm.jpg', 17, 12, 'pending', '3.6'),
(82, 'Fajita Pizza', 'Chicken Fajita with mashrooms', '1000', 'restaurants/pizza1.jpeg', 17, 11, 'pending', '0'),
(83, 'Pepproni Pizza', 'a blend of cream topping with onion tomatoes and mushrooms', '900', 'restaurants/pizza2.jpeg', 17, 11, 'pending', '0'),
(84, 'pepproni pizza', 'a blend of peppronis with red chilli', '1400', 'restaurants/pizza3.jpeg', 18, 11, 'pending', '2.5238095238095'),
(85, 'chicken burger ', 'marinated chicken with sauces', '400', 'restaurants/burger1.jpeg', 16, 12, 'pending', '0'),
(86, 'grill burger', 'grilled chicken marinated with sauces with salad', '500', 'restaurants/burger2.jpeg', 18, 12, 'pending', '0'),
(87, 'fireworks burger', 'extra spicy burger with chilled hot sauces', '600', 'restaurants/burger3.jpeg', 18, 12, 'pending', '0'),
(88, 'chcicken karahi', 'marinated chicken with gravy ', '1500', 'restaurants/karahi1.jpeg', 16, 18, 'pending', '0'),
(89, 'beef karahi', 'beef with blend of spices baked in heat', '1600', 'restaurants/karahi2.jpeg', 17, 18, 'pending', '0'),
(90, 'white chicken karahi', 'spicy chicken marinated', '1800', 'restaurants/karahi3.jpeg', 18, 18, 'pending', '0'),
(91, 'beef biryani', 'beef with rice with spices', '400', 'restaurants/biryani1.jpeg', 18, 9, 'pending', '0'),
(92, 'spicy chicken biryani', 'spicy chicken with rice', '600', 'restaurants/biryani2.jpeg', 16, 9, 'pending', '0'),
(93, 'fries ', 'potatoes fried', '200', 'restaurants/fries1.jpg', 17, 13, 'pending', '0'),
(94, 'spicy fries', 'spicy marinated fries', '250', 'restaurants/fries2.jpg', 18, 13, 'pending', '0'),
(95, 'chicken shawarama', 'chicken with bread', '150', 'restaurants/shawarama1.jpeg', 16, 14, 'pending', '0'),
(96, 'grill shawarama', 'grilled chicken with bread', '300', 'restaurants/shawarama2.jpeg', 17, 14, 'pending', '0'),
(97, 'spicy shawarama', 'spicy chicken marinated', '300', 'restaurants/shawarama3.jpeg', 18, 14, 'pending', '0'),
(98, 'pasta ', 'pasta with vegetables', '400', 'restaurants/pasta1.jpeg', 16, 15, 'pending', '0'),
(99, 'vegetable pasta ', 'vegetables with pastas', '600', 'restaurants/pasta2.jpg', 18, 15, 'pending', '0'),
(100, 'chicken  paratha', 'vegetbale with paratha', '400', 'restaurants/paratha1.jpeg', 16, 16, 'pending', '0'),
(101, 'vegetable paratha', 'vegetable with paratha ', '500', 'restaurants/paratha2.jpg', 18, 16, 'pending', '0'),
(102, 'BBQ', 'BBQ', '900', 'restaurants/BBQ1.jpeg', 17, 17, 'pending', '0'),
(103, 'BBQ', 'BBQ', '1000', 'restaurants/BBQ2.jpg', 18, 17, 'accept', '0'),
(111, 'Pizza', 'hjshhdlks', '300', 'restaurants/3ye7GyOUxrWZIfi0kesFc45lo8DYwUIGFLlv7lST.png', 18, 9, 'pending', '0'),
(112, 'Chicken Biryani', 'A plate of Biryani with Chicken', '500', 'restaurants/sePu4cdxK9NCVHXevmvVEIrUoLMpIxMkUsgqy4JT.jpg', 18, 9, 'pending', '0'),
(113, 'chicken karahi', 'A type of chicken', '500', 'restaurants/2c8F3pANFuT8YfJAaqyvd5VmAtbmvFEnYJeVolrz.jpg', 18, 18, 'pending', '0'),
(114, 'Beef karahi special', 'A type of beef karahi', '500', 'restaurants/KhMqgedphrs4DWbH7mzjRd2gnJi8NuNOoibtFzbX.jpg', 18, 18, 'pending', '0');

-- --------------------------------------------------------

--
-- Table structure for table `dish_category`
--

CREATE TABLE `dish_category` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created-at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dish_category`
--

INSERT INTO `dish_category` (`id`, `name`, `image`, `created-at`) VALUES
(9, 'Biryani', 'restaurants/zZop4SNH3sItEcRX10AmHWM8Q2LWwLP7h6FpQ4wT.jpg', '0000-00-00 00:00:00.000000'),
(11, 'Pizza', 'restaurants/zZop4SNH3sItEcRX10AmHWM8Q2LWwLP7h6FpT4wS.jpeg', '0000-00-00 00:00:00.000000'),
(12, 'Burger', 'restaurants/zZop4SNH3sItEcRX10AmHWM8Q2LWwLP7h6FpB4wR.png', '2023-04-01 17:42:57.829034'),
(13, 'Fries', 'restaurants/zZop4SNH3sItEcRX10AmHWM8Q2LWwLP7h6FpB4wT.jpeg', '0000-00-00 00:00:00.000000'),
(14, 'Shawarma', 'restaurants/zZop4SNH3sItEcRX10AmHWM8Q2LWwLP7h6FpS4wT.jpeg', '0000-00-00 00:00:00.000000'),
(15, 'Pasta', 'restaurants/zTop4SNM3sItEcRX10AmPWQ8N2LWwLP7h6FpQ4wV.jpg', '0000-00-00 00:00:00.000000'),
(16, 'Paratha', 'restaurants/zZop4SNM3sItEcRX10AmHWM8N2LWwLP7h6FpQ4wZ.jpg', '0000-00-00 00:00:00.000000'),
(17, 'BBQ', 'restaurants/zZop4SNM3sItEcRX10AmLWQ8N2LWwLP7h6FpQ4wV.jpg', '0000-00-00 00:00:00.000000'),
(18, 'karahi', 'restaurants/karahi1.jpeg', '0000-00-00 00:00:00.000000'),
(19, 'Biryani', 'restaurants/ASWZZsg8HJRQg1YHmztKZPvkiX1t7Fw40XJQbrvX.png', '2023-07-09 04:05:36.385431');

-- --------------------------------------------------------

--
-- Table structure for table `dish_nutrients`
--

CREATE TABLE `dish_nutrients` (
  `id` int(255) NOT NULL,
  `calories` varchar(255) NOT NULL,
  `protein` varchar(255) NOT NULL,
  `fat` varchar(255) NOT NULL,
  `carbs` varchar(255) NOT NULL,
  `fiber` varchar(255) NOT NULL,
  `sugar` varchar(255) NOT NULL,
  `dish_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dish_nutrients`
--

INSERT INTO `dish_nutrients` (`id`, `calories`, `protein`, `fat`, `carbs`, `fiber`, `sugar`, `dish_id`) VALUES
(22, '3', '4', '5', '6', '7', '8', 78),
(23, '7', '6', '5', '4', '3', '1', 79),
(24, '27', '0', '3', '1', '4', '1', 80),
(25, '24', '72', '8', '23', '56', '0', 81),
(26, '5', '75', '34', '78', '34', '78', 82),
(27, '67', '45', '78', '34', '89', '23', 83),
(28, '56', '45', '78', '34', '78', '23', 84),
(29, '56', '34', '23', '78', '12', '78', 85),
(30, '5', '34', '56', '34', '67', '23', 86),
(31, '23', '56', '12', '23', '78', '4', 87),
(32, '5', '34', '6', '23', '23', '23', 88),
(33, '23', '34', '12', '21', '67', '67', 89),
(34, '34', '67', '12', '21', '34', '34', 90),
(35, '23', '56', '67', '21', '22', '1', 91),
(36, '89', '56', '45', '34', '23', '21', 92),
(37, '78', '12', '23', '45', '56', '67', 93),
(38, '87', '34', '23', '56', '78', '34', 94),
(39, '89', '56', '5', '33', '22', '98', 95),
(40, '7', '5', '78', '54', '7', '34', 96),
(41, '23', '12', '45', '1', '45', '4', 97),
(42, '8', '34', '87', '87', '3', '78', 98),
(43, '12', '2', '3', '45', '12', '89', 99),
(44, '23', '45', '23', '67', '2', '12', 100),
(45, '23', '12', '44', '45', '23', '12', 101),
(46, '23', '12', '45', '56', '21', '11', 102),
(47, '11', '78', '67', '56', '44', '56', 103),
(48, '7.17', '0.0085', '0.8111', '0.0006', '0', '0.0006', 106),
(49, '21.51', '0.0255', '2.4333', '0.0018', '0', '0.0018', 107),
(50, '35.85', '0.0425', '4.0555', '0.003', '0', '0.003', 108),
(51, '35850', '42.5', '4055.5', '3', '0', '3', 109),
(52, '28.68', '0.034', '3.2444', '0.0024', '0', '0.0024', 110),
(53, '28.68', '0.034', '3.2444', '0.0024', '0', '0.0024', 111),
(54, '45000', '0', '4990', '0', '0', '0', 112),
(55, '13.55', '0.961', '0.6975', '0.8625', '0.06', '0.02', 113),
(56, '14.95', '0.5455', '1.3065', '0.2145', '0', '0.1025', 114),
(57, '36.55', '0.0245', '3.915', '0', '0', '0.003', 115);

-- --------------------------------------------------------

--
-- Table structure for table `dish_review`
--

CREATE TABLE `dish_review` (
  `id` int(255) NOT NULL,
  `dish_id` int(255) NOT NULL,
  `rating` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dish_review`
--

INSERT INTO `dish_review` (`id`, `dish_id`, `rating`) VALUES
(5, 78, '3'),
(6, 81, '2'),
(7, 78, '3'),
(8, 81, '2'),
(9, 78, '3'),
(10, 81, '4'),
(11, 78, '3'),
(12, 81, '5'),
(13, 81, '5'),
(14, 78, '1'),
(15, 84, '0'),
(16, 78, '2.6'),
(17, 84, '3'),
(18, 78, '5'),
(19, 84, '5'),
(20, 78, '5'),
(21, 78, '5'),
(22, 84, '2.6666666666667'),
(23, 78, '5'),
(24, 84, '0'),
(25, 84, '5'),
(26, 78, '5'),
(27, 84, '2'),
(28, 78, '4');

-- --------------------------------------------------------

--
-- Table structure for table `gps_coordinates`
--

CREATE TABLE `gps_coordinates` (
  `id` int(255) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gps_coordinates`
--

INSERT INTO `gps_coordinates` (`id`, `city_name`, `latitude`, `longitude`, `image`) VALUES
(1, 'karachi', '24.9056', '67.0822', 'restaurants/city3.jpg'),
(2, 'Gujrat', '32.57284', '74.07897', 'restaurants/city7.jpg'),
(5, 'gujranwala', '32.16167', '74.18831', 'restaurants/city5.jpg'),
(6, 'rawalpindi', '33.6007', '73.0679', 'restaurants/city1.jpg'),
(7, 'lahore', '31.54972', '74.34361', 'restaurants/city6.jpg'),
(8, 'sialkot', '32.49268', '74.53134', 'restaurants/city2.jpg'),
(9, 'islamabad', '33.72148', '73.04329', 'restaurants/city4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(255) NOT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `dish_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `ingredient_name`, `quantity`, `unit`, `dish_id`) VALUES
(52, 'chiken', '5', 'gram', '78'),
(53, 'butter', '3', 'gram', '79'),
(54, 'Butterr', '3', 'gram', '80'),
(55, 'chicken piece', '200 ', 'gram', '81'),
(56, 'chicken', '100', 'gm', '82'),
(57, 'mushrooms', '10', 'gm', '83'),
(58, 'vegetables', '50', 'gm', '84'),
(59, 'chicken piece', '200', 'gm', '85'),
(60, 'chicken piece', '200', 'gm', '86'),
(61, 'chicken piece', '200', 'gm', '87'),
(62, 'chicken', '500', 'gm', '88'),
(63, 'chicken ', '500', 'gm', '89'),
(64, 'chicken', '500', 'gm', '90'),
(65, 'rice', '500', 'gm', '91'),
(66, 'rice', '600', 'gm', '92'),
(67, 'potatoes', '100', 'gm', '93'),
(68, 'potatoes', '100', 'gm', '94'),
(69, 'vegetables', '20', 'gm', '95'),
(70, 'chicken', '30', 'gm', '96'),
(71, 'grill chicken', '20', 'gm', '97'),
(72, 'macaroni', '300', 'gm', '98'),
(73, 'chicken', '200', 'gm', '99'),
(74, 'paratha', '30', 'gm', '100'),
(75, 'chicken', '40', 'gm', '101'),
(76, 'chicken', '300', 'gm', '102'),
(77, 'marinated chicken', '300', 'gm', '103'),
(78, 'marinated chicken', '300', 'gm', '103'),
(80, 'Rice', '0', '', '104'),
(81, 'bUTTER', '0', '', '105'),
(82, 'bUTTER', '1', 'gram', '106'),
(83, 'Butter', '3', 'gram', '107'),
(84, 'Butter', '5', 'gram', '108'),
(85, 'Butter', '5', 'kilogram', '109'),
(86, 'Butter', '4', 'gram', '110'),
(87, 'Butter', '4', 'gram', '111'),
(88, 'Chicken', '5', 'kilogram', '112'),
(89, 'Chicken', '5', 'gram', '113'),
(90, 'beef', '5', 'gram', '114'),
(91, 'Butter', '5', 'gram', '115');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `tableNo` varchar(255) NOT NULL,
  `restaurant_id` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `tableNo`, `restaurant_id`, `date`, `status`, `amount`) VALUES
(77, '9', '2', '18', '2023-07-10 03:56:26', 'pending', '800'),
(78, '9', '1', '17', '2023-07-10 04:01:00', 'pending', '400'),
(79, '19', '2', '18', '2023-07-10 04:16:38', 'rated', '800'),
(80, '19', '2', '18', '2023-07-10 04:16:44', 'rated', '1000'),
(81, '19', '2', '18', '2023-07-10 04:20:03', 'rated', '1800'),
(82, '19', '2', '18', '2023-07-10 04:21:24', 'rated', '1800'),
(83, '19', '2', '18', '2023-07-10 04:50:25', 'rated', '1000'),
(84, '19', '2', '18', '2023-07-11 03:27:40', 'pending', '800'),
(85, '19', '2', '18', '2023-07-11 03:28:18', 'rated', '800'),
(86, '19', '2', '18', '2023-07-11 05:42:01', 'pending', '1600'),
(87, '19', '10', '18', '2023-07-19 02:51:58', 'pending', '1200'),
(88, '19', '10', '18', '2023-07-19 02:52:31', 'pending', '1200'),
(89, '19', '10', '18', '2023-07-19 02:52:32', 'pending', '1200'),
(90, '19', '10', '18', '2023-07-19 02:56:07', 'pending', '150'),
(91, '19', '10', '18', '2023-07-19 04:04:58', 'Completed', '2000'),
(92, '19', '10', '18', '2023-07-19 23:00:54', 'pending', '800'),
(93, '19', '10', '18', '2023-07-19 23:01:25', 'pending', '800'),
(94, '19', '10', '18', '2023-07-19 23:01:52', 'pending', '800'),
(95, '9', '10', '18', '2023-07-20 11:06:17', 'pending', '800'),
(96, '9', '10', '18', '2023-07-20 11:06:48', 'pending', '800'),
(97, '9', '10', '18', '2023-07-20 11:07:46', 'pending', '800'),
(98, 'undefined', '10', '18', '2023-07-20 11:09:31', 'Cancelled', '800'),
(99, 'undefined', '10', '18', '2023-07-20 11:10:04', 'Cancelled', '800'),
(100, 'undefined', '10', '18', '2023-07-20 11:12:01', 'Cancelled', '800'),
(101, 'undefined', '10', '18', '2023-07-20 11:12:17', 'Cancelled', '800'),
(102, 'undefined', '10', '18', '2023-07-20 11:14:07', 'Cancelled', '800'),
(103, 'undefined', '10', '18', '2023-07-20 11:14:29', 'Cancelled', '800'),
(104, 'undefined', '10', '18', '2023-07-20 11:14:56', 'Cancelled', '800'),
(105, 'undefined', '10', '18', '2023-07-20 11:16:33', 'Cancelled', '800'),
(106, 'undefined', '10', '18', '2023-07-20 11:17:04', 'Cancelled', '800'),
(107, 'undefined', '10', '18', '2023-07-20 11:18:15', 'Cancelled', '1000'),
(108, 'undefined', '2', '18', '2023-07-20 11:19:44', 'Completed', '800'),
(109, '19', '10', '18', '2023-07-20 11:37:32', 'pending', '800'),
(110, '9', '10', '18', '2023-07-21 18:04:31', 'rated', '1900'),
(111, '9', '12', '18', '2023-07-30 22:27:19', 'pending', '1100');

-- --------------------------------------------------------

--
-- Table structure for table `orders_dish`
--

CREATE TABLE `orders_dish` (
  `id` int(255) NOT NULL,
  `order_id` int(255) NOT NULL,
  `dish_id` int(255) NOT NULL,
  `serving_size_id` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders_dish`
--

INSERT INTO `orders_dish` (`id`, `order_id`, `dish_id`, `serving_size_id`, `quantity`) VALUES
(64, 59, 78, '', ''),
(65, 60, 81, '', ''),
(66, 61, 78, '', ''),
(67, 61, 81, '', ''),
(68, 62, 78, '', ''),
(69, 63, 78, '', ''),
(70, 64, 78, '', ''),
(71, 65, 84, '7', ''),
(72, 66, 84, '7', ''),
(73, 67, 84, '7', ''),
(74, 68, 84, '7', ''),
(75, 69, 84, '7', ''),
(76, 70, 78, '4', ''),
(77, 70, 84, '7', ''),
(78, 71, 84, '7', ''),
(79, 72, 78, '4', ''),
(80, 73, 78, '4', '5'),
(81, 74, 82, '5', '1'),
(82, 74, 82, '6', '1'),
(83, 75, 82, '6', '1'),
(84, 76, 82, '6', '1'),
(85, 77, 78, '4', '1'),
(86, 78, 82, '6', '1'),
(87, 79, 78, '4', '1'),
(88, 80, 84, '7', '1'),
(89, 81, 78, '4', '1'),
(90, 81, 84, '7', '1'),
(91, 82, 78, '4', '1'),
(92, 82, 84, '7', '1'),
(93, 83, 84, '7', '1'),
(94, 84, 78, '4', '1'),
(95, 85, 78, '4', '1'),
(96, 86, 78, '4', '2'),
(97, 87, 78, '4', '1'),
(98, 87, 86, '20', '1'),
(99, 88, 78, '4', '1'),
(100, 88, 86, '20', '1'),
(101, 89, 78, '4', '1'),
(102, 89, 86, '20', '1'),
(103, 90, 80, '9', '1'),
(104, 91, 90, '27', '1'),
(105, 92, 78, '4', '1'),
(106, 93, 78, '4', '1'),
(107, 94, 78, '4', '1'),
(108, 95, 78, '4', '1'),
(109, 96, 78, '4', '1'),
(110, 97, 78, '4', '1'),
(111, 98, 78, '4', '1'),
(112, 99, 78, '4', '1'),
(113, 100, 78, '4', '1'),
(114, 101, 78, '4', '1'),
(115, 102, 78, '4', '1'),
(116, 103, 78, '4', '1'),
(117, 104, 78, '4', '1'),
(118, 105, 78, '4', '1'),
(119, 106, 78, '4', '1'),
(120, 107, 84, '7', '1'),
(121, 108, 78, '4', '1'),
(122, 109, 78, '4', '1'),
(123, 110, 84, '17', '1'),
(124, 110, 78, '4', '2'),
(125, 111, 78, '4', '1'),
(126, 111, 84, '17', '1');

-- --------------------------------------------------------

--
-- Table structure for table `reserved_table`
--

CREATE TABLE `reserved_table` (
  `id` int(255) NOT NULL,
  `table_id` varchar(255) NOT NULL,
  `restaurant_id` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `request_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reserved_table`
--

INSERT INTO `reserved_table` (`id`, `table_id`, `restaurant_id`, `date`, `time`, `request_id`) VALUES
(15, '4', '18', '2023-07-09', '12:15', '8'),
(32, '7', '18', '2023-07-13', '18:08', '10'),
(33, '7', '18', '2023-07-21', '17:10', '11'),
(34, '7', '18', '2023-07-21', '05:21', '12'),
(35, '7', '18', '2023-07-25', '21:00', '13');

-- --------------------------------------------------------

--
-- Table structure for table `reserve_table`
--

CREATE TABLE `reserve_table` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_of_people` varchar(255) NOT NULL,
  `date_time` varchar(255) NOT NULL,
  `special_request` varchar(255) NOT NULL,
  `restaurant_id` varchar(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reserve_table`
--

INSERT INTO `reserve_table` (`id`, `name`, `email`, `no_of_people`, `date_time`, `special_request`, `restaurant_id`, `user_id`, `status`) VALUES
(8, 'Ihtasham', '70078957@student.uol.edu.pk', '3', '2023-07-08T23:15', 'I have many frnds', '18', 9, 'accept'),
(9, 'Ihtasham', '70078957@student.uol.edu.pk', '2', '2023-07-08T23:15', 'This is my problem', '18', 9, 'reject'),
(10, 'Ihtasham', 'chs@gmail.com', '3', '2023-07-14T16:05', 'I have problem', '18', 9, 'accept'),
(11, 'Ihtasham', '70078957@student.uol.edu.pk', '3', '2023-07-21T17:05', 'I need a table with decoration', '18', 9, 'accept'),
(12, 'Ihtasham', '70078957@student.uol.edu.pk', '3', '2023-07-25T02:20', 'I have many', '18', 9, 'accept'),
(13, 'Ihtasham Ul haq', '70078957@student.uol.edu.pk', '3', '2023-07-25T16:58', 'I need to decorate the table for my best friend birthday', '18', 9, 'accept');

-- --------------------------------------------------------

--
-- Table structure for table `reset_password_requests`
--

CREATE TABLE `reset_password_requests` (
  `id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reset_password_requests`
--

INSERT INTO `reset_password_requests` (`id`, `email`, `token`, `createdAt`) VALUES
(3, 'ch@gmail.com', 'r1YxALS64yhj1juwqYbh730zp9QQZVWILwJaMzp9', '2023-07-08 13:07:10'),
(5, '70078957@student.uol.edu.pk', 'SobGhhyHymMpoJ7jEQZXpZYlvCLUwMpOVLeQP5WK', '2023-07-08 15:07:10');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(255) NOT NULL,
  `r_name` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `address` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `location_longitude` varchar(255) NOT NULL,
  `location_latitude` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `avg_rating` varchar(255) NOT NULL,
  `updated_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `r_name`, `owner`, `email`, `password`, `logo`, `created_at`, `address`, `longitude`, `latitude`, `location_longitude`, `location_latitude`, `phone_no`, `avg_rating`, `updated_at`) VALUES
(16, 'Loaf N Leaf', 'Haseeb Alam', 'ch@gmail.com', '$2y$10$/yqkig.BPOZ6oBBzPS9boOUkLrgba3U.23w6dkU7QyJpNxsn/u9fe', 'restaurants/tSnAdWekaSYmjEnaHGziK2q4dEKwyLP1eEZ7E3i9.jpg', '2023-03-05 13:02:05.338450', 'Gujrat', '73.04329', '33.72148', '74.06399706125552', '32.577788226222054', '061681787', '0', '2023-03-05 16:03:05'),
(17, 'Dominos', 'Harmas Latif', 'chs10525@gmail.com', '$2y$10$37qDxquc8y5/bZd0Lzm/w.wZF.1nLevUUyU9L.Us8vjK72tqkzdQi', 'restaurants/zZop5SNM3sItEcRX10AmLWQ8N2LWwLP7h6FpQ4wT.jpg', '2023-03-05 15:25:04.365927', 'Gujrat', '74.07897', '32.57284', '74.09255987928424', '32.49244590027391', '03177849673', '0', '2023-03-05 18:03:04'),
(18, 'Alam Mart', 'Ihtasham Ul Haq', '70078957@student.uol.edu.pk', '$2y$10$svW0Q0mGZyTwjf67CWo6Yu1zLhX3SoLazUIHRxqeqhyLJKDUXMihe', 'restaurants/2HpsRKBKokuMNF3wTx2CQZKQUFQXfORrJpzo3GuM.jpg', '2023-06-15 23:49:46.295030', 'Jalapur Jatan,Gujrat', '74.07897', '32.57284', '74.20211132804425', '32.642125035369276', '03177849673', '3', '2023-06-15 18:06:46'),
(23, 'Shinwari', 'Ihtasham', 'chs10525@gmail.com', '$2y$10$dKPPKaWODZYMakWHOfPaEu8KEGmUm.c3KNGSn2xVfGfJNINUaV1v.', 'restaurants/NxnZhK8S29jhgN2fkrp5vo2Yj9rwUhrcdFzcH7Ae.png', '2023-07-21 17:08:24.544247', 'Jalalpur Jattan Gujrat', '74.071481', '32.568678', '74.07422758203063', '32.57055865227734', '83989884021', '0', '2023-07-21 12:07:24');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_rating`
--

CREATE TABLE `restaurant_rating` (
  `id` int(255) NOT NULL,
  `restaurant_id` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant_rating`
--

INSERT INTO `restaurant_rating` (`id`, `restaurant_id`, `rating`) VALUES
(1, '18', '3'),
(2, '18', '5'),
(3, '18', '2'),
(4, '18', '2');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_requests`
--

CREATE TABLE `restaurant_requests` (
  `id` int(255) NOT NULL,
  `restaurant` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cnic` varchar(255) NOT NULL,
  `id_copy` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `longitude` varchar(25) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `location_longitude` varchar(255) NOT NULL,
  `location_latitude` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant_requests`
--

INSERT INTO `restaurant_requests` (`id`, `restaurant`, `owner`, `email`, `cnic`, `id_copy`, `address`, `phone_no`, `longitude`, `latitude`, `location_longitude`, `location_latitude`, `logo`, `created_at`, `status`) VALUES
(35, 'Shinwari', 'Ihtasham Ul Haq', '70078957@student.uol.edu.pk', '3420103167423', 'restaurants/NbwaTkULVgC7NfJPbvr12sDszzrpvZeDAdWQD81d.jpg', 'Jalapur Jatan,Gujrat', '03177849673', '74.071481', '32.568678', '', '', 'restaurants/2HpsRKBKokuMNF3wTx2CQZKQUFQXfORrJpzo3GuM.jpg', '2023-06-15 23:49:02.796574', 'accepted'),
(36, 'Al Shafi', 'Ihtasham', '70078957@student.uol.edu.ok', '34201-0316740', 'restaurants/ovmXRQoIpukCfSmnsjDyClNeJhoir5X59mRxayG9.png', 'JalalPur Jatan', '03480719428', '74.071481', '32.568678', '', '', 'restaurants/HV99UFPsmkD2OdPmqDB6Ib6P0xgQds3AeYj6E8GY.png', '2023-07-04 04:11:50.441290', 'pending'),
(37, 'Shinwari', 'Ihtasham', 'ch@gmail.com', '55366-6666677', 'restaurants/pkZntVTd7PdQZJJJXES637vRLFnC7zsl0QQ4MLGZ.pdf', 'PWD', '483848904', '73.065151', '33.693812', '', '', 'restaurants/Ez6hAmIZzrGPNGS6fmYjLDEd3kyaDztg7WcOqeRK.txt', '2023-07-05 16:22:27.637484', 'accepted'),
(38, 'Shinwari', 'Ihtasham', 'raheel@cs.uchenab.edu.pk', '52452-4545215', 'restaurants/oZZSJUNjEFYXhjkw4DC6zdkq36QWh7ul5gxVLvMe.pdf', 'Manchester', '8758475874', '-2.36966957036279', '54.2379333607472', '', '', 'restaurants/aeQsuwEMghLqlCjrTDclOkrnEGPBtVV5XvCRWefi.txt', '2023-07-05 16:26:55.234459', 'accepted'),
(39, 'Shinwari', 'Ihtasham', 'ch5@gmail.com', '25656-5625653', 'restaurants/jmgRCsUPOj5TqSB9DJFF7Ij0VT46kQbmDpSUOOh9.png', 'shghgsh', '276762627', '74.071481', '32.568678', '', '', 'restaurants/QzvfktOHwI67IgaWuBNABi92XRF9Uapbu9cP5QlN.png', '2023-07-08 00:28:40.628134', 'pending'),
(40, 'Shinwari', 'Ihtasham', 'ch8@gmail.com', '37878-3873733', 'restaurants/Tgq6bX75Wo9xBVdhJmPaMlBk6SlBXPNjdC6EzQKv.png', 'Qamar Sialvi, Gujrat, گجرات, Punjab, Pakistan', '3787989', '74.071481', '32.568678', '74.06839109521528', '32.57330722698315', 'restaurants/4Zm2eHiFP1uCZq7wp0h3kT1NAtGG9aTfpF9qYVK8.png', '2023-07-08 02:45:27.327179', 'accepted'),
(41, 'Shinwari', 'ihtasham', 'ch12@gmail.com', '67262-8727722', 'restaurants/9Rc5y2iRStEU7uQJWnlT7MtRMg0ZaWdAqb4TfMfd.png', 'JalalPur Jatan', '328783277', '74.071481', '32.568678', '74.06787611108393', '32.57157129486343', 'restaurants/6XQ18DysJwd1BB7Vo4CIqcUQ2TRc8xoBEyGSEE7R.png', '2023-07-08 02:55:34.925697', 'rejected'),
(42, 'Shinwari', 'Ihtasham', 'chs10525@gmail.com', '51251-7277722', 'restaurants/UYQwAFV6h0PdPWiAjFqjEuwSpanwhQ8gEp4Avjwg.png', 'Jalalpur Jattan Gujrat', '83989884021', '74.071481', '32.568678', '74.07422758203063', '32.57055865227734', 'restaurants/NxnZhK8S29jhgN2fkrp5vo2Yj9rwUhrcdFzcH7Ae.png', '2023-07-21 17:07:22.586428', 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_reset_request`
--

CREATE TABLE `restaurant_reset_request` (
  `id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant_reset_request`
--

INSERT INTO `restaurant_reset_request` (`id`, `email`, `token`, `createdAt`) VALUES
(2, '70078957@student.uol.edu.pk', '41OMkPFdnhVe5QsiWVGQoV6MdAvM5T9M6Ua6uXxN', '2023-07-08 15:07:37');

-- --------------------------------------------------------

--
-- Table structure for table `serving_size`
--

CREATE TABLE `serving_size` (
  `id` int(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `dish_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `serving_size`
--

INSERT INTO `serving_size` (`id`, `size`, `price`, `dish_id`) VALUES
(1, 'medium', '200', '110'),
(2, 'large', '100', '110'),
(3, 'medium', '300', '111'),
(4, 'medium', '800', '78'),
(5, 'large', '1200', '82'),
(6, 'small', '400', '82'),
(7, 'large', '1000', '84'),
(8, 'Large', '300', '80'),
(9, 'small', '150', '80'),
(10, 'Burger', '300', '81'),
(12, 'medium', '800', '82'),
(14, 'small', '500', '83'),
(15, 'medium', '1000', '83'),
(16, 'large', '1200', '83'),
(17, 'small', '300', '84'),
(18, 'medium', '700', '84'),
(19, 'Burger', '400', '85'),
(20, 'Burger', '400', '86'),
(21, 'Burger', '300', '87'),
(22, '1kg', '600', '88'),
(23, '2kg', '1200', '88'),
(24, '2kg', '2000', '89'),
(25, '4kg', '4000', '89'),
(26, '2kg', '1500', '90'),
(27, '3kg', '2000', '90'),
(28, 'small plate', '300', '91'),
(29, 'large plate', '700', '91'),
(30, 'large plate', '400', '112'),
(31, '2kg', '500', '113'),
(32, '4kg', '1200', '113'),
(33, '5kg', '3000', '114'),
(34, 'large plate', '500', '115'),
(35, '1kg', '400', '91'),
(36, '2kg', '1000', '91'),
(37, 'half plate', '250', '92'),
(38, 'full plate', '500', '92'),
(39, 'half', '130', '93'),
(40, 'full', '220', '93'),
(41, 'Half', '200', '94'),
(42, 'Full', '300', '94'),
(43, 'Small', '180', '95'),
(44, 'Large', '220', '95'),
(45, 'Small', '200', '96'),
(46, 'Large', '280', '96'),
(47, 'Small', '170', '97'),
(48, 'Large', '230', '97'),
(49, 'Large Plate', '200', '98'),
(50, 'small plate', '300', '98'),
(51, 'Full plate', '200', '99'),
(52, 'Half Plate', '300', '99'),
(53, 'small', '200', '100'),
(54, 'large', '300', '100'),
(55, 'Large', '800', '102');

-- --------------------------------------------------------

--
-- Table structure for table `table`
--

CREATE TABLE `table` (
  `id` int(255) NOT NULL,
  `table_no` varchar(255) NOT NULL,
  `seat_capacity` varchar(255) NOT NULL,
  `table_location` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `QR_value` varchar(255) NOT NULL,
  `restaurant_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table`
--

INSERT INTO `table` (`id`, `table_no`, `seat_capacity`, `table_location`, `status`, `QR_value`, `restaurant_id`) VALUES
(3, '2', '3', 'Indoor', 'Reserved', '4aa7df4e-2fee-4bbd-ac3e-35bb3411d3af', '18'),
(7, '10', '6', 'Indoor', 'Reserved', '9d7cac74-c618-4732-8d05-33573fcf6d61', '18'),
(8, '1', '5', 'Outdoor', 'Available', '3bedbfca-7717-4294-a508-7e78f34bb96b', '17'),
(9, '2', '1', 'Indoor', 'Available', 'd4fd5f6f-b4d7-4c05-90d5-c0d8f0b10230', '17'),
(10, '12', '5', 'Outdoor', 'Available', '97582dbc-9c7d-45d6-b49c-5085704eab05', '18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `status` varchar(255) NOT NULL,
  `api_token` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `api_token`, `created_at`) VALUES
(9, 'Ihtasham', '70078957@student.uol.edu.pk', '$2y$10$iiUAasT.x7J8PJGU.NlUGOyl3SYRmntILvEzAN1olW0J5DGZGipue', 'user', 'active', 'pL85taSep5Thn0Xc6hmD7l9AegISluwECFwX3pGHaPpIqES5guG2Tw8Vm7EI', '2023-02-24 13:06:28'),
(16, 'Ihtasham', '70078957@student.uol.edu', '$2y$10$clYnq8EPU5gYhZfaNfyPlOfG6GN705NRUqNl8VGa4Fswo/SG.hMti', 'user', 'active', '9NjlS38xFk2CQ9iyGW1jAiWxYGdKJKjTf8Qd8qFO09zaZko3iDHRR90ZnN72', '2023-06-28 01:59:23'),
(19, 'Shani', 'ch@gmail.com', '$2y$10$knb5tXqas0Oa8m0lgSBliO0RqWP59Q/D4oUzBqhMpOteXK0p3GpOi', 'user', 'active', 'lqkPHCMEz99Rt1Msz25MsawPiaGSv6jxHbY3HZ590myXvQUoAK0yDQOiyOkE', '2023-06-28 03:58:10'),
(20, 'ihtasham', 'ch1@gmail.com', '$2y$10$bSXw7ogqzO4kUfQAtE86/eNK.P3IxGA3GO/6LRoL2ZtU9w/Y8IpsG', 'user', 'active', 'K0Fp4K2F8rmV97OhYnISmICCOYachBpZcJtukX6G0ZKgxQX3Unf1KAjquRJW', '2023-07-04 03:36:08'),
(21, 'IhtahsamUl', 'ch2@gmail.com', '$2y$10$qYahJKliY3P60j9vZTRvRuay2qAGWKeHTe/bOa2rvSlo6ZZHgJYM2', 'user', 'active', 'roUtWjSYvWKsRnhoByaK8PpbzwXBycrR6eR4BeopgT4drAMBfoD9WFncUdoG', '2023-07-04 15:16:22'),
(22, '1234!@2', 'abc@gmail.com', '$2y$10$XK3ApRT5rorQR7XD7eAkS.A43xmWOrHBnwzbT2c88wZnB/kD.67zu', 'user', 'active', '1Gw1KlizTAOeky5uTtcHJ5icmguQuqreP4WR4ck78pDNp00GfhJf9KiL97mU', '2023-07-05 16:12:14'),
(23, 'Ul Haq', 'ch100@gmail.com', '$2y$10$WiYIUTgB0nzdyH8ZpXI2MOeimREDdhkl6hIALYXPafKRYiTchlR3G', 'user', 'block', 'ZnK2Wt45njmScQOwkqW3aOb31OOkHhcD9J0IgciOOq4iKUDxrWQzyfJ8XnX0', '2023-07-08 16:56:13'),
(24, 'ihtashamul haq', 'ch@gmail', '$2y$10$4bo8Enzw4Fme3Z3pvYKpLONGLtCpw5GU48G3n/cAF6yjE.AZ8E9Ia', 'user', 'block', 'Z3wSArqEMYeekiQulzXuXpFMSFQ5igEUIy3dduW86auHOrHiOzq1Ks9RNmMU', '2023-07-12 15:03:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `device_token`
--
ALTER TABLE `device_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dish_category`
--
ALTER TABLE `dish_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dish_nutrients`
--
ALTER TABLE `dish_nutrients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dish_review`
--
ALTER TABLE `dish_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gps_coordinates`
--
ALTER TABLE `gps_coordinates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_dish`
--
ALTER TABLE `orders_dish`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reserved_table`
--
ALTER TABLE `reserved_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reserve_table`
--
ALTER TABLE `reserve_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reset_password_requests`
--
ALTER TABLE `reset_password_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant_rating`
--
ALTER TABLE `restaurant_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant_requests`
--
ALTER TABLE `restaurant_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant_reset_request`
--
ALTER TABLE `restaurant_reset_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `serving_size`
--
ALTER TABLE `serving_size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table`
--
ALTER TABLE `table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `device_token`
--
ALTER TABLE `device_token`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `dish_category`
--
ALTER TABLE `dish_category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `dish_nutrients`
--
ALTER TABLE `dish_nutrients`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `dish_review`
--
ALTER TABLE `dish_review`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `gps_coordinates`
--
ALTER TABLE `gps_coordinates`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `orders_dish`
--
ALTER TABLE `orders_dish`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `reserved_table`
--
ALTER TABLE `reserved_table`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `reserve_table`
--
ALTER TABLE `reserve_table`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `reset_password_requests`
--
ALTER TABLE `reset_password_requests`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `restaurant_rating`
--
ALTER TABLE `restaurant_rating`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `restaurant_requests`
--
ALTER TABLE `restaurant_requests`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `restaurant_reset_request`
--
ALTER TABLE `restaurant_reset_request`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `serving_size`
--
ALTER TABLE `serving_size`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `table`
--
ALTER TABLE `table`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
