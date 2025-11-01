const dotenv = require("dotenv");
const path = require('path') ;
dotenv.config({path : path.resolve(__dirname , "../../.env")});

const mysql = require("mysql2");

let connection = mysql.createConnection({
  host: process.env.HOSTNAME,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

const sql = "CREATE DATABASE IF NOT EXISTS user";
connection.query(sql, (err, result) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database created succesfully");
  }
});

// creating the connection again once the database is created
let db = mysql.createConnection({
  host: process.env.HOSTNAME,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log("connection to database fails", err.message);
  } else console.log("connected to databaase  succesfully");
});

// schema
try {
  db.query(
    "CREATE TABLE IF NOT EXISTS userdata( name  VARCHAR(100) NOT NULL , email VARCHAR(100) PRIMARY KEY , password VARCHAR(100) NOT NULL , age INT ) ",
    (err, result) => {
      if (err) throw err;
      else console.log("Table created succesfully");
    }
  );
} catch (err) {
  console.log("Error is creating table", err.message);
}

module.exports = db;
