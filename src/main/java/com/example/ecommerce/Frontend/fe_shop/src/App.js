import HomeAdmin from "./pages/admin/HomeAdmin";
import Home from "./pages/user/Pages/Home/Home";
import LoginRegister from "./pages/loginRegister/LoginRegister";
import ListUser from "./pages/admin/ListUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductManager from "./pages/admin/ProductManager";
import Order from "./pages/admin/Order";
import Product from './pages/user/Pages/Product/Product';
import Category from "./pages/admin/category/Category";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/listUser" element={<ListUser />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/product" element={<ProductManager />} />
          <Route path="/admin/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
