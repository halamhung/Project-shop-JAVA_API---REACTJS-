import HomeAdmin from "./pages/admin/HomeAdmin";
import Home from "./pages/user/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Product from "./pages/user/Product";
import LoginRegister from "./pages/loginRegister/LoginRegister";
import ListUser from "./pages/admin/ListUser";


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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
