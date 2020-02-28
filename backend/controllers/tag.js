const Tag = require("../models/tag");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

/**
 * @function create
 * @param {*} req
 * @param {*} res
 */
const create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });

  tag.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data); // dont do this res.json({ tag: data });
  });
};

/**
 * @function list
 * @param {*} req
 * @param {*} res
 */
const list = (req, res) => {
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

/**
 * @function read
 * @param {*} req
 * @param {*} res
 */
const read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: "Tag not found"
      });
    }
    res.json(tag);
  });
};

/**
 * @function remove
 * @param {*} req
 * @param {*} res
 */
const remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Tag deleted successfully"
    });
  });
};

module.exports = {
  create,
  list,
  read,
  remove
};
