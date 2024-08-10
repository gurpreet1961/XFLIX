const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  port: 8082,
  mongoose: {
    url: "mongodb://127.0.0.1:27017/xflix",
  },
};