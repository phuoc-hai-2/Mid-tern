import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    try {
      await api.post("/products", payload);
      alert("Product added successfully.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="card shadow-sm mx-auto mt-4 p-4"
      style={{ maxWidth: "600px" }}
    >
      <h3 className="mb-4 text-center text-success">Thêm Sản Phẩm Mới</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Danh mục *</label>
            <select
              className="form-select"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                -- Chọn danh mục --
              </option>
              <option value="Laptop">Laptop</option>
              <option value="Phone">Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Giá ($) *</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="form-control"
              name="price"
              required
              value={form.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 mb-3">
            <label className="form-label">Link ảnh (URL) *</label>
            <input
              type="url"
              className="form-control"
              name="image"
              required
              value={form.image}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Tồn kho *</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="stock"
              required
              value={form.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button
            type="submit"
            className="btn btn-success w-50"
            disabled={loading}
          >
            {loading ? "loading save" : "Save"}
          </button>
          <Link to="/" className="btn btn-secondary w-50">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
