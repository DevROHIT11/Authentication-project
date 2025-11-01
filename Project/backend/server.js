const db = require("./db.js");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 3000;
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(cors({
  origin: "https://authentication-project-tflu.onrender.com", // your actual frontend
  credentials: true, // allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

app.post("/signup", (req, res) => {
  const { name, email, password, age } = req.body;
  //   console.log(name, email, password, age);

  // encrypting the password
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      console.log("Encrypted password : ", hash);

      // storing user data into database
      const sql = await "INSERT INTO userdata VALUE (? ,?, ?, ? ) ";
      db.query(sql, [name, email, hash, age], (err, result) => {
        if (err) {
          res.json({ message: "User Already exist", redirect: "/error" });
          console.log(err.message);
        } else {
          console.log("user created succesfully");

          //jwt token -- sending cookies to frontend
          const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
          res.cookie("token", token, {
            httpOnly: true, // prevents JS access
            secure: true, // required for HTTPS (Render uses HTTPS)
            sameSite: "none", //for cross sites
          });
          // sending response to frontend
          res.json({
            message: "Account Created Successfully ",
            redirect: `/signin`,
          });
        }
      });
    });
  });
});

// serving all the file to  browser when the url wants to acces the file inside this folder
app.use(express.static(path.join(__dirname, "../public")));

// login
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT password ,name FROM userdata WHERE email = ? `;

  db.query(sql, [email], (err, result) => {
    // result is return in array and that array contains js object
    if (result == 0) {
      res.json({
        message: "User does not exists. Please Create account ",
        redirect: "/",
      });
    } else {
      // authenticating the user
      console.log(result[0]);
      const StoredHash = result[0].password;
      bcrypt.compare(password, StoredHash, function (err, isMatch) {
        if (!isMatch) {
          res.json({
            message: "Incorrect password ,Try again !",
            redirect: "/signin",
          });
        } else {
          const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
          res.cookie("token", token, {
            httpOnly: true, // prevents JS access
            secure: true, // required for HTTPS (Render uses HTTPS)
            sameSite: "none",
          });
          res.json({
            message: "Login succesfully",
            redirect: `/index.html?user=${result[0].name}`,
            name: `${result[0].name}`,
          });
        }
      });
    }
  });
});

// routings
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signin.html"));
});

// homepage
app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// if error
app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/error.html"));
});

app.listen(port, () => {
  console.log(`port succesfullly listening at http://localhost:${port}`);
});
