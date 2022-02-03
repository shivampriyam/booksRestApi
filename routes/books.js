const express = require("express");
const Book = require("../models/books");
const router = express.Router();

// POST: CREATE A NEW BOOK
router.post("/", (req, res) => {
  const book = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge,
    },
    genre: req.body.genre,
  });
  book
    .save()
    .then((book) => res.send(book))
    .catch((error) =>
      res.status(500).send("Book is not saved in DB", error.message)
    );
});

// Update a book by id
router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id)
    .then((updatedBook) => res.send(updatedBook))
    .catch((error) => res.status(500).send(error.message));
});

// Delete a book by id
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
  .then(() => res.send("Book has been deleted"))
  .catch((error) => res.status(500).send(error.message));
//   res.send("Book has been deleted");
});

// Get a book by id
router.get("/:bookId", async (req, res) => {
   const book = await Book.findById(req.params.bookId)
    // .then((book) => {
      if (book) res.send(book);
      res.status(404).send("Book not found");
    // })
    // .catch((error) => res.status(500).send(error.message));
    
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
