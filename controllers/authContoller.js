const catchAsyncError = require('../middlewares.js/catchAsyncError');
const User = require ('../models/userModel');
const Errorhandler = require('../utils/errorHandler');

exports.registerUser = catchAsyncError(async(req, res, next)=>{
  const {name,email,password,avatar} = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar
  });
  console.log(user)
  const token =user.getJwtToken();

  res.status(200).json({
    success:true,
    user,
    token
})
})

exports.loginUser = catchAsyncError(async (req,res,next)=>{
 const {email,password} =  req.body

 if(!email || !password){
  return next(new Errorhandler('please enter email & password', 400))
 }
 //finding the user database
 User.findOne({email}).select('+password');
})