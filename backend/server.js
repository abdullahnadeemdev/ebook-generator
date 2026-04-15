import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import path from "path";
import connectDb from "./config/db.js";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
//models

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//App config
const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);

//static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
