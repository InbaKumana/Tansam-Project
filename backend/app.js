require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userroutes = require("./routes/userroutes");

const app = express();

/*
  Middleware
*/
app.use(cors());

app.use(express.json());

/*
  Routes
*/
app.use("/api/auth", userroutes);

/*
  Test Route
*/
app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

module.exports = app;