import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "ID sản phẩm không hợp lệ" });
  }
};
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Dữ liệu không hợp lệ", error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Cập nhật thất bại", error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa", error: error.message });
  }
};
