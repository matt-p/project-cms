-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2019 at 11:48 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms_db_ang`
--

-- --------------------------------------------------------

--
-- Table structure for table `fields`
--

CREATE TABLE `fields` (
  `id` int(11) NOT NULL,
  `field_name` varchar(25) DEFAULT NULL,
  `field_type` varchar(25) DEFAULT NULL,
  `field_value` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fields`
--

INSERT INTO `fields` (`id`, `field_name`, `field_type`, `field_value`) VALUES
(100, 'testing_joindate', 'Date', '2018-09-09'),
(140, 'testing_audio', 'Audio', 'snip1.wav'),
(141, 'testing_video', 'Video', 'SampleVideo_360x240_1mb.mp4'),
(167, 'site_twitter', 'Text', 'https://www.twitter.co.uk/user/localhost'),
(168, 'site_facebook', 'Text', 'https://www.facebook.com/user/localhost'),
(169, 'site_instagram', 'Text', 'https://www.instagram.com/user/localhost'),
(176, 'home_bkimg01', 'Image', 'lens-1209823_1920.jpg'),
(177, 'home_bkimg02', 'Image', 'bkimg02.png'),
(178, 'home_bkimg03', 'Image', 'camera-1272791_1920.jpg'),
(179, 'home_bkimg04', 'Image', 'yellowstone-national-park-1581879_1920.jpg'),
(180, 'services_wedding', 'Image', 'sv_wedding.jpg'),
(181, 'services_fashion', 'Image', 'sv_fashion.jpg'),
(182, 'services_commerical', 'Image', 'sv_commerical.jpg'),
(183, 'hireus_main', 'Image', 'hu_main.jpg'),
(185, 'team_joel', 'Image', 'tm_joel.jpg'),
(186, 'team_sophie', 'Image', 'tm_sophie.jpg'),
(189, 'team_sebastian', 'Image', 'tm_sebastian.jpg'),
(190, 'team_rachel', 'Image', 'tm_rachel.jpg'),
(191, 'team_ellie', 'Image', 'tm_ellie_sq.jpg'),
(193, 'team_klara', 'Image', 'tm_klara.jpg'),
(194, 'team_nura', 'Image', 'tm_nura.jpg'),
(195, 'team_paul', 'Image', 'people-2590615_1920.jpg'),
(196, 'team_petrina', 'Image', 'tm_petrina.jpg'),
(197, 'team_main', 'Image', 'canon-691673_1920.jpg'),
(198, 'services_main', 'Image', 'forest-931706_1920.jpg'),
(199, 'services_cta', 'Image', 'sparkler-677774_1920.jpg'),
(200, 'about_img01', 'Image', 'men-2425121_1920.jpg'),
(201, 'about_bkimg', 'Image', 'pier-407252_1920.jpg'),
(202, 'about_img02', 'Image', 'about01.jpg'),
(203, 'about_img03', 'Image', 'about03.jpg'),
(205, 'about_img04', 'Image', 'analog-1819188_1920.jpg'),
(206, 'about_bltitle01p01', 'Text', 'The'),
(207, 'about_bltitle01p02', 'Text', 'Origin Story'),
(208, 'about_bltextarea01', 'Textarea', '<p>Localhost photography was formed in 2002 by myself Paul McCloud and a group of friends after we graduated from Stanford University in 1999. We started small but have gradually built and built upon our portfolio to reach our current state developing ourselves and eachother.</p>\n<p>Here at localhost photography family is important, we continually grow and welcome new members regularly.</p>'),
(209, 'about_bltitle02p01', 'Text', 'Our Family'),
(210, 'about_bltitle02p02', 'Text', '& Expertise'),
(211, 'about_bltextarea02', 'Textarea', '<p>Our family consists of highly talented individuals from across the globe coming together to produce the highest quality content possible. We all take extreme pride in our work and seek to achieve only the best. Each of us has our own specialism and unique talents and techniques which we apply with extreme precision.</p>\n<p>Our specialism range from the basics, to specific subjects as well as advanced area like aerial and marine photography.</p>'),
(212, 'about_bltitle03p01', 'Text', 'But Isn\'t'),
(213, 'about_bltitle03p02', 'Text', 'There More'),
(214, 'about_bltextarea03', 'Textarea', '<p>Although there is much to discuss we like to keep things brief and to the point. Lots of our services are currently not present on our website and will be adding them as we update our content, stay tuned to see what exciting project we undertake next.</p>\n<p>If you want to know more or get in touch simply email us at info@localhost.com to find out more.</p>'),
(215, 'service_bltitle01p01', 'Text', 'Weddings'),
(216, 'service_bltitle01p02', 'Text', '& Events'),
(217, 'service_bltextarea01', 'Textarea', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>'),
(218, 'service_bltitle02p01', 'Text', 'Business'),
(219, 'service_bltitle02p02', 'Text', '& Commerical'),
(220, 'service_bltextarea02', 'Textarea', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>'),
(221, 'service_bltitle03p01', 'Text', 'Documentary'),
(222, 'service_bltitle03p02', 'Text', 'Fashion & Art'),
(223, 'service_bltextarea03', 'Textarea', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>'),
(224, 'service_ctatext', 'Text', 'Check Out Our Offers!'),
(225, 'service_ctalink', 'Text', '/hire-us.html'),
(226, 'site_linkedin', 'Text', 'https://www.linkedin.com'),
(227, 'site_youtube', 'Text', 'https://www.youtube.com'),
(228, 'site_copyright', 'Text', '2019 © Copyright Localhost Photography'),
(229, 'sophie_imgcount', 'Integer', '1103'),
(230, 'sophie_specialism', 'Text', 'Landscape'),
(231, 'paul_imgcount', 'Integer', '3111'),
(232, 'paul_specialism', 'Text', 'Architecture'),
(233, 'joel_imgcount', 'Integer', '952'),
(234, 'joel_specialism', 'Text', 'Fashion'),
(235, 'sebastian_imgcount', 'Integer', '226'),
(236, 'sebastian_specialism', 'Text', 'Urban'),
(237, 'rachel_imgcount', 'Integer', '2109'),
(238, 'rachel_specialism', 'Text', 'Portrait'),
(240, 'ellie_imgcount', 'Integer', '4022'),
(241, 'ellie_specialism', 'Text', 'Landscape'),
(242, 'petrina_imgcount', 'Integer', '5090'),
(243, 'petrina_specialism', 'Text', 'Weddings'),
(244, 'klara_imgcount', 'Integer', '1012'),
(246, 'klara_specialism', 'Text', 'Documentary'),
(247, 'nura_imgcount', 'Integer', '1501'),
(248, 'nura_specialism', 'Text', 'Wildlife'),
(249, 'plan01_title', 'Text', 'Day Plan'),
(250, 'plan02_title', 'Text', '3 Day Plan'),
(251, 'plan03_title', 'Text', 'Week Plan'),
(252, 'plan01_desc', 'Text', 'Hire us for the whole day, with access to 4 specialist crew members and their talents'),
(253, 'plan02_desc', 'Text', 'Hire 7 specialist crew members spread across 3 days to craft the perfect package for you'),
(254, 'plan03_desc', 'Text', 'Hire unlimited crew members for a week with full access to a range of talent and equipment'),
(255, 'plan01_price', 'Integer', '74.99'),
(256, 'plan02_price', 'Integer', '319.99'),
(257, 'plan03_price', 'Integer', '899.99'),
(258, 'plan01_bkdwn', 'Textarea', '<p class=\"margin-0\">- Intial Pre-production Meeting</p>\n<p class=\"margin-0\">- Select Any 4 Specialist Crew Members</p>\n<p class=\"margin-0\">- 7 Day Processing Wait</p>\n<p class=\"margin-0\">- Track, Mount, 6 Mid-Range DSLRs</p>'),
(259, 'plan02_bkdwn', 'Textarea', '<p class=\"margin-0\">- Maximum of 3 Pre-production Meetings</p>\n<p class=\"margin-0\">- Select Any 7 Specialist Crew Members</p>\n<p class=\"margin-0\">- 3 Day Processing Wait</p>\n<p class=\"margin-0\">- Track, Mount, 9 Top-Range DSLRs, Drone</p>'),
(260, 'plan03_bkdwn', 'Textarea', '<p class=\"margin-0\">- Unlimited Pre-production Meeting</p>\n<p class=\"margin-0\">- Unlimited Crew Members</p>\n<p class=\"margin-0\">- 1 Day Processing Wait</p>\n<p class=\"margin-0\">- Unlimited Equipment</p>'),
(262, 'welcome_l1', 'Text', 'Welcome to'),
(263, 'welcome_l2', 'Text', 'Localhost'),
(264, 'welcome_l3', 'Text', 'Photography'),
(265, 'welcome_btntxt', 'Text', 'Let\'s Get Started'),
(266, 'welcome_btnlink', 'Text', '#getting-started'),
(267, 'home_bltitle01p01', 'Text', '25 Years'),
(268, 'home_bltitle01p02', 'Text', 'Experience'),
(269, 'home_bldescription01', 'Textarea', '<p class=\"col-black\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n<p class=\"col-white\">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>'),
(270, 'home_bltitle02p01', 'Text', 'Over'),
(271, 'home_bltitle02p02', 'Text', 'Photos'),
(273, 'service_ctatxt', 'Text', 'Show Me More!');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `page_name` varchar(50) DEFAULT NULL,
  `page_file` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `page_name`, `page_file`) VALUES
(17, 'index', 'index.html'),
(18, 'about', 'about.html'),
(20, '_header', '_header.html'),
(44, '_footer', '_footer.html'),
(50, 'services', 'services.html'),
(55, 'the-team', 'the-team.html'),
(56, 'hire-us', 'hire-us.html');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `type` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `type`) VALUES
(2, 'Sophie Sharife', 'password', 'Editor'),
(6, 'Kiki Rumans', 'password', 'Administrator'),
(7, 'Yusif Saad', 'password', 'Editor'),
(10, 'Ayumi Sadamoto', 'password', 'Administrator'),
(11, 'Paul McCloud', 'password', 'Editor'),
(15, 'Joel Edrich', 'password', 'Editor'),
(18, 'Sebastian Ulav', 'password', 'Editor'),
(20, 'Rachel Wickham', 'password', 'Editor'),
(21, 'Ellie Thurston', 'password', 'Editor'),
(24, 'James Lockwood', 'password', 'Editor'),
(25, 'Petrina Sokolov', 'password', 'Editor'),
(26, 'Klara Armannsson', 'password', 'Editor'),
(27, 'Nura Abbas', 'password', 'Editor'),
(28, 'Liesa Haas', 'password', 'Editor'),
(30, 'Jonathan Smith', 'password', 'Editor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fields`
--
ALTER TABLE `fields`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
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
-- AUTO_INCREMENT for table `fields`
--
ALTER TABLE `fields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=274;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
