const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  { timestamps: true }
);

const Students = mongoose.model("students", StudentSchema);

module.exports = Students;
