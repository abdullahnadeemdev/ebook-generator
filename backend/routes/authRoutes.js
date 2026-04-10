import express from "express";
import {
  updateUserProfile,
  getProfile,
  loginUser,
  registerUser,
} from "../controller/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", protect, getProfile);
router.post("/profile", protect, updateUserProfile);

export default router;
