const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const mongoose = require("mongoose");
const axios = require("axios");

// Require the Book model in order to interact with the database
const Book = require("../models/Book.model");

//get all
router.get("/books", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.json(error);
  }
});

//create book

router.post("/books", fileUploader.single("image"), async (req, res, next) => {
  const {
    title,
    description,
    image,
    publishedDate,
    publisher,
    author,
    languages,
    pages,
  } = req.body;

  try {
    let book;

    if (req.file) {
      book = await Book.create(
        {
          title,
          description,
          image: req.file.path,
          publishedDate,
          publisher,
          author,
          languages,
          pages,
        },
        { new: true }
      );
    } else {
      book = await Book.create(
        {
          title,
          description,
          publishedDate,
          publisher,
          author,
          languages,
          pages,
        },
        { new: true }
      );
    }

    res.json(book);
  } catch (error) {
    res.json(error);
  }
});

//Read (by id)

router.get("/books/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    res.json(book);
  } catch (error) {
    res.json(error);
  }
});

//Update

router.put(
  "/books/edit/:id",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      publishedDate,
      publisher,
      author,
      languages,
      pages,
    } = req.body;

    //check if id is a mongoDB valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json("The provided id is not valid");
    }

    try {
      let updatedBook;

      if (req.file) {
        updatedBook = await Book.findByIdAndUpdate(
          id,
          {
            title,
            description,
            image: req.file.path,
            publishedDate,
            publisher,
            author,
            languages,
            pages,
          },
          { new: true }
        );
      } else {
        updatedBook = await Book.findByIdAndUpdate(
          id,
          {
            title,
            description,
            publishedDate,
            publisher,
            author,
            languages,
            pages,
          },
          { new: true }
        );
      }

      res.json(updatedBook);
    } catch (error) {
      res.json(error);
    }
  }
);

//Delete

router.delete("/books/:id", async (req, res, next) => {
  const { id } = req.params;

  //check if id is a mongoDB valid ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("The provided id is not valid");
  }

  //remove the project
  try {
    await Book.findByIdAndRemove(id);
    res.json({ message: `Book with the id ${id} deleted successfully` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
