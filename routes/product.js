const express = require ('express');
const { getproducts,newproducts } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getproducts);
router.route('/product/new').post(newproducts);

module.exports = router 