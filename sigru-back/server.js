const mongoose = require("mongoose");
const app = require("./src/app");

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/sigru";
const port = Number(process.env.PORT) || 3001;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log("SIGRU API listening on port " + port));
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exitCode = 1;
  });
