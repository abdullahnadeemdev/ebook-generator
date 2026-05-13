import Book from "../models/Book.js";

const createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters } = req.body;

    if (!title || !author) {
      return res.status(400).json({ msg: "Please provide title and author name" });
    }

    const book = await Book.create({
      userId: req.user._id,
      title,
      author,
      subtitle,
      chapters,
    });

    res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // Whitelist allowed fields to prevent mass-assignment
    const { title, author, subtitle, chapters, status } = req.body;
    const allowedUpdates = {};
    if (title !== undefined) allowedUpdates.title = title;
    if (author !== undefined) allowedUpdates.author = author;
    if (subtitle !== undefined) allowedUpdates.subtitle = subtitle;
    if (chapters !== undefined) allowedUpdates.chapters = chapters;
    if (status !== undefined) allowedUpdates.status = status;

    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      allowedUpdates,
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await book.deleteOne();

    res.status(200).json({ msg: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const updateBookCover = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No image file provided" });
    }

    book.coverImage = `/${req.file.path.replace(/\\/g, "/")}`;
    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export { updateBookCover, deleteBook, updateBook, getBookById, getBooks, createBook };
