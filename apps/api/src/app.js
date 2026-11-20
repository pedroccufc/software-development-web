const express = require("express");
const cors = require("cors");

// Register models before controllers access them through mongoose.model().
require("./modules/breakfast/breakfast.model");
require("./modules/lunch/lunch.model");
require("./modules/dinner/dinner.model");

const app = express();
app.use(express.json());
app.use(cors());

// Reject query operators in write bodies before reaching Mongoose.
const validateMealPayload = require("./middleware/validate-meal-payload");
app.use(["/breakfast", "/lunch", "/dinner"], (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    return validateMealPayload(req, res, next);
  }
  next();
});
app.use(require("./routes"));

module.exports = app;
