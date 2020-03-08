const User = require("../models/user");
const Blog = require("../models/blog");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
// sendgrid
const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @function signup
 * @param {object} req
 * @param {object} res
 * @returns {void}
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
 * @param {object} req
 * @param {object} res
 * @returns {void}
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
 * @param {object} req
 * @param {object} res
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
 * @param {object} req
 * @param {object} res
 * @returns {void}
 * @param {function} next
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
 * @param {object} req
 * @param {object} res
 * @returns {void}
 * @param {function} next
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

/**
 * @function canUpdateDeleteBlog
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
const canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    let authorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();
    if (!authorizedUser) {
      return res.status(400).json({
        error: "You are not authorized"
      });
    }
    next();
  });
};

/**
 * @function forgotPassword
 * @param {object} req
 * @param {object} res
 * @returns {JSON}
 * @summary Sends out an email with a reset password link and saves that link
 * JWT token in the database for 10 minutes until a new password replaces the
 * old passord
 */
const forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist"
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m"
    });

    // email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `${process.env.APP_NAME} Password reset link`,
      html: `
          <p>Please use the following link to reset your password:</p>
          <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p>https://imaginationeverywhere.info</p>
      `
    };
    // populating the db > user > resetPasswordLink
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      } else {
        sgMail.send(emailData).then(sent => {
          return res.json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
          });
        });
      }
    });
  });
};

/**
 *
 * @param {object} req
 * @param {object} res
 */
const resetPassword = (req, res) => {
  //
};

module.exports = {
  signup,
  signin,
  singout,
  requireSignin,
  authMiddleware,
  adminMiddleware,
  canUpdateDeleteBlog,
  forgotPassword,
  resetPassword
};
