import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import connectDb from "./config/db.js";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

connectDb();

// Security headers
app.use(helmet());

// CORS — restrict to your frontend origin in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Body size limits to prevent payload attacks
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// General rate limiter — 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many requests, please try again later." },
});

// Strict limiter for auth endpoints — 10 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many login attempts, please try again later." },
});

// AI limiter — 20 AI calls per hour (API costs money)
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "AI request limit reached. Please try again in an hour." },
});

app.use(generalLimiter);

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai", aiLimiter, aiRoutes);
app.use("/api/export", exportRoutes);

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.json({ msg: "EBook API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    msg: status === 500 ? "Internal server error" : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
