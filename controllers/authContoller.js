const catchAsyncError = require("../middlewares.js/catchAsyncError");
const User = require("../models/userModel");
const Errorhandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("please enter email & password", 400));
  }
  //finding the user database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new Errorhandler("Invaild email & password", 401));
  }

  if (!(await user.isValidpassword(password))) {
    return next(new Errorhandler("Invaild email & password", 401));
  }

  sendToken(user, 201, res);
});
