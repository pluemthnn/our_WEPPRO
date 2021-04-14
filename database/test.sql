use `web_pro`;

 CREATE TABLE Event_data ( 
   EventID varchar(5) NOT NULL primary key,
   Eventname varchar(500),
   DATE_TIME datetime,
   Location varchar (500),
   Event_Description varchar(500), 
   Eventtype varchar(50),
   imgURL varchar(500)

 );
 
INSERT INTO Event_data(EventID, Eventname, DATE_TIME, Location, Event_Description, Eventtype,imgURL) VALUES
("CM001","The Final Comedy","2022-03-25 17:00:00","Watthana","The last Event","Comedy","https://i.imgur.com/SOCQ1KY.png"),
("EP001","EGAME League Season 3.5","2021-11-11 10:00:00","Watthana","The competition features 16 invited teams who initially play a group stage.","E-sport","https://i.imgur.com/deBta5C.png"),
("CC001","Buffalo Music Festival","2021-10-31 14:00:00","Phayathai","listen to the music like a buffalo listen to Alto fiddle","Concert","https://i.imgur.com/zvmrL2K.png"),
("AD001","Interior Design Consultation","2020-04-28 9:30:00","Bangna","Do you want to renovate and design your room? We can help you to find a solution for your space.","Art-design","https://i.imgur.com/CuZG37I.png"),
("CC002","EDM Night","2021-07-07 20:00:00","Watthana","To immerse party lovers in an electrifying experience, the venue is equipped with all kinds of production systems. 360° LED screens, light & sound systems, pyrotechnics, visual projectors, and hydraulic systems","Concert","https://i.imgur.com/Z6jZvu5.png"),
("AD002","The Self-Portrait","2021-10-05 10:00:00","Bangna","In the art world, self-portraits are a creative pursuit with a long history, existing in all emerging and passing art movements.","Art-design","https://i.imgur.com/Xr107S4.png"),
("CC003","International Jazz Day","2022-04-30 9:00:00","Ratchathewi","International Jazz Day is celebrated on April 30 with special jazz events.","Concert","https://i.imgur.com/Pmdj2qn.png"),
("CM002","Stan Up Comedy","2021-07-20 19:00:00","Ratchathewi","tand-up comedy is a comedy performance and narrative craft whereby a comedian communicates to a live audience, speaking directly to them through a microphone. ","Comedy","https://i.imgur.com/5Wkjx66.png"),
("EP002","Biggest E-sport tournament","2022-01-26 08:00:00","Pathumwan","E-sport tournament from natsack.","E-sport","https://i.pinimg.com/originals/0f/1f/60/0f1f608abeb42664d447776048eca9c7.jpg"),
("AD003","Art walks","2021-06-30 17:00:00","Latphrao","family friendly ambient with food trucks and DJ.","Art-design","https://cdn2.f-cdn.com/contestentries/1211030/27636741/5a41980da0777_thumb900.jpg"),
("CC004","Music Fest","2021-05-02 20:00:00","Ratchathewi","Freedom park dumaguete city street","Concert","https://d1csarkz8obe9u.cloudfront.net/posterpreviews/neon-music-festival-electronic-concert-poster-design-template-52ccf169d2cdb303750b062ec742ba71_screen.jpg?ts=1585311423"),
("CM003","ALL AGES MAGIC COMEDY SHOW with Charles The French and TADA!","2021-08-21 13:00:00","Phayathai","Get ready to laugh, be amazed and filled with a “how did they do that?” feeling! Expect a real tour-de-force of magic, comedy, music with old classics revisited, original acts you’ve never seen, audience participation","Comedy","https://p-u.popcdn.net/event_details/posters/000/010/806/large/8c01065f0b6c1450f579d06a2140d8cdc53a3cb1.jpg?1612878028"),
("CC005"," EXO PLANET #5 - EXplOration (Concert Poster)","2021-12-11 18:00:00","Pathumwan","SM True and the K-Pop king 'EXO' will take you across the dimension to explore the unknown space where the fifth epic concert has just begun. Come experiment the grand concert together in EXO PLANET #5 - EXplOration - in BANGKOK","Concert","https://i.redd.it/nj2fuyhth9131.jpg"),
("AD004","Happy valentine day","2022-02-14 10:00:00","Phayathai","Come join our Valentine’s Day special event that will allow you to experience wonderful art and craft.","Art-design","https://scrambledartblog.files.wordpress.com/2021/02/valentine-day-event.jpeg?w=721");

SELECT * FROM Event_data;

SELECT * from Event_data WHERE Eventname LIKE '%n%' AND MONTH(DATE_TIME) = 7;

select * from Event_data WHERE Eventname LIKE '%n%' AND Location = 'Watthana';
select * from Event_data WHERE Eventname LIKE '%n%' AND Location = 'Ratchathewi' AND Eventtype = 'Comedy';
