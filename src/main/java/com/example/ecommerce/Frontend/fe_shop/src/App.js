import HomeAdmin from "./pages/admin/HomeAdmin";
import Home from "./pages/user/Home";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Product from "./pages/user/Product";
import ProductManager from "./pages/admin/ProductManager";
import Order from "./pages/admin/Order";



function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin-order" element={<Order />} />
          <Route path="/admin/product" element={<ProductManager/>} />

        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
