import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";

const EditProduct = () => {
  const { id } = useParams();
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
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setForm(response.data);
      } catch (err) {
        alert("No product found to repair!");
        navigate("/");
      }
    };
    fetchProduct();
  }, [id, navigate]);

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
      await api.put(`/products/${id}`, payload);
      alert("Update product successfully");
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
      <h3 className="mb-4 text-center text-warning">Cập Nhật Sản Phẩm</h3>

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
                Chọn danh mục
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
            <label className="form-label">Link ảnh</label>
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
            <label className="form-label">Tồn kho</label>
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
            className="btn btn-warning w-50"
            disabled={loading}
          >
            {loading ? "Loading update" : "Update"}
          </button>
          <Link to="/" className="btn btn-secondary w-50">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
