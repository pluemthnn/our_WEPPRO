//import
var mysql = require("mysql");
const express = require("express");
const app = express();
const bp = require("body-parser");
const router = express.Router();
// const mysql = require('mysql2');
const path = require("path");
const http = require("http");

app.use("/", router);

router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));

//create server
// const myserve = http.createServer((req, res) => {
//   console.log(`url ${req.url}`);
//   console.log(`method ${req.method}`);

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.write("request");
// });

//create connection
var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "itcs-3",
});

//connect to DB
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected DB: Hello");
});

let sql = "select * from Event_data";
con.query(sql, function (err, results) {
  if (err) throw err;
  console.log(results);
});

// path home
router.get("/home", (req, res) => {
  res.sendFile(__dirname + "/Homepage.html");
});

router.get("/result/:event", (req, res) => {
  var event_type = req.params.event;
  // console.log(event_type);
  //localhost:3020/event?type=CC001
  res.redirect("/event?type=" + event_type);
});

router.get("/event", (req, res) => {
  res.sendFile(__dirname + "/resultE.html");
});

router.get("/showevent/:type", (req, res) => {
  var type = req.params.type;
  con.query(
    "SELECT *  FROM `Event_data` WHERE EventID=?",
    type,
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);
        var event = {
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

console.log("listen on the port");
app.listen(3040);

//
