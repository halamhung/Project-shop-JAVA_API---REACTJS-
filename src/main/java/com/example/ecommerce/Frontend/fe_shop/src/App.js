import HomeAdmin from "./pages/admin/HomeAdmin";
import Home from "./pages/user/Home";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Product from "./pages/user/Product";


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<HomeAdmin />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
