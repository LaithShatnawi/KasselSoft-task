const Courses = require("../database/models/course");
const Students = require("../database/models/student");
const Teachers = require("../database/models/teacher");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find().populate("teacher_id");

    res.status(200).json(courses);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Students.findById(studentId).populate("courses");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student.courses);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const addCourse = async (req, res) => {
  try {
    const teacher_id = await Teachers.findOne({
      user_id: req.body.teacher_id,
    });
    const newBody = { ...req.body, teacher_id: teacher_id };
    const course = await Courses.findOne({ name: req.body.name });
    if (course) {
      res.status(500).send("Course is Already Created");
    } else {
      const newCourse = new Courses(newBody);
      await newCourse.save();
      res.status(201).send("course added successfully");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const courseEnroll = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const student = await Students.findById(studentId);
    const course = await Courses.findById(courseId);

    // check if student exists
    if (!student) {
      return res.status(404).send("Student not found");
    } else {
      // check if student already enrolled in the course
      if (student.courses.includes(courseId)) {
        res.status(400).send("Student already enrolled in the course");
      } else {
        // add course to student
        student.courses.push(course);
        await student.save();

        // check if course exists
        if (!course) {
          return res.status(404).send("Course not found");
        } else {
          // add student to course
          course.students.push(student);
          await course.save();

          res.status(201).send("Course enrolled successfully");
        }
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};

const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Courses.findOne({ _id: courseId });

    if (!course) {
      res.status(404).send("Course not found");
    }

    await course.updateOne(req.body);
    res.status(200).send("course updated successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllCourses,
  getEnrolledCourses,
  addCourse,
  courseEnroll,
  editCourse,
};
