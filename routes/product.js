const express = require ('express');
const { getproducts,newproducts, getsingleproduct, updateproduct, deleteproduct } = require('../controllers/productController');//import get-post function 
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares.js/authenticate');

//API URL End-Point //productController.js
router.route('/products').get(isAuthenticatedUser, getproducts); //Get All product Data 
router.route('/product/:id') //chain-function - one url but handle two Put & Get
                            .get(getsingleproduct) //Get Single product Data using Id          
                            .put(updateproduct) //product update by Id
                            .delete(deleteproduct); //Delete single product by ID


//admin routes
router.route('admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'), newproducts); //Post Product Data

module.exports = router;