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

var dbConn = mysql.createConnection({
  host: process.env.host,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_name,
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Connected DB: " + process.env.DB_name);
});

// User Part
router.post("/user-form-create", function (req, res) {
  let usr = req.body;
  console.log(usr);
  if (!usr) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user information" });
  }
  dbConn.query(
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

router.put("/user-form-update", function (req, res) {
  let usr_name = req.body.Username;
  let theuser = req.body;
  if (!usr_name || !theuser) {
    return res
      .status(400)
      .send({ error: theuser, message: "Please provide user information" });
  }
  dbConn.query(
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

router.delete("/user-form-delete", function (req, res) {
  let usr_name = req.body.Username;
  if (!usr_name) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide username" });
  }
  dbConn.query(
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

router.get("/user_data/:Username", function (req, res) {
  let usr_name = req.params.Username;
  if (!usr_name) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide student id." });
  }
  dbConn.query(
    "SELECT * FROM info where Username=?",
    usr_name,
    function (error, results) {
      if (error) throw error;
      return res.send({data: results[0]});
    }
  );
});

// router.get("/user_data", function (req, res) {
//   dbConn.query("SELECT * FROM info", function (error, results) {
//     if (error) throw error;
//     return res.send({ error: false, data: results, message: "User list." });
//   });
// });

// Event Part
router.post("/event-form-create", function (req, res) {
  let evt = req.body;
  console.log(evt);
  if (!evt) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide event information" });
  }
  dbConn.query(
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

router.put("/event-form-update", function (req, res) {
  let evt_id = req.body.EventID;
  let event = req.body;
  if (!evt_id || !event) {
    return res
      .status(400)
      .send({ error: event, message: "Please provide event information" });
  }
  dbConn.query(
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

router.delete("/event-form-delete", function (req, res) {
  let evt_id = req.body.EventID;
  if (!evt_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide event id" });
  }
  dbConn.query(
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

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/admin.html"));
});

app.listen(3030, function () {
  console.log("Server listening at Port 3030");
});