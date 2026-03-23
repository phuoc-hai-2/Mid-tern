import { Link } from "react-router-dom";

const Navbar = () => {
  return (
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
            + Thêm sản phẩm
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
