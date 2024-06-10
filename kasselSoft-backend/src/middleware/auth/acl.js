const Roles = require("../../database/models/role");

module.exports = (roleName) => {
  return async (req, res, next) => {
    const specifiedRole = await Roles.findOne({ name: roleName });

    try {
      if (req.user.role_id.equals(specifiedRole._id)) {
        next();
      } else {
        next("Access Denied");
      }
    } catch (e) {
      next("Invalid Login");
    }
  };
};
