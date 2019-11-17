const express = require("express");
const { time } = require("../contollers/blog");
const router = express.Router();

router.get("/", time);

module.exports = router;
