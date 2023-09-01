const express = require ('express');
const { getproducts,newproducts, getsingleproduct, updateproduct } = require('../controllers/productController');//import get-post function 
const router = express.Router();

//API URL End-Point //productController.js
router.route('/products').get(getproducts); //Get All product Data 
router.route('/product/new').post(newproducts); //Post Product Data
router.route('/product/:id') //chain-function - one url but handle two Put & Get
                            .get(getsingleproduct) //Get Single product Data using Id          
                            .put(updateproduct); //product update by Id

module.exports = router 