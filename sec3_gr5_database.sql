use `web_pro`;

DROP TABLE IF EXISTS `Event_data`;
CREATE TABLE `Event_data` (
  `EventID` varchar(5) NOT NULL,
  `Eventname` varchar(500) DEFAULT NULL,
  `DATE_TIME` datetime DEFAULT NULL,
  `Location` varchar(500) DEFAULT NULL,
  `Event_Description` varchar(500) DEFAULT NULL,
  `Eventtype` varchar(50) DEFAULT NULL,
  `imgURL` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `info`;
CREATE TABLE `info` (
  `Username` varchar(255) DEFAULT NULL,
  `User_pwd` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Fname` varchar(255) DEFAULT NULL,
  `Lname` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `User_role` varchar(1) DEFAULT NULL,
  `login_log` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Event_data` (`EventID`, `Eventname`, `DATE_TIME`, `Location`, `Event_Description`, `Eventtype`, `imgURL`) VALUES
('AD001', 'Interior Design Consultation', '2020-04-28 09:30:00', 'Bangna', 'Do you want to renovate and design your room? We can help you to find a solution for your space.', 'Art-design', 'https://i.imgur.com/CuZG37I.png'),
('AD002', 'The Self-Portrait', '2021-10-05 10:00:00', 'Bangna', 'In the art world, self-portraits are a creative pursuit with a long history, existing in all emerging and passing art movements.', 'Art-design', 'https://i.imgur.com/Xr107S4.png'),
('AD003', 'Art walks', '2021-06-30 17:00:00', 'Latphrao', 'family friendly ambient with food trucks and DJ.', 'Art-design', 'https://cdn2.f-cdn.com/contestentries/1211030/27636741/5a41980da0777_thumb900.jpg'),
('AD004', 'Happy valentine day', '2022-02-14 10:00:00', 'Phayathai', 'Come join our Valentine’s Day special event that will allow you to experience wonderful art and craft.', 'Art-design', 'https://scrambledartblog.files.wordpress.com/2021/02/valentine-day-event.jpeg?w=721'),
('CC001', 'Buffalo Music Festival', '2021-10-31 14:00:00', 'Phayathai', 'listen to the music like a buffalo listen to Alto fiddle', 'Concert', 'https://i.imgur.com/zvmrL2K.png'),
('CC002', 'EDM Night', '2021-07-07 20:00:00', 'Watthana', 'To immerse party lovers in an electrifying experience, the venue is equipped with all kinds of production systems. 360° LED screens, light & sound systems, pyrotechnics, visual projectors, and hydraulic systems', 'Concert', 'https://i.imgur.com/Z6jZvu5.png'),
('CC003', 'International Jazz Day', '2022-04-30 09:00:00', 'Ratchatewhi', 'International Jazz Day is celebrated on April 30 with special jazz events.', 'Concert', 'https://i.imgur.com/Pmdj2qn.png'),
('CC004', 'Music Fest', '2021-05-02 20:00:00', 'Ratchatewhi', 'Freedom park dumaguete city street', 'Concert', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/neon-music-festival-electronic-concert-poster-design-template-52ccf169d2cdb303750b062ec742ba71_screen.jpg?ts=1585311423'),
('CC005', ' EXO PLANET #5 - EXplOration (Concert Poster)', '2021-12-11 18:00:00', 'Pathumwan', 'SM True and the K-Pop king \'EXO\' will take you across the dimension to explore the unknown space where the fifth epic concert has just begun. Come experiment the grand concert together in EXO PLANET #5 - EXplOration - in BANGKOK', 'Concert', 'https://i.redd.it/nj2fuyhth9131.jpg'),
('CM001', 'The Final Comedy', '2022-03-25 17:00:00', 'Watthana', 'The last Event', 'Comedy', 'https://i.imgur.com/SOCQ1KY.png'),
('CM002', 'Stand Up Comedy', '2021-07-20 19:00:00', 'Ratchatewhi', 'stand-up comedy is a comedy performance and narrative craft whereby a comedian communicates to a live audience, speaking directly to them through a microphone. ', 'Comedy', 'https://i.imgur.com/5Wkjx66.png'),
('CM003', 'ALL AGES MAGIC COMEDY SHOW with Charles The French and TADA!', '2021-08-21 13:00:00', 'Phayathai', 'Get ready to laugh, be amazed and filled with a “how did they do that?” feeling! Expect a real tour-de-force of magic, comedy, music with old classics revisited, original acts you’ve never seen, audience participation', 'Comedy', 'https://p-u.popcdn.net/event_details/posters/000/010/806/large/8c01065f0b6c1450f579d06a2140d8cdc53a3cb1.jpg?1612878028'),
('EP001', 'EGAME League Season 3.5', '2021-11-11 10:00:00', 'Watthana', 'The competition features 16 invited teams who initially play a group stage.', 'E-sport', 'https://i.imgur.com/deBta5C.png'),
('EP002', 'Biggest E-sport tournament', '2022-01-26 08:00:00', 'Pathumwan', 'E-sport tournament from natsack.', 'E-sport', 'https://i.pinimg.com/originals/0f/1f/60/0f1f608abeb42664d447776048eca9c7.jpg');

INSERT INTO `info` (`Username`, `User_pwd`, `Email`, `Fname`, `Lname`, `DOB`, `Phone`, `User_role`, `login_log`) VALUES
('Gdoysaga', 'babyjubjub', 'gdoyssaga@gmail.com', 'Thanapron', 'Khunprom', '2000-07-17', '0972656151', '0', NULL),
('masterboy99', 'CherryFrappe', 'master99boy@gmail.com', 'Ratthakit', 'Sriprachayanun', '2000-08-01', '0881234567', '0', NULL),
('akiracamelhorse', 'hwf7ffqwy', 'cdon.035@outlook.com', 'Ace', 'Ventura', '1995-06-02', '0649399369', '1', NULL),
('dogcherry', 'djnvjcmke', 'Jimmyhopp@yahoo.com', 'Jim', 'Hopper', '1999-10-10', '0653282269', '1', NULL),
('CuckooBlue', 'RiCATSwav', 'uzumaki_Naru1234@gmail.com', 'Naruto', 'Uzumaki', '1991-12-23', '0935545693', '1', NULL),
('Mudpuppy', 'bonyupticket', 'Iwill-byebye@outlook.com', 'Will', 'Byers', '1980-11-10', '0929265493', '1', NULL),
('belllolo', 'Akasaismyboyfriend', 'bellloveMU@outlook.com', 'Sathita', 'Intarachote', '2000-08-10', '0808949456', '0', NULL),
('PluemloveJam', 'JamlovePluemtoo', 'pluemSWUzoozaa@gmail.com', 'Thanwarat', 'Wongtongtam', '1997-05-11', '0643294298', '0', NULL),
('sorapure', '57y64zj7g3vb', 'pureissorawitisrealO@outlook.com', 'Sorawit', 'Ongsri', '1993-03-04', '0993982946', '0', NULL),
('mheeplatoo', 'bowkeyLION', 'catcat_lioncat@gmail.com', 'Bob', 'Newby', '1988-09-09', '0807985155', '1', NULL);
