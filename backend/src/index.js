const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");

let server;
const port = config.port || 8082;
mongoose.connect(config.mongoose.url).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
});
