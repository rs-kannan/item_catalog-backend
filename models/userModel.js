const mongoose = require("mongoose");
const validator = require("validator"); //install validator for Email
const bcrypt = require("bcrypt"); //install bcrypt for password
const jwt = require("jsonwebtoken"); //install Json Webtoken
const crypto = require("crypto"); //sending message to encrypt method

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    Validate: [validator.isEmail, "please enter valid email address"],
  },
  password: {
    type: String,
    require: [true, "please enter password"],
    maxlength: [6, "password cannot exceed 6 characters"],
    select: false,
  },
  avatar: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  resetpasswordToken: {
    type: String,
  },
  resetpasswordTokenExpire: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

///Password Hashing using bcrypt method
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.isValidpassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

userSchema.methods.getResetToken = function () {
  //Generate Token
  const token = crypto.randomBytes(20).toString("hex");
  //Generate hash and set to resetpasswordToken
  this.resetpasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  //set token expire time
  this.resetpasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

let model = mongoose.model("User", userSchema);

module.exports = model;
