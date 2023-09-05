const mongoose = require ('mongoose');
const validator = require ('validator');

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

let model = mongoose.model('User',userSchema);

module.exports = model;