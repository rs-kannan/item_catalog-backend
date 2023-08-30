const express = require ('express');
const { getproducts } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getproducts);
router.route('/Product/new').post(getproducts);

module.exports = router