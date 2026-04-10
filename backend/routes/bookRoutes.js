import express from "express";
import {
  updateBookCover,
  deleteBook,
  updateBook,
  getBookById,
  getBooks,
  createBook,
} from "../controller/bookController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// applies middleware protect to all the routes in this file
router.use(protect);

router.post("/", createBook);
router.get("/", getBooks);

router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/cover/:id").put(upload, updateBookCover);

export default router;
