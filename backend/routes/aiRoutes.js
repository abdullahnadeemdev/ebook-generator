import express from "express";
import {
  generateChapterContent,
  generateOutline,
} from "../controller/aiController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

//applying protect to all routes
router.use(protect);

router.post("/generate-outline", generateOutline);
router.post("/generate-chapter-content", generateChapterContent);

export default router;
