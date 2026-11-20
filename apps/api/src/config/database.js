const mongoose = require("mongoose");

const DEFAULT_MONGODB_URI = "mongodb://localhost:27017/sigru";

function connectDatabase(uri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI) {
  return mongoose.connect(uri);
}

module.exports = { connectDatabase };
