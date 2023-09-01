const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

//Get products - http://localhost:8000/api/v1/products (Get Method)
exports.getproducts = async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success : true ,
        count:products.length,
        //message : "This route will show all the products in Database"
        products 
    })
}

//Create Product - http://localhost:8000/api/v1/product/new (post method)
exports.newproducts = async(req,res,next)=>{
   const product = await Product.create(req.body);
   res.status(201).json({
    success : true,
    product 
   })
}

//Get Single product - http://localhost:8000/api/v1/product/:id (get method)
exports.getsingleproduct = async(req,res,next)=>{
   const products = await Product.findById(req.params.id);
   if(!products){ 
    return next(new ErrorHandler("Product Not Found test",400))
   }
   res.status(201).json({
    success : true,
    products
   })
}

//Update product data - {{base_url}}/api/v1/product/:id (Put method)
exports.updateproduct = async (req,res,next)=>{
    let products = await Product.findById(req.params.id);

    if(!products){
        return res.status(404).json({
            success:false,
            message :"product not found"
        })
       }

       products = await Product.findByIdAndUpdate(req.params.id, req.body ,{
          new : true,
          runValidators : true
       })
       res.status(200).json({
        success:true,
        products
       })
}
//Delete product - {{base_url}}/api/v1/product/:id (Delete method)
exports.deleteproduct = async(req,res,next)=>{
    const products = await Product.findById(req.params.id);
    if(!products){
     return res.status(404).json({
         success:false,
         message :"product not found"
     })
    }
    await products.deleteOne();
    res.status(200).json({
        success:true,
        message:"product Deleted!"
    })
}