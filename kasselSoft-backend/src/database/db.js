require("dotenv").config();
const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB;
const db = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = db;
