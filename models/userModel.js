const mongoose = require ('mongoose');
const validator = require ('validator'); //install validator for Email
const bcrypt = require ('bcrypt'); //install bcrypt for password
const jwt = require ('jsonwebtoken'); //install Json Webtoken 

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "please enter name"]
    },
    email:{
        type : String,
        required:[true, 'Please enter email'],
        unique: true,
        Validate : [validator.isEmail, 'please enter valid email address']
    },
    password:{
        type:String,
        require : [true,'please enter password'],
        maxlength : [6, 'password cannot exceed 6 characters']
    },
    avatar:{
        type : String,
        require : true
    },
    role:{
       type: String,
       default: 'user'
    },
    resetpassword:{
       type : String
    },
    resetpasswordTokenExpire:{
       type : Date
    },
    createAt : {
        type: Date,
        default : Date.now
    }

})

///Password Hashing using bcrypt method 
userSchema.pre('save',async function(next){
    this.password =await bcrypt.hash(this.password, 10) 
})

//
userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
  })
}

let model = mongoose.model('User',userSchema);

module.exports = model;