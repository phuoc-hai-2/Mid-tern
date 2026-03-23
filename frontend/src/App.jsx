import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Midterm
          </Link>
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">
              Sản phẩm
            </Link>
            <Link className="nav-link" to="/add">
              Thêm mới
            </Link>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
