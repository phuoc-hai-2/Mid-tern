import express from "express";
import cors from "cors";
import Product from "./models/Product.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/products", async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "error server", error: error.message });
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "No product found." });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Invalid product ID" });
  }
});
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
});
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "No product found." });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "No product found." });

    res.json({ message: "delete successfully" });
  } catch (error) {
    res.status(400).json({ message: "error delete", error: error.message });
  }
});

export default app;
