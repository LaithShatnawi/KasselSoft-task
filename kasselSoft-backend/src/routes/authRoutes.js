const express = require("express");
const authRouter = express.Router();
const {
  login,
  logout,
  register,
  addRoles,
  registerTeacher,
} = require("../controllers/authController");
const basic = require("../middleware/auth/basic");
const bearer = require("../middleware/auth/bearer");
const acl = require("../middleware/auth/acl");
const validator = require("../middleware/validator");
const { check } = require("express-validator");

authRouter.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("full_name")
    .not()
    .isEmpty()
    .withMessage("Your full name is required")
    .trim()
    .escape(),
  check("username")
    .not()
    .isEmpty()
    .withMessage("Your username is required")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 chars long, must contain at least 1 number, must contain at least 1 uppercase char, 1 a lowercase char and 1 special char"
    ),
  validator,
  register
);
authRouter.post(
  "/teacher/register",
  acl("Administrator"),
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("full_name")
    .notEmpty()
    .withMessage("Full name is required")
    .trim()
    .escape(),
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),
  check("department")
    .notEmpty()
    .withMessage("Department is required")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 chars long, must contain at least 1 number, must contain at least 1 uppercase char, 1 a lowercase char and 1 special char"
    ),
  validator,
  registerTeacher
);
authRouter.post("/login", basic, login);
authRouter.post("/logout", bearer, logout);
authRouter.post("/roles", acl("Administrator"), addRoles);

module.exports = authRouter;
