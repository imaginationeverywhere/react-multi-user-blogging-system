const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable");
const User = require("../models/user");
const Blog = require("../models/blog");
const { errorHandler } = require("../helpers/dbErrorHandler");

/**
 * @function read
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

/**
 * @function publicProfile
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
const publicProfile = (req, res) => {
  let username = req.params.username;
  let user;
  let blogs;

  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    user = userFromDB;
    let userId = user._id;
    Blog.find({ postedBy: userId })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name")
      .limit(10)
      .select(
        "_id title slug excerpt categories tags postedBy createdAt updatedAt"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        user.photo = undefined;
        user.hashed_password = undefined;
        res.json({
          user,
          blogs: data
        });
      });
  });
};

/**
 * @function update
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);

    if (fields.password && fields.password.length < 6) {
      return res.status(400).json({
        error: "Password should be min 6 characters long"
      });
    }

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb"
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "All filds required"
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;
      res.json(user);
    });
  });
};

/**
 * @function photo
 * @param {object} req
 * @param {object} res
 * @returns {File}
 */
const photo = (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    if (user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      return res.send(user.photo.data);
    }
  });
};

module.exports = {
  read,
  publicProfile,
  update,
  photo
};
