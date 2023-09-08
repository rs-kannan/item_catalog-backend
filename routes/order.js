const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
const  {isAuthenticatedUser, authorizeRoles} = require('../middlewares.js/authenticate')


router.route('/order/new').post( isAuthenticatedUser, newOrder);
router.route('/order/:id').get( isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get( isAuthenticatedUser, myOrders);

//admin Routes
router.route('/orders').get( isAuthenticatedUser, authorizeRoles('admin'), orders);
router.route('/orders/:id').put( isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router.route('/orders/:id').delete( isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);




module.exports = router;
