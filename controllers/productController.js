const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares.js/catchAsyncError');
const APIFeatures = require ('../utils/apiFeatures');

//Get products - http://localhost:8000/api/v1/products (Get Method)
exports.getproducts = async(req,res,next)=>{
    const resPerPage = 2;
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success : true ,
        count:products.length,
        //message : "This route will show all the products in Database"
        products 
    })
}

//Create Product - http://localhost:8000/api/v1/product/new (post method)
exports.newproducts = catchAsyncError(async(req,res,next)=>{

   req.body.user =req.user.id;
   const product = await Product.create(req.body);
   res.status(201).json({
    success : true,
    product 
   })
});

//Get Single product - http://localhost:8000/api/v1/product/:id (get method)
exports.getsingleproduct = catchAsyncError( async(req,res,next)=>{
   const products = await Product.findById(req.params.id);
   if(!products){ 
    return next(new Error("Product Not Found !",400))
   }
   res.status(201).json({
    success : true,
    products
   })
})

//Update product data - {{base_url}}/api/v1/product/:id (Put method)
exports.updateproduct = async (req,res,next)=>{
    let products = await Product.findById(req.params.id);

    if(!products){
        return res.status(404).json({
            success:false,
            message :"product not found"
        })
       }

       products = await Product.findByIdAndUpdate(req.params.id, req.body,{
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