const Product = require('../models/productModel');

exports.getproducts = (req,res,next)=>{
    res.status(200).json({
        success : true ,
        message : "This route will show all the products in Database"
    })
}

//Create Product - {{base_url}}/api/v1/product/new
exports.newproduct = async(req,res,next)=>{
   const product = await Product.create(req.body);
   res.status(201).json({
    success : true,
    product
   })
}