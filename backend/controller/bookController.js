import bookModel from "../models/Book.js";
import Book from "../models/Book.js";

// @desc Create a new book
// @route POst /api/books
//@ access Private
const createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters } = req.body;

    if (!title || !author) {
      return res
        .status(400)
        .json({ msg: "Please provide title and author name" });
    }

    const book = await Book.create({
      userId: req.user._id,
      title,
      author,
      subtitle,
      chapters,
    });

    res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc Get all boook for a user
// @route Get /api/books
//@ access Private
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc Create single book by id
// @route POst /api/books/:id
//@ access Private

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error", err: error.message });
  }
};

// @desc Update a book
// @route Put /api/books/:id
//@ access Private

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ msg: "Book not found" });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" },
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc Delete a book
// @route Delete /api/books/:id
//@ access Private

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await book.deleteOne();

    res.status(200).json({ msg: "book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc update a books cover image
// @route PUT /api/books/cover/:id
//@ access Private

const updateBookCover = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (req.file) {
      book.coverImage = `/${req.file.path}`;
    } else {
      return res.status(400).json({ msg: "No image file provided" });
    }

    const updatedbook = await book.save();

    res.status(200).json(updatedbook);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export {
  updateBookCover,
  deleteBook,
  updateBook,
  getBookById,
  getBooks,
  createBook,
};
