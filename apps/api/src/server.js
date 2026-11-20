const app = require("./app");
const { connectDatabase } = require("./config/database");

const port = Number(process.env.PORT) || 3001;

connectDatabase()
  .then(() => {
    app.listen(port, () => console.log("SIGRU API listening on port " + port));
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exitCode = 1;
  });
