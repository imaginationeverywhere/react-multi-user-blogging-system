const express = require("express");
const router = express.Router();

// auth controllers
const {
  signup,
  signin,
  singout,
  requireSignin
} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");

// auth validators
const {
  userSiignupValidator,
  userSiigninValidator
} = require("../validators/auth");

router.post("/signup", userSiignupValidator, runValidation, signup);
router.post("/signin", userSiigninValidator, runValidation, signin);
router.get("/signout", singout);
// router.get("/secret", requireSignin, (req, res) => {
//   res.json({
//     user: req.user
//   });
// });

module.exports = router;
