const express = require('express')
const cors = require('cors')
const app = express()
const env = require("dotenv").config();
const mysql = require("mysql2");
const dotenv = require("dotenv");

const router = express.Router();
app.use('/', router);
router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

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

router.post('/auth', (request, response) => {
  console.log('Hello auth');
  let username = request.body.username;
  let password = request.body.password;
  if (username && password) {
    connection.query('SELECT * FROM info WHERE Username = ? AND User_pwd = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        alert(`Input Correct \n WELLCOME `);
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
  //return res.send('Hello World');
  response.end();
})

/* Run Server */
app.listen(process.env.PORT, function () {
    console.log("Server listening at Port " + process.env.PORT);
  });
  //app.listen(3333, () => console.log('Listen at port 3333'))
  