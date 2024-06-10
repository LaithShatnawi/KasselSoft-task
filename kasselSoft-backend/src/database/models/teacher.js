const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Teachers = mongoose.model("teachers", TeacherSchema);

module.exports = Teachers;
