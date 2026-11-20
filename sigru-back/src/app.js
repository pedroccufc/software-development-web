const express = require("express");
const cors = require("cors");
const requireDir = require("require-dir");

// Register Mongoose models before importing controllers and routes.
requireDir("./models");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", require("./routes"));

module.exports = app;
