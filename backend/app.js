const express = require('express')
const cors = require('cors')
const app = express()
const env = require("dotenv").config();
const mysql = require("mysql2");
const dotenv = require("dotenv");

const router = express.Router();
app.use('/', router);
router.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
});

router.get('/', (req, res) => {
  return res.send('Hello World')
})

router.get('/search', (req, res) => {
  const searchKw = req.query.name
  const searchCt = req.query.city
  const searchTy = req.query.type
  const searchMt = req.query.month
  var sql = "";
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
  else if (searchCt && searchCt != "") 
  {
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
  else if (searchTy && searchTy != "") 
  {
    sql = "select * from Event_data WHERE Eventtype = '" + searchTy + "'"; // {type}
    if (searchMt && searchMt != "") {
      sql += " AND MONTH(DATE_TIME) = '" + searchMt + "'"; // {type, month}
    }
    console.log(sql);

  }
  else if (searchMt && searchMt != "") 
  {
    sql = "select * from Event_data WHERE MONTH(DATE_TIME) = '" + searchMt + "'"; // {month}
    console.log(sql);

  }
  connection.query(sql, function (error, results) {
    if (error) throw error;
    return res.send({ error: false, result: results });
  });

})

/* Run Server */
app.listen(process.env.PORT, function () {
  console.log("Server listening at Port " + process.env.PORT);
});
//app.listen(3333, () => console.log('Listen at port 3333'))
