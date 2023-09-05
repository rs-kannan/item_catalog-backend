const express = require ('express');
const { registerUser } = require('../controllers/authContoller');
const router = express.Router();

router.route('/register').post(registerUser);

module.exports =  router;