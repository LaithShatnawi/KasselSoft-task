const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pass_mark: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teachers",
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "students",
      },
    ],
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", CourseSchema);

module.exports = Courses;
