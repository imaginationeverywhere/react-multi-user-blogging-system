const express = require("express");
const router = express.Router();
// auth controllers
const { requireSignin, adminMiddleware } = require("../controllers/auth");  
// category controllers
const { create, list, read, remove } = require("../controllers/category");
// validators
const { runValidation } = require("../validators");
// category validators
const {categroyCreateValidator } = require("../validators/category");


router.post("/category", categroyCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
