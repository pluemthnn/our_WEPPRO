const express = require("express");
const app = express();
const path = require("path");
const bp = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
var cors = require("cors");
app.use(cors());
app.use("/", router);
router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_name,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected DB: " + process.env.DB_name);
});

// User Part

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


router.get("/user_data/:Username", function (req, res) {
  let usr_name = req.params.Username;
  if (!usr_name) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide username." });
  }
  connection.query(
    "SELECT * FROM info where Username=?",
    usr_name,
    function (error, results) {
      if (error) throw error;
      return res.send({data: results[0]});
    }
  );
});

//method: get
//url: http://localhost:3030//user_data/

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
//   "Location": "Trad",
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

router.get("/event_data/:EventID", function (req, res) {
  let event_id = req.params.EventID;
  if (!event_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide username." });
  }
  connection.query(
    "SELECT * FROM Event_data where EventID=?",
    event_id,
    function (error, results) {
      if (error) throw error;
      return res.send({data: results[0]});
    }
  );
});

//method: get
//url: http://localhost:3030//event_data/

router.get("/event_data", function (req, res) {
  connection.query("SELECT * FROM Event_data", function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Event list." });
  });
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/admin.html"));
});

app.listen(3030, function () {
  console.log("Server listening at Port 3030");
});