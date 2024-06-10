var authRouter = require("./authRoutes");
var courseRouter = require("./courseRoutes");

module.exports = function (app) {
  app.use("/auth", authRouter);
  app.use("/courses", courseRouter);
  app.get("/", (req, res) => {
    res.send("Welcome to KasselSoft API");
  });
};
