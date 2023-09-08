const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotpassword,
  resetpassword,
  getUserprofile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/authContoller");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares.js/authenticate");
const { authorizeRoles} = require('../middlewares.js/authenticate');


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").post(resetpassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserprofile);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/update").put(isAuthenticatedUser, updateProfile);

//admin routes
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser); 
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser); 
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser); 





module.exports = router;
