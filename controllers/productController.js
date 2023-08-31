const Product = require('../models/productModel');

exports.getproducts = (req,res,next)=>{
    res.status(200).json({
        success : true ,
        message : "This route will show all the products in Database"
    })
}

//Create Product - http://localhost:8000/api/v1/product/new
exports.newproducts = async(req,res,next)=>{
   const product = await Product.create(req.body);
   res.status(201).json({
    success : true,
    product 
   })
}