const express = require("express");
const cors = require("cors");

// Register models before controllers access them through mongoose.model().
require("./modules/breakfast/breakfast.model");
require("./modules/lunch/lunch.model");
require("./modules/dinner/dinner.model");

const app = express();
app.use(express.json());
app.use(cors());
app.use(require("./routes"));

module.exports = app;
