const Product = require('../models/productModel');

//Get products - http://localhost:8000/api/v1/products
exports.getproducts = async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success : true ,
        count:products.length,
        //message : "This route will show all the products in Database"
        products 
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

//Get Single product
exports.getsingleproduct = async(req,res,next)=>{
   const products = await Product.findById(req.params.id);
   if(!products){
    return res.status(404).json({
        success:false,
        message :"product not found"
    })
   }
   res.status(201).json({
    success : true,
    products
   })
}
