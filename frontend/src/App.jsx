import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./component/signup";
import Authcontextprovider, { authcontext } from "./store/authstore";
import Home from "./pages/home";
// import Verifyuser from "./utils/verifyuser";
import Sidebar from "./component/sidebar";
import Userscontextprovider from "./store/usersstore";
import Chatprovider from "./store/chatstore";
// import  SocketContextProvider  from "./store/socketstore";

function App() {
  // const { auth } = useContext(authcontext);

  return (
    <>
      <Chatprovider>
        <Routes>
          {/* <Route element={<Verifyuser />}> */}
          {/* <Route path="/" element={<Home></Home>}></Route> */}
          {/* </Route> */}
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
        </Routes>
        {/* <Sidebar></Sidebar> */}
      </Chatprovider>
    </>
  );
}

export default App;
