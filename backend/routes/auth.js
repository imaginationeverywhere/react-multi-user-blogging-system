const express = require("express");
const { signup } = require("../contollers/auth");
const router = express.Router();

// validators
const { runValidation } = require("../validators");
const { userSiignupValidator } = require("../validators/auth");

router.post("/signup", userSiignupValidator, runValidation, signup);

module.exports = router;
