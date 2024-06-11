const Users = require("../database/models/user");
const Roles = require("../database/models/role");
const Students = require("../database/models/student");
const Teachers = require("../database/models/teacher");

const register = async (req, res) => {
  try {
    const { username, password, email, full_name } = req.body;

    // attach student role to user
    const role = await Roles.findOne({ name: "Student" });
    const newUser = new Users({ username, password, email, role_id: role._id });

    // Check if user already exists
    const existingUser = await Users.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      res
        .status(400)
        .send("It seems you already have an account, please log in instead.");
    } else {
      const savedUser = await newUser.save();

      // add as a student
      Students.create({ full_name, user_id: savedUser._id });
      res
        .status(200)
        .send(
          "Thank you for registering with us. Your account has been successfully created."
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const registerTeacher = async (req, res) => {
  try {
    const { username, password, email, full_name, department } = req.body;

    // attach teacher role to user
    const role = await Roles.findOne({ name: "Teacher" });
    const newUser = new Users({
      username,
      password,
      email,
      role_id: role._id,
    });

    // Check if user already exists
    const existingUser = await Users.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      res
        .status(400)
        .send("It seems you already have an account, please log in instead.");
    } else {
      const savedUser = await newUser.save();

      // add as a teacher
      Teachers.create({ full_name, department, user_id: savedUser._id });
      res
        .status(200)
        .send(
          "Thank you for registering with us. Your account has been successfully created."
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const token = await req.user.generateAuthToken();

    //save token in a session
    let options = {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("sessionId", token, options);
    res.status(200).json(token);
  } catch (e) {
    console.log(e.message);
  }
};

const logout = async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { refreshToken: req.token },
      { refreshToken: null }
    );

    if (!user) {
      return res.status(400).send("Invalid token");
    }

    res.status(200).send("Successfully logged out");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const addRoles = (req, res) => {
  try {
    const roles = [
      { name: "Administrator" },
      { name: "Teacher" },
      { name: "Student" },
    ];

    roles.map((role) => {
      const newRole = new Roles(role);
      newRole.save();
    });

    res.status(201).json("Roles added successfully");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { register, login, logout, addRoles, registerTeacher };
