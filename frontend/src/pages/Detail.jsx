import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("No matching products found");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="card shadow-sm mx-auto mt-4" style={{ maxWidth: "800px" }}>
      <div className="row g-0">
        <div className="col-md-5">
          <img
            src={product.image}
            className="img-fluid rounded-start h-100"
            alt={product.name}
            style={{ objectFit: "cover" }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />
        </div>
        <div className="col-md-7">
          <div className="card-body mt-4">
            <h2 className="card-title text-primary">{product.name}</h2>
            <hr />
            <h5 className="text-muted mb-3">Danh mục: {product.category}</h5>
            <h4 className="text-success mb-3">Giá: ${product.price}</h4>
            <p className="fs-5">
              Tồn kho: <strong>{product.stock}</strong> sản phẩm
            </p>

            <div className="mt-4">
              <Link to="/" className="btn btn-secondary me-2">
                Quay lại
              </Link>
              <Link to={`/edit/${product._id}`} className="btn btn-warning">
                Sửa sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
