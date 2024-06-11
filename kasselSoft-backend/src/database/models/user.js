const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [
        true,
        "It seems you already have an account, please log in instead.",
      ],
      required: [true, "Email field is required"],
    },
    username: {
      type: String,
      unique: [true, "Username field must be unique"],
      required: [true, "Username field is required"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password field is required"],
      minLength: [8, "Password must be longer than 8 characters"],
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.generateAuthToken = async function () {
  // Populate role name
  const userWithRole = await this.populate("role_id");
  const roleName = userWithRole.role_id.name;

  const token = jwt.sign(
    {
      _id: this._id,
      role: roleName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

UserSchema.methods.generateRefreshToken = async function () {
  // Populate role name
  const userWithRole = await this.populate("role_id");
  const roleName = userWithRole.role_id.name;

  const refreshToken = jwt.sign(
    {
      _id: this._id,
      role: roleName,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

UserSchema.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username }).select("+password");
  if (!user) {
    throw new Error("Invalid Login");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid Login");
  }

  return user;
};

UserSchema.statics.authenticateToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.findOne({ _id: parsedToken._id });
    if (user) {
      return user;
    }
    throw new Error("User Not Found");
  } catch (e) {
    throw new Error(e.message);
  }
};

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
