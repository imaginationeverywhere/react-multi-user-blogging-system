const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  singout,
  requireSignin
} = require("../contollers/auth");

// validators
const { runValidation } = require("../validators");
const {
  userSiignupValidator,
  userSiigninValidator
} = require("../validators/auth");

router.post("/signup", userSiignupValidator, runValidation, signup);
router.post("/signin", userSiigninValidator, runValidation, signin);
router.get("/signout", singout);
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: "you have access to a secret page"
  });
});

module.exports = router;
