const User = require("../models/user");

/**
 * @function read
 * @param {*} req
 * @param {*} res
 */
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

module.exports = {
  read
};
