import HomeAdmin from "./pages/admin/HomeAdmin";
import Home from "./pages/user/Home";
import { HashRouter, Route, Routes, Link } from "react-router-dom";


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<HomeAdmin />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
