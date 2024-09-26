import HomeAdmin from "./pages/admin/HomeAdmin";
import Home from "./pages/user/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Product from "./pages/user/Product";
import LoginRegister from "./pages/loginRegister/LoginRegister";
import ListUser from "./pages/admin/ListUser";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Product from "./pages/user/Pages/Product.js/Product";
import ProductManager from "./pages/admin/ProductManager";
import Order from "./pages/admin/Order";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/listUser" element={<ListUser/>}/>
          <Route path="/login" element={<LoginRegister/>}/>
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin-order" element={<Order />} />
          <Route path="/admin/product" element={<ProductManager/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
