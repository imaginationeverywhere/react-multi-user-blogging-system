const express = require("express");
const router = express.Router();

// user controllers
const { requireSignin, authMiddleware, adminMiddleware } = require("../controllers/auth");
const { read } = require("../controllers/user");

router.get("/profile", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);

module.exports = router;
