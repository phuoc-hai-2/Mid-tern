import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const response = await api.get("/products", { params });
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("error server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Xóa sản phẩm thất bại!");
      }
    }
  };
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">category</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center mt-5 text-muted">
          <h4>Không tìm thấy sản phẩm nào phù hợp!</h4>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 col-lg-3 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted mb-1">
                    Danh mục: <strong>{product.category}</strong>
                  </p>
                  <p className="card-text text-success fw-bold mb-1">
                    Giá: ${product.price}
                  </p>
                  <p className="card-text mb-3">Tồn kho: {product.stock}</p>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="btn btn-info btn-sm w-100 text-white"
                    >
                      Xem
                    </Link>
                    <Link
                      to={`/edit/${product._id}`}
                      className="btn btn-warning btn-sm w-100"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-danger btn-sm w-100"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
