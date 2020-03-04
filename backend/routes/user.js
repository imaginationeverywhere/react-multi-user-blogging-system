const express = require("express");
const router = express.Router();

// user controllers
const {
  requireSignin,
  authMiddleware,
  adminMiddleware
} = require("../controllers/auth");
const { read, photo, publicProfile, update } = require("../controllers/user");

router.get("/admin", requireSignin, adminMiddleware, read);
router.get("/user/profile", requireSignin, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignin, authMiddleware, update);
router.get("/user/photo/:username", photo);

module.exports = router;
