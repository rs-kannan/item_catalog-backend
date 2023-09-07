const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "please enter product Name"],
        trim : true,
        maxLenght : [100,"Poduct name cannot exceed 100 characters"]
    },
    price:{
        type : Number, 
        //required : true ,
        default : 0.0
    },
    description :{
        type : String,
        required :[true, " please enter prodect description "]
    },
    ratings : {
        type : String,
        default : 0
    },
    images : [
        {
            image : {
                type : String,
                required : true
            }
        }
    ],
    category :{
        type : String,
        required : [true, "please enter product catagory"],
        enum : {
            values : [
                'Electornics',
                'Mobile phone',
                'Laptops',
                'Accessories',
                'Headphone',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message : "Please select correct Catagory"
        }
    },
    seller : {
        type : String,
        required : [true , "please enter product seller"],

    },
    stock :{
        type : Number,
        required : [true , "please enter product stock"],
        maxLenght: [20,'product stock cannot exceed 20']
    },
    numberofReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            name : {
                type : String,
                required : true
            },
            rating: {
                type : String,
                required : true
            },
            Comment :{
                type : String,
                required : true
            }
        }
    ],user:{
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }
})

let Schema = mongoose.model('product',productSchema)

module.exports = Schema