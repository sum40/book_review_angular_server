const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userDisplayName: {
    type: String,
    required: true,
  },
});

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  userDisplayName: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: commentSchema,
      default: [],
    },
  ],
});

module.exports = mongoose.model("books", booksSchema);
