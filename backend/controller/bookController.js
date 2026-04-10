import Book from "../models/Book";

// @desc Create a new book
// @route POst /api/books
//@ access Private
const createBook = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc Get all boook for a user
// @route Get /api/books
//@ access Private
const getBooks = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc Create single book by id
// @route POst /api/books/:id
//@ access Private

const getBookById = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc Update a book
// @route Put /api/books/:id
//@ access Private

const updateBook = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc Delete a book
// @route Delete /api/books/:id
//@ access Private

const deleteBook = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

// @desc update a books cover image
// @route PUT /api/books/cover/:id
//@ access Private

const updateBookCover = async (req, res) => {
  try {
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
