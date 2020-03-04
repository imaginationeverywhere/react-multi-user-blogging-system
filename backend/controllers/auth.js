const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

/**
 * @function signup
 * @param {*} req
 * @param {*} res
 */
const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is already used"
      });
    }

    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      // res.json({
      //     user: success
      // });
      res.json({
        message: "Signup success! Please signin."
      });
    });
  });
};

/**
 * @function signin
 * @param {req}
 * @param {res}
 */
const signin = (req, res) => {
  const { email, password } = req.body;
  // if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup."
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match."
      });
    }
    // generate a token and send it to the client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      // don't send the entire user only send _id, username, name, email, role
      user: { _id, username, name, email, role }
    });
  });
};

/**
 * @function signout
 * @param {*} req
 * @param {*} res
 * @returns {void}
 */
const singout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout successful!!"
  });
};

/**
 * @function requireSignin
 */
const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET
});

/**
 * @function authMiddleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next();
  });
};

/**
 * @function adminMiddleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: "Admin resource. Access denied"
      });
    }

    req.profile = user;
    next();
  });
};

module.exports = {
  signup,
  signin,
  singout,
  requireSignin,
  authMiddleware,
  adminMiddleware
};
