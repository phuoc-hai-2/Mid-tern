import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
