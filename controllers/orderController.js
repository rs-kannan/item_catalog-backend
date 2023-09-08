const catchAsyncError = require("../middlewares.js/catchAsyncError");
const orderModel = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
// Create new orders - api/items/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await orderModel.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(201).json({
    success: true,
    message: "order placed successfully",
    order,
  });
});

//Get Single Order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    succcess: true,
    order,
  });
});
 
//Get Logggin user Orders - api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const Orders = await orderModel.find({user: req.user.id});

    res.status(200).json({
      succcess: true,
      Orders,
    });
  });

  //admin > Get all orders = api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
    const Orders = await orderModel.find();
     let totalAmount = 0;
     Orders.forEach(order =>{
         totalAmount += order.totalPrice
     })
    res.status(200).json({
      succcess: true,
      totalAmount,
      Orders
    });
  });


