const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
require("./routes")(app);

module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log(`KasselSoft Server is running on port ${port}`);
    });
  },
};
