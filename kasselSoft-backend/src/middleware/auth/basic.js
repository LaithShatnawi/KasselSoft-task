const base64 = require("base-64");
const Users = require("../../database/models/user");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  let basic = req.headers.authorization.split(" ").pop();
  let [username, password] = base64.decode(basic).split(":");

  try {
    req.user = await Users.authenticateBasic(username, password);
    next();
  } catch (e) {
    console.log(e.message);
    _authError();
  }

  function _authError() {
    res.status(401).send("Invalid Login");
  }
};
