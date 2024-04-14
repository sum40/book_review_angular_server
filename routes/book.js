const express = require("express");
const Book = require("../models/book.model");
const router = express.Router();
const verify = require("../authentication/verification");
// var jwt = require("jsonwebtoken");
router.get("/getBookList", async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) ?? 5;
    const pageNumber = Number(req.query.pageNumber) ?? 1;

    let results = await Book.find()
      .select({ __v: 0, likes: 0 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.post("/addBooks", verify, async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      catagory: req.body.catagory,
      author: req.body.author,
      imageLink: req.body.imageLink,
      language: req.body.language,
      year: req.body.year,
      userDisplayName: req.body.userDisplayName,
      review: req.body.review,
    });
    await newBook.save();
    return res.status(200).json({
      success: true,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
});

router.delete("/delete/:_id", verify, async (req, res) => {
  try {
    const filter = {
      _id: req.params._id,
    };

    const deletedBook = await Book.findOneAndDelete(filter);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Book with ID ${req.params._id} deleted successfully`,
      deletedBook: deletedBook, // Optionally send the deleted book data in the response
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.put("/update/:id", async (req, res) => {
  const newComment = req.body.Comment;
  const username = req.body.userName;

  const filter = {
    _id: req.params.id,
  };

  const update = {
    $push: {
      comments: {
        comment: newComment,
        userDisplayName: username,
      },
    },
  };

  try {
    const response = await Book.updateOne(filter, update);

    if (response) {
      return res.status(200).json({
        success: true,
        error: null,
      });
    } else {
      return res.status(500).json({
        success: false,

        error: err.message || "Something went wrong",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
});

module.exports = router;
