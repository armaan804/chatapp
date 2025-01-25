import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./component/signup";
import Home from "./pages/home";
import Chatprovider from "./store/chatstore";

function App() {
  return (
    <>
      <Chatprovider>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
        </Routes>
      </Chatprovider>
    </>
  );
}

export default App;
