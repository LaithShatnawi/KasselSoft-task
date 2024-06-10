require("dotenv").config();
const { start } = require("./src/server.js");
const db = require("./src/database/db.js");
const PORT = process.env.PORT || 3000;

db()
  .then(() => start(PORT))
  .catch((err) => console.log(err));
