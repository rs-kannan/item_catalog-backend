const express = require ('express');
const { registerUser, loginUser, logoutUser, forgotpassword, resetpassword } = require('../controllers/authContoller');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotpassword);
router.route('/password/reset/:token').post(resetpassword); 




module.exports =  router;