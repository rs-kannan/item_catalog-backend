// Seeder file used for upload All product single time 
const product  = require('../data/product.json'); ///import product.json file
const products = require('../models/productModel'); ///import file productmodel
const dotenv = require('dotenv');///import env file
const connectDatabase = require('../config/database'); ///import mongoDB database file

dotenv.config({path:'config/config.env'});/// env file path
connectDatabase();/// call Database function


const seedproduct = async()=>{
    try{
    await products.deleteMany();
    console.log("product deleted..!")
    await products.insertMany(product);
    console.log("All product Added..!!!")
}catch(error){
    console.log(error.message);
}
}

seedproduct();