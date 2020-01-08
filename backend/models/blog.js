const mongoose = require("mongoose");
const {ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 168,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
    },
    excerpt: {
      type: String,
      required: true,
      max: 1000
    },
    mttile: {
      type: String
    },
    mdesc: {
        type: String
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    categories: [{type: ObjectId, ref: 'Category', require: true}],
    tags: [{type: ObjectId, ref: 'Tag', require: true}],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("Blog", blogSchema);
