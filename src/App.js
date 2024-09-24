import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/loginAndSignUp/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/loginAndSignUp/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
