const Users = require("../../database/models/user");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return _authError();
    }
    const token = req.headers.authorization.split(" ").pop();
    const validUser = await Users.authenticateToken(token);
    req.user = validUser;
    req.token = token;
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    next("Invalid login credentials");
  }
};
