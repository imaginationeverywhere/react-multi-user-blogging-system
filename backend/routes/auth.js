const express = require("express");
const router = express.Router();
const { signup, signin } = require("../contollers/auth");

// validators
const { runValidation } = require("../validators");
const { userSiignupValidator, userSiigninValidator } = require("../validators/auth");

router.post("/signup", userSiignupValidator, runValidation, signup);
router.post("/signin", userSiigninValidator, runValidation, signin);

module.exports = router;
