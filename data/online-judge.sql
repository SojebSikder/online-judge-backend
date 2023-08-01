-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2023 at 08:41 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online-judge`
--

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `title`, `action`, `subject`, `conditions`, `fields`) VALUES
(1, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'user_management_read', 'Read', 'User', NULL, NULL),
(2, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'user_management_create', 'Create', 'User', NULL, NULL),
(3, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'user_management_update', 'Update', 'User', NULL, NULL),
(4, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'user_management_show', 'Show', 'User', NULL, NULL),
(5, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'user_management_delete', 'Delete', 'User', NULL, NULL),
(6, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'role_management_read', 'Read', 'Role', NULL, NULL),
(7, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'role_management_create', 'Create', 'Role', NULL, NULL),
(8, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'role_management_update', 'Update', 'Role', NULL, NULL),
(9, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'role_management_show', 'Show', 'Role', NULL, NULL),
(10, '2023-07-01 11:49:10.700', '2023-07-01 11:49:10.700', NULL, 1, 'role_management_delete', 'Delete', 'Role', NULL, NULL);

--
-- Dumping data for table `permission_roles`
--

INSERT INTO `permission_roles` (`created_at`, `updated_at`, `permission_id`, `role_id`) VALUES
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 1, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 2, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 3, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 4, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 5, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 6, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 7, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 8, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 9, 2),
('2023-07-01 11:49:11.539', '2023-07-01 11:49:11.539', 10, 2);

--
-- Dumping data for table `problems`
--

INSERT INTO `problems` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `author_id`, `name`, `slug`, `time_limit`, `memory_limit`, `statement`, `input_format`, `output_format`, `note`, `difficulty`, `sample_test_cases`, `system_test_cases`) VALUES
(1, '2023-07-01 11:53:44.837', '2023-07-01 11:53:44.837', NULL, 1, 2, 'Watermelon', 'watermelon', '1.000000000000000000000000000000', 64, '<p>One hot summer day Pete and his friend Billy decided to buy a watermelon. They chose the biggest and the ripest one, in their opinion. After that the watermelon was weighed, and the scales showed&nbsp;<em>w</em>&nbsp;kilos. They rushed home, dying of thirst, and decided to divide the berry, however they faced a hard problem.</p><p><br></p><p>Pete and Billy are great fans of even numbers, that\'s why they want to divide the watermelon in such a way that each of the two parts weighs even number of kilos, at the same time it is not obligatory that the parts are equal. The boys are extremely tired and want to start their meal as soon as possible, that\'s why you should help them and find out, if they can divide the watermelon in the way they want. For sure, each of them should get a part of positive weight.</p>', '<p>The first (and the only) input line contains integer number&nbsp;<em>w</em>&nbsp;(1 ≤ <em>w</em> ≤ 100) — the weight of the watermelon bought by the boys</p>', '<p>Print&nbsp;YES, if the boys can divide the watermelon into two parts, each of them weighing even number of kilos; and&nbsp;NO&nbsp;in the opposite case.</p>', '<p>For example, the boys can divide the watermelon into two parts of 2 and 6 kilos respectively (another variant — two parts of 4 and 4 kilos).</p>', 'easy', '[{\"input\":\"8\",\"output\":\"YES\"}]', '[]'),
(2, '2023-07-01 13:41:32.855', '2023-07-01 13:41:32.855', NULL, 1, 2, 'Way Too Long Words', 'way-too-long-words', '1.000000000000000000000000000000', 64, '<p>Sometimes some words like \"localization\" or \"internationalization\" are so long that writing them many times in one text is quite tiresome.</p><p><br></p><p>Let\'s consider a word&nbsp;<em>too long</em>, if its length is&nbsp;<strong>strictly more</strong>&nbsp;than&nbsp;10&nbsp;characters. All too long words should be replaced with a special abbreviation.</p><p><br></p><p>This abbreviation is made like this: we write down the first and the last letter of a word and between them we write the number of letters between the first and the last letters. That number is in decimal system and doesn\'t contain any leading zeroes.</p><p><br></p><p>Thus, \"localization\" will be spelt as \"l10n\", and \"internationalization» will be spelt as \"i18n\".</p><p><br></p><p>You are suggested to automatize the process of changing the words with abbreviations. At that all too long words should be replaced by the abbreviation and the words that are not too long should not undergo any changes.</p>', '<p>The first line contains an integer&nbsp;<em>n</em>&nbsp;(1 ≤ <em>n</em> ≤ 100). Each of the following&nbsp;<em>n</em>&nbsp;lines contains one word. All the words consist of lowercase Latin letters and possess the lengths of from&nbsp;1&nbsp;to&nbsp;100&nbsp;characters.</p>', '<p>Print&nbsp;<em>n</em>&nbsp;lines. The&nbsp;<em>i</em>-th line should contain the result of replacing of the&nbsp;<em>i</em>-th word from the input data.</p>', NULL, 'easy', '[{\"input\":\"word\",\"output\":\"word\"},{\"input\":\"localization\",\"output\":\"l10n\"},{\"input\":\"internationalization\",\"output\":\"i18n\"},{\"input\":\"pneumonoultramicroscopicsilicovolcanoconiosis\",\"output\":\"p43s\"}]', '[]');

--
-- Dumping data for table `problem_tags`
--

INSERT INTO `problem_tags` (`id`, `created_at`, `updated_at`, `problem_id`, `tag_id`) VALUES
(9, '2023-07-01 13:29:37.832', '2023-07-01 13:29:37.832', 1, 3),
(10, '2023-07-01 13:29:37.902', '2023-07-01 13:29:37.902', 1, 2),
(18, '2023-07-01 15:16:33.314', '2023-07-01 15:16:33.314', 2, 4);

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `date_of_birth`, `country`, `city`, `organization`, `recipient_name`, `recipient_zip_code`, `recipient_country`, `recipient_state`, `recipient_city`, `recipient_address`, `recipient_phone_number`) VALUES
(1, 2, '2001-11-14', 'Bangladesh', 'Gazipur', 'Uttara University', 'Sojeb Sikder', '1712', 'Bangladesh', 'Dhaka', 'Gazipur', '27 road', '018');

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `title`, `name`) VALUES
(1, '2023-07-01 11:49:10.608', '2023-07-01 11:49:10.608', NULL, 1, 'Super Admin', 'su-admin'),
(2, '2023-07-01 11:49:10.608', '2023-07-01 11:49:10.608', NULL, 1, 'Admin', 'admin');

--
-- Dumping data for table `role_users`
--

INSERT INTO `role_users` (`created_at`, `updated_at`, `role_id`, `user_id`) VALUES
('2023-07-01 11:49:11.223', '2023-07-01 11:49:11.223', 1, 1),
('2023-07-01 11:49:11.414', '2023-07-01 11:49:11.414', 1, 2);

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `code`, `language`, `verdict`, `time`, `memory`, `result`, `is_contest`, `score`, `problem_id`, `user_id`) VALUES
(1, '2023-07-01 14:38:36.722', '2023-07-01 14:38:36.722', NULL, 1, '#include <stdio.h>\n \n\nint main(){\n	int n;\n	scanf(\"%d\", &n);\n	if(n<4 | n&1){\n		printf(\"NO\");\n	}else{\n		printf(\"YES\");\n	}\n \n}\n ', 'cpp', 'AC', 0, -4044, '[{\"actualOutput\":\"YES\",\"expectedOutput\":\"YES\",\"time\":0,\"memory\":-4044,\"AC\":true,\"verdict\":\"AC\"}]', 0, 0, 1, 2),
(2, '2023-07-01 14:44:23.408', '2023-07-01 14:44:23.408', NULL, 1, '#include<stdio.h>\n#include<string.h>;\n \nint main(){\n	char s[110],p;\n	\n	for(;gets(s);)\n		if((p=strlen(s))>10)\n			printf(\"%c%d%c\\n\",*s,p-2,s[p-1]);\n		else puts(s);\n}', 'cpp', 'AC', 0, -15216, '[{\"actualOutput\":\"word\",\"expectedOutput\":\"word\",\"time\":0,\"memory\":-3948,\"AC\":true,\"verdict\":\"AC\"},{\"actualOutput\":\"l10n\",\"expectedOutput\":\"l10n\",\"time\":0,\"memory\":-3724,\"AC\":true,\"verdict\":\"AC\"},{\"actualOutput\":\"i18n\",\"expectedOutput\":\"i18n\",\"time\":0,\"memory\":-3708,\"AC\":true,\"verdict\":\"AC\"},{\"actualOutput\":\"p43s\",\"expectedOutput\":\"p43s\",\"time\":0,\"memory\":-3836,\"AC\":true,\"verdict\":\"AC\"}]', 0, 0, 2, 2),
(3, '2023-07-01 14:46:31.387', '2023-07-01 14:46:31.387', NULL, 1, '#include<stdio.h>\n#include<string.h>;\n \nint main(){\n	int n;\n	char s[110],p;\n	scanf(\"%d\\n\",&n);\n	\n	for(;gets(s),n--;)\n		if((p=strlen(s))>10)\n			printf(\"%c%d%c\\n\",*s,p-2,s[p-1]);\n		else puts(s);\n}', 'cpp', 'WA', 0, -15152, '[{\"actualOutput\":\"\",\"expectedOutput\":\"word\",\"time\":0,\"memory\":-3724,\"WA\":true,\"verdict\":\"WA\"},{\"actualOutput\":\"\",\"expectedOutput\":\"l10n\",\"time\":0,\"memory\":-3756,\"WA\":true,\"verdict\":\"WA\"},{\"actualOutput\":\"\",\"expectedOutput\":\"i18n\",\"time\":0,\"memory\":-3740,\"WA\":true,\"verdict\":\"WA\"},{\"actualOutput\":\"\",\"expectedOutput\":\"p43s\",\"time\":0,\"memory\":-3932,\"WA\":true,\"verdict\":\"WA\"}]', 0, 0, 2, 2);

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `name`, `slug`) VALUES
(1, '2023-07-01 11:53:44.973', '2023-07-01 11:53:44.973', NULL, 1, 'Array', 'array'),
(2, '2023-07-01 11:54:49.727', '2023-07-01 11:54:49.727', NULL, 1, 'Math', 'math'),
(3, '2023-07-01 11:54:49.936', '2023-07-01 11:54:49.936', NULL, 1, 'Brute force', 'brute-force'),
(4, '2023-07-01 13:42:04.230', '2023-07-01 13:42:04.230', NULL, 1, 'Strings', 'strings');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created_at`, `updated_at`, `deleted_at`, `status`, `availability`, `score`, `email`, `username`, `fname`, `lname`, `password`, `avatar`, `is_admin`) VALUES
(1, '2023-07-01 11:49:11.003', '2023-07-01 11:49:11.003', NULL, 1, NULL, 0, 'admin@example.com', 'admin', NULL, NULL, '$2b$10$tAMkwACPoH6Y3mwSC3OIEeAT3wIvzqc/P2ZtSS8ShtkVsMc8r6nYe', NULL, 1),
(2, '2023-07-01 11:49:11.152', '2023-07-01 11:49:11.152', NULL, 1, NULL, 0, 'sojebsikder@gmail.com', 'sojebsikder', 'Sojeb', 'Sikder', '$2b$10$Sxzh270a.aN8nltcX0/7JOreHmkHa65e2QImR2wuvbVUrbTuq3Z3K', '9f105e455e109e8fd3eed522fd5f277f8logo.jpg', 1);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
