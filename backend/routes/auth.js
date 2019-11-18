const express = require("express");
const { signup } = require("../contollers/auth");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;
