const catchAsyncError = require("../middlewares.js/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const Errorhandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require('crypto');

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

exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Loggedout",
    });
}

exports.forgotpassword = catchAsyncError (async(req,res,next)=>{
  const user = await User.findOne({email: req.body.email})

  if(!user){
    return next(new Errorhandler('User not found with this email', 404))
  }

  const resetToken = user.getResetToken();
  await user.save({validateBeforeSave: false})

  //Create reset url
  const reseturl = `${req.protocol}://${req.get('host')}/api/v1/password/rest${resetToken}`;

  const message = `Your password reset url is as follows \n\n
  ${reseturl}\n\n If you have not requested this email, then ignore it.`

  try{
    sendEmail({
      email: user.email,
      subject: "Ecart password Recovery",
      message
    })
    res.status(200).json({
      success :true,
      message: `Email sent to ${user.email}`
    })
      
  }catch(error){
     user.resetpasswordToken = undefined;
     user.resetpasswordTokenExpire = undefined;
     await user.save({validateBeforeSave: false});
     //return next(new Errorhandler(error.message), 500)
  }
})
exports.resetpassword = catchAsyncError(async(req,res,next)=>{
 const resetpasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

 const user = await User.findOne({ 
  resetpasswordToken,
  resetpasswordTokenExpire:{
    $gt: Date.now()
  }
 })
 if(!user){
  return next (new Errorhandler('password reset token isinvaild or expired'))
 }
 if(req.body.password !== req.body.confirmpassword){
  return next (new Errorhandler('password does not match'))
 }
 
 user.password = req.body.password;
 user.resetpasswordToken = undefined;
 user.resetpasswordTokenExpire = undefined;
 await user.save({validateBeforeSave: false});

 sendToken(user, 201, res)

}) 