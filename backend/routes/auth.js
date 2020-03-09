const express = require("express");
const router = express.Router();

// auth controllers
const {
  signup,
  signin,
  singout,
  requireSignin,
  forgotPassword,
  resetPassword,
  preSignup
} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");

// auth validators
const {
  userSiignupValidator,
  userSiigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require("../validators/auth");

router.post("/pre-signup", userSiignupValidator, runValidation, preSignup);
router.post("/signup", signup);
router.post("/signin", userSiigninValidator, runValidation, signin);
router.get("/signout", singout);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

module.exports = router;
