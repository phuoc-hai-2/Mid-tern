import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Tạm thời tạo 1 route test
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
