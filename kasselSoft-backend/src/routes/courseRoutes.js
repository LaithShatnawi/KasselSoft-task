const express = require("express");
const courseRouter = express.Router();
const {
  getAllCourses,
  getEnrolledCourses,
  addCourse,
  courseEnroll,
  editCourse,
} = require("../controllers/courseController");
const bearer = require("../middleware/auth/bearer");
const acl = require("../middleware/auth/acl");
const validator = require("../middleware/validator");
const { check } = require("express-validator");

courseRouter.get("/all", bearer, getAllCourses);
courseRouter.get("/:studentId", bearer, getEnrolledCourses);
courseRouter.post(
  "/add",
  bearer,
  acl("Teacher"),
  check("name")
    .notEmpty()
    .withMessage("Course name is required")
    .trim()
    .escape(),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .escape(),
  check("pass_mark")
    .notEmpty()
    .withMessage("Pass mark is required")
    .trim()
    .escape(),
  check("start_date").notEmpty().withMessage("start date is required"),
  check("end_date").notEmpty().withMessage("end date is required"),
  validator,
  addCourse
);
courseRouter.post("/enroll/:courseId/:studentId", bearer, courseEnroll);

courseRouter.put(
  "/edit/:courseId",
  bearer,
  acl("Teacher"),
  check("name")
    .notEmpty()
    .withMessage("Course name is required")
    .trim()
    .escape(),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .escape(),
  check("pass_mark")
    .notEmpty()
    .withMessage("Pass mark is required")
    .trim()
    .escape(),
  check("start_date").notEmpty().withMessage("start date is required"),
  check("end_date").notEmpty().withMessage("end date is required"),
  validator,
  editCourse
);

module.exports = courseRouter;
