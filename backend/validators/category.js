const { check } = require("express-validator");

exports.categroyCreateValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
];
