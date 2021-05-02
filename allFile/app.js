const express = require('express')
const cors = require('cors')
const app = express()
const bp = require("body-parser");
const env = require("dotenv").config();
const mysql = require("mysql2");
const dotenv = require("dotenv");

const router = express.Router();
app.use('/', router);
router.use(cors())
app.use(cors())
router.use(bp.json())
router.use(bp.urlencoded({ extended: true }))

/* Connection to MySQL */
var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

/* Connection to DB*/
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected DB: " + process.env.MYSQL_DATABASE);
  console.log("Click Link to open Website");
  console.log("http://localhost:3030/homepage");
});

router.post('/auth', async (req, res) => {
  //console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    connection.query('SELECT * FROM info WHERE Username = ? AND User_pwd = ?', [username, password], function (error, results) {
      if (error) throw error;
      if (results.length > 0) return res.send({ data: results[0], message: `Input Correct \n WELCOME ${username}` });
      return res.send({ message: 'Incorrect Username and/or Password!' });
    });
  }
  else {
    return res.status(400).send({ message: 'Please enter Username and Password!' });
  }
});

router.get('/search', (req, res) => {
  const searchKw = req.query.name
  const searchCt = req.query.city
  const searchTy = req.query.type
  const searchMt = req.query.month
  let sql = "";
  if (searchKw) {
    sql = "select * from Event_data WHERE Eventname LIKE '%" + searchKw + "%'"; // {name}
    if (searchCt && searchCt != "") {
      sql += " AND Location = '" + searchCt + "'"; // {name, city}
      if (searchTy && searchTy != "") {
        sql += " AND Eventtype = '" + searchTy + "'"; // {name, city, type}
        if (searchMt && searchMt != "") {
          sql += " AND  MONTH(DATE_TIME) = '" + searchMt + "'"; // {name, city, type, month}
        }
      } else if (searchMt && searchMt != "") {
        sql += " AND  MONTH(DATE_TIME) = '" + searchMt + "'"; // {name, city, month}
      }
    }
    else if (searchTy && searchTy != "") {
      // {name, type}
      sql += " AND Eventtype = '" + searchTy + "'";
      if (searchMt && searchMt != "") {
        sql += " AND  MONTH(DATE_TIME) = '" + searchMt + "'"; // {name, type, month}
      }
    }
    else if (searchMt && searchMt != "") {
      sql += " AND MONTH(DATE_TIME) = '" + searchMt + "'"; // {name, month}
    }
    console.log(sql);
  }
  else if (searchCt && searchCt != "") {
    sql = "select * from Event_data WHERE Location = '" + searchCt + "'"; // {city}
    if (searchTy && searchTy != "") {
      sql += " AND Eventtype = '" + searchTy + "'"; // {city, type}
      if (searchMt && searchMt != "") {
        sql += " AND MONTH(DATE_TIME) = '" + searchMt + "'"; // {city, type, month}
      }
    }
    else if (searchMt && searchMt != "") {
      sql += " AND MONTH(DATE_TIME) = '" + searchMt + "'"; // {city, month}
    }
    console.log(sql);
  }
  else if (searchTy && searchTy != "") {
    sql = "select * from Event_data WHERE Eventtype = '" + searchTy + "'"; // {type}
    if (searchMt && searchMt != "") {
      sql += " AND MONTH(DATE_TIME) = '" + searchMt + "'"; // {type, month}
    }
    console.log(sql);

  }
  else if (searchMt && searchMt != "") {
    sql = "select * from Event_data WHERE MONTH(DATE_TIME) = '" + searchMt + "'"; // {month}
    console.log(sql);

  }
  connection.query(sql, function (error, results) {
    if (error) throw error;
    return res.send({ error: false, result: results });
  });

});

// --------------------- path --------------------------
router.get("/homepage", (req, res) => {
  //console.log(__dirname);
  res.sendFile(__dirname + "/frontend/Homepage.html");
});

router.get("/searchpage", (req, res) => {
  //console.log(__dirname);
  res.sendFile(__dirname + "/frontend/search.html");
});

router.get("/loginpage", (req, res) => {
  //console.log(__dirname);
  res.sendFile(__dirname + "/frontend/Loginpage.html");
});

router.get("/registerpage", (req, res) => {
  //console.log(__dirname);
  res.sendFile(__dirname + "/frontend/register.html");
});

router.get("/aboutuspage", (req, res) => {
  //console.log(__dirname);
  res.sendFile(__dirname + "/frontend/aboutus.html");
});

router.get("/adminpage", (req, res) => {
  //console.log(__dirname);
  res.sendFile(__dirname + "/frontend/admin.html");
});

// --------------------- path --------------------------

// -------------------- Gdoyyy ------------------------
// let sql = "select * from Event_data";
// connection.query(sql, function (err, results) {
//   if (err) throw err;
//   console.log(results);
// });

router.get("/result/:event", (req, res) => {
  //if (error) throw error;
  let event_type = req.params.event;
  // console.log(event_type);
  //localhost:3020/event?type=CC001
  res.redirect("/event?type=" + event_type);
});

router.get("/event", (req, res) => {
  res.sendFile(__dirname + "/frontend/result.html");
});

router.get("/showevent/:type", (req, res) => {
  let type = req.params.type;
  connection.query(
    "SELECT *  FROM `Event_data` WHERE EventID=?",
    type,
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);
        let event = {
          name: result[0].Eventname,
          place: result[0].Location,
          etype: result[0].Eventtype,
          date: result[0].DATE_TIME,
          des: result[0].Event_Description,
          img: result[0].imgURL,
        };
        return res.send({ result: event });
      }
    }
  );
});

// ------------------ pure ------------------------

// Test case User Part
//method: post
//url: http://localhost:3030/user-form-create
//body: raw json
// {
//   "Username": "testuname",
//   "User_pwd": "testupwd",
//   "Email": "test@test.com",
//   "Fname": "testfname",
//   "Lname": "testlname",
//   "DOB" : "2001-01-18",
//   "Phone" : "0855555555"
// }

// {
//   "Username": "testuname2",
//   "User_pwd": "testupwd2",
//   "Email": "test@test2.com",
//   "Fname": "testfname2",
//   "Lname": "testlname",
//   "DOB" : "2005-08-28",
//   "Phone" : "0866666666"
// }

router.post("/user-form-create", function (req, res) {
  let usr = req.body;
  console.log(usr);
  if (!usr) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user information" });
  }
  connection.query(
    "INSERT INTO info SET ? ",
    usr,
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "New user has been created successfully.",
      });
    }
  );
});


//method: put
//url: http://localhost:3030/user-form-update
//body: raw json
// {
//   "Username": "testuname",
//   "User_pwd": "testupwdupdated",
//   "Email": "test@test.com",
//   "Fname": "testfname",
//   "Lname": "testlnameupdated",
//   "DOB" : "2001-01-18",
//   "Phone" : "0855555555"
// }

// {
//   "Username": "testuname2",
//   "User_pwd": "testupwd2",
//   "Email": "test@test2.com",
//   "Fname": "updated2",
//   "Lname": "testlname",
//   "DOB" : "2005-08-28",
//   "Phone" : "0877777777"
// }

router.put("/user-form-update", function (req, res) {
  let usr_name = req.body.Username;
  let theuser = req.body;
  if (!usr_name || !theuser) {
    return res
      .status(400)
      .send({ error: theuser, message: "Please provide user information" });
  }
  connection.query(
    "UPDATE info SET ? WHERE Username = ?",
    [theuser, usr_name],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "User has been updated successfully.",
      });
    }
  );
});

//method: delete
//url: http://localhost:3030/user-form-delete
//body: raw json
// {
//   "Username": "testuname"
// }

// {
//   "Username": "testuname2"
// }

router.delete("/user-form-delete", function (req, res) {
  let usr_name = req.body.Username;
  if (!usr_name) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide username" });
  }
  connection.query(
    "DELETE FROM info WHERE Username = ?",
    [usr_name],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "User has been deleted successfully.",
      });
    }
  );
});

//method: get
 //url: http://localhost:3030//user_data/:Username

 //input as url

 //url: http://localhost:3030//user_data/Gdoysaga
 //url: http://localhost:3030//user_data/sorapure

 router.get("/user_datasearch", function (req, res) {
  const user_usrname = req.query.Username;
  const user_email = req.query.Email;
  const user_fname = req.query.Fname;
  const user_lname = req.query.Lname;
  const user_dob = req.query.DOB;
  const user_phone = req.query.Phone;
  let sql = "";
  if (user_usrname) {
    sql = "SELECT * FROM info where Username LIKE '%" + user_usrname + "%'";
    if (user_email && user_email != "") {
      sql += "AND Email LIKE '%" + user_email + "%'";
    }
    if (user_fname && user_fname != "") {
      sql += "AND Fname LIKE '%" + user_fname + "%'";
    }
    if (user_lname && user_lname != "") {
      sql += "AND Lname LIKE '%" + user_lname + "%'";
    }
    if (user_dob && user_dob != "") {
      sql += "AND DOB LIKE '%" + user_dob + "%'";
    }
    if (user_phone && user_phone != "") {
      sql += "AND Phone LIKE '%" + user_phone + "%'";
    }
  } else if (user_email) {
    sql = "SELECT * FROM info where Email LIKE '%" + user_email + "%'";
    if (user_usrname && user_usrname != "") {
      sql += "AND Username LIKE '%" + user_usrname + "%'";
    }
    if (user_fname && user_fname != "") {
      sql += "AND Fname LIKE '%" + user_fname + "%'";
    }
    if (user_lname && user_lname != "") {
      sql += "AND Lname LIKE '%" + user_lname + "%'";
    }
    if (user_dob && user_dob != "") {
      sql += "AND DOB LIKE '%" + user_dob + "%'";
    }
    if (user_phone && user_phone != "") {
      sql += "AND Phone LIKE '%" + user_phone + "%'";
    }
  } else if (user_fname) {
    sql = "SELECT * FROM info where Fname LIKE '%" + user_fname + "%'";
    if (user_usrname && user_usrname != "") {
      sql += "AND Username LIKE '%" + user_usrname + "%'";
    }
    if (user_email && user_email != "") {
      sql += "AND Email LIKE '%" + user_email + "%'";
    }
    if (user_lname && user_lname != "") {
      sql += "AND Lname LIKE '%" + user_lname + "%'";
    }
    if (user_dob && user_dob != "") {
      sql += "AND DOB LIKE '%" + user_dob + "%'";
    }
    if (user_phone && user_phone != "") {
      sql += "AND Phone LIKE '%" + user_phone + "%'";
    }
  } else if (user_lname) {
    sql = "SELECT * FROM info where Lname LIKE '%" + user_lname + "%'";
    if (user_usrname && user_usrname != "") {
      sql += "AND Username LIKE '%" + user_usrname + "%'";
    }
    if (user_email && user_email != "") {
      sql += "AND Email LIKE '%" + user_email + "%'";
    }
    if (user_fname && user_fname != "") {
      sql += "AND Fname LIKE '%" + user_fname + "%'";
    }
    if (user_dob && user_dob != "") {
      sql += "AND DOB LIKE '%" + user_dob + "%'";
    }
    if (user_phone && user_phone != "") {
      sql += "AND Phone LIKE '%" + user_phone + "%'";
    }
  } else if (user_dob) {
    sql = "SELECT * FROM info where DOB LIKE '%" + user_dob + "%'";
    if (user_usrname && user_usrname != "") {
      sql += "AND Username LIKE '%" + user_usrname + "%'";
    }
    if (user_email && user_email != "") {
      sql += "AND Email LIKE '%" + user_email + "%'";
    }
    if (user_fname && user_fname != "") {
      sql += "AND Fname LIKE '%" + user_fname + "%'";
    }
    if (user_lname && user_lname != "") {
      sql += "AND Lname LIKE '%" + user_lname + "%'";
    }
    if (user_phone && user_phone != "") {
      sql += "AND Phone LIKE '%" + user_phone + "%'";
    }
  } else if (user_phone) {
    sql = "SELECT * FROM info where Phone LIKE '%" + user_phone + "%'";
    if (user_usrname && user_usrname != "") {
      sql += "AND Username LIKE '%" + user_usrname + "%'";
    }
    if (user_email && user_email != "") {
      sql += "AND Email LIKE '%" + user_email + "%'";
    }
    if (user_fname && user_fname != "") {
      sql += "AND Fname LIKE '%" + user_fname + "%'";
    }
    if (user_lname && user_lname != "") {
      sql += "AND Lname LIKE '%" + user_lname + "%'";
    }
    if (user_dob && user_dob != "") {
      sql += "AND DOB LIKE '%" + user_dob + "%'";
    }
  } else {
    sql = "SELECT * FROM info";
  }
  connection.query(sql, function (error, results) {
    if (error) throw error;
    return res.send({ data: results });
  });
});

//method: get
 //url: http://localhost:3030/user_data/

 router.get("/user_data", function (req, res) {
  connection.query("SELECT * FROM info", function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "User list." });
  });
});

// Event Part

//method: post
//url: http://localhost:3030/event-form-update
//body: raw json
// {
//   "EventID": "TS001",
//   "Eventname": "TestEvent",
//   "DATE_TIME": "2001-01-01 10-00-00",
//   "Location": "Bangkok",
//   "Event_Description": "Test Event Description",
//   "Eventtype" : "E-sport",
//   "imgURL" : "https://i.imgur.com/N9YU9nI.jpeg"
// }

// {
//   "EventID": "TS002",
//   "Eventname": "TestEventNumber2",
//   "DATE_TIME": "2002-02-02 11-11-11",
//   "Location": "Latphrao",
//   "Event_Description": "Test Event Description Number2",
//   "Eventtype" : "Comedy",
//   "imgURL" : "https://i.imgur.com/i1hGd7U.jpg"
// }

router.post("/event-form-create", function (req, res) {
  let evt = req.body;
  console.log(evt);
  if (!evt) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide event information" });
  }
  connection.query(
    "INSERT INTO Event_data SET ? ",
    evt,
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "New event has been created successfully.",
      });
    }
  );
});

//method: put
//url: http://localhost:3030/event-form-update
//body: raw json
// {
//   "EventID": "TS001",
//   "Eventname": "TestEvent",
//   "DATE_TIME": "2001-01-01 20-35-00",
//   "Location": "Bangkok Updated",
//   "Event_Description": "Test Event Description Updated",
//   "Eventtype" : "E-sport",
//   "imgURL" : "https://i.imgur.com/N9YU9nI.jpeg"
// }

// {
//   "EventID": "TS002",
//   "Eventname": "TestEventNumber2 Updated",
//   "DATE_TIME": "2002-02-02 22-22-22",
//   "Location": "Trad",
//   "Event_Description": "Test Event Description Number2 Updated",
//   "Eventtype" : "Comedy",
//   "imgURL" : "https://i.imgur.com/i1hGd7U.jpg"
// }

router.put("/event-form-update", function (req, res) {
  let evt_id = req.body.EventID;
  let event = req.body;
  if (!evt_id || !event) {
    return res
      .status(400)
      .send({ error: event, message: "Please provide event information" });
  }
  connection.query(
    "UPDATE Event_data SET ? WHERE EventID = ?",
    [event, evt_id],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Event has been updated successfully.",
      });
    }
  );
});

//method: delete
//url: http://localhost:3030/event-form-delete
//body: raw json
// {
//   "EventID": "TS001"
// }

// {
//   "EventID": "TS002"
// }

router.delete("/event-form-delete", function (req, res) {
  let evt_id = req.body.EventID;
  if (!evt_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide event id" });
  }
  connection.query(
    "DELETE FROM Event_data WHERE EventID = ?",
    [evt_id],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Event has been deleted successfully.",
      });
    }
  );
});

//method: get
 //url: http://localhost:3030//event_data/:EventID
 
 //input as url:

 //http://localhost:3030//event_data/AD001
 //http://localhost:3030//event_data/AD002

 router.get("/event_datasearch", function (req, res) {
  const event_id = req.query.EventID;
  const event_name = req.query.EventName;
  const event_dt = req.query.DateTime;
  const event_location = req.query.Location;
  const event_type = req.query.EventType;
  const event_desc = req.query.EventDesc;
  let sql = "";
  if (event_id) {
    sql = "SELECT * FROM Event_data where EventID LIKE '%" + event_id + "%'";
    if (event_name && event_name != "") {
      sql += "AND Eventname LIKE '%" + event_name + "%'";
    }
    if (event_dt && event_dt != "") {
      sql += "AND DATE_TIME LIKE '%" + event_dt + "%'";
    }
    if (event_location && event_location != "") {
      sql += "AND Location LIKE '%" + event_location + "%'";
    }
    if (event_type && event_type != "") {
      sql += "AND Eventtype ='" + event_type + "'";
    }
    if (event_desc && event_desc != "") {
      sql += "AND Event_Description LIKE '%" + event_desc + "%'";
    }
  } else if (event_name) {
    sql =
      "SELECT * FROM Event_data where Eventname LIKE '%" + event_name + "%'";
    if (event_id && event_id != "") {
      sql += "AND EventID LIKE '%" + event_id + "%'";
    }
    if (event_dt && event_dt != "") {
      sql += "AND DATE_TIME LIKE '%" + event_dt + "%'";
    }
    if (event_location && event_location != "") {
      sql += "AND Location LIKE '%" + event_location + "%'";
    }
    if (event_type && event_type != "") {
      sql += "AND Eventtype ='" + event_type + "'";
    }
    if (event_desc && event_desc != "") {
      sql += "AND Event_Description LIKE '%" + event_desc + "%'";
    }
  } else if (event_dt) {
    sql = "SELECT * FROM Event_data where DATE_TIME LIKE '%" + event_dt + "%'";
    if (event_id && event_id != "") {
      sql += "AND EventID LIKE '%" + event_id + "%'";
    }
    if (event_name && event_name != "") {
      sql += "AND Eventname LIKE '%" + event_name + "%'";
    }
    if (event_location && event_location != "") {
      sql += "AND Location LIKE '%" + event_location + "%'";
    }
    if (event_type && event_type != "") {
      sql += "AND Eventtype ='" + event_type + "'";
    }
    if (event_desc && event_desc != "") {
      sql += "AND Event_Description LIKE '%" + event_desc + "%'";
    }
  } else if (event_location) {
    sql =
      "SELECT * FROM Event_data where Location LIKE '%" + event_location + "%'";
    if (event_id && event_id != "") {
      sql += "AND EventID LIKE '%" + event_id + "%'";
    }
    if (event_name && event_name != "") {
      sql += "AND Eventname LIKE '%" + event_name + "%'";
    }
    if (event_dt && event_dt != "") {
      sql += "AND DATE_TIME LIKE '%" + event_dt + "%'";
    }
    if (event_type && event_type != "") {
      sql += "AND Eventtype ='" + event_type + "'";
    }
    if (event_desc && event_desc != "") {
      sql += "AND Event_Description LIKE '%" + event_desc + "%'";
    }
  } else if (event_type) {
    sql = "SELECT * FROM Event_data where Eventtype = '" + event_type + "'";
    if (event_id && event_id != "") {
      sql += "AND EventID LIKE '%" + event_id + "%'";
    }
    if (event_name && event_name != "") {
      sql += "AND Eventname LIKE '%" + event_name + "%'";
    }
    if (event_dt && event_dt != "") {
      sql += "AND DATE_TIME LIKE '%" + event_dt + "%'";
    }
    if (event_location && event_location != "") {
      sql += "AND Location LIKE '%" + event_location + "%'";
    }
    if (event_desc && event_desc != "") {
      sql += "AND Event_Description LIKE '%" + event_desc + "%'";
    }
  } else if (event_desc) {
    sql =
      "SELECT * FROM Event_data where Event_Description LIKE '%" +
      event_desc +
      "%'";
    if (event_id && event_id != "") {
      sql += "AND EventID LIKE '%" + event_id + "%'";
    }
    if (event_name && event_name != "") {
      sql += "AND Eventname LIKE '%" + event_name + "%'";
    }
    if (event_dt && event_dt != "") {
      sql += "AND DATE_TIME LIKE '%" + event_dt + "%'";
    }
    if (event_location && event_location != "") {
      sql += "AND Location LIKE '%" + event_location + "%'";
    }
    if (event_type && event_type != "") {
      sql += "AND Eventtype ='" + event_type + "'";
    }
  } else {
    sql = "SELECT * FROM Event_data";
  }
  connection.query(sql, function (error, results) {
    if (error) throw error;
    return res.send({ data: results });
  });
});

//method: get
//url: http://localhost:3030//event_data/

router.get("/event_data", function (req, res) {
  connection.query("SELECT * FROM Event_data", function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Event list." });
  });
});

/* Run Server */
app.listen(process.env.PORT, function () {
  console.log("Server listening at Port " + process.env.PORT);
});
//app.listen(3333, () => console.log('Listen at port 3333'))
