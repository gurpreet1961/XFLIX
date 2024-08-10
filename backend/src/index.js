const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");

let server;
const port = config.port || 8082;
const URL = config.mongoose.url || "mongodb://127.0.0.1:27017/xflix";
mongoose.connect(URL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
});
