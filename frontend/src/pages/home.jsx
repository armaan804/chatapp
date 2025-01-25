import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../store/authstore";
// import Navbar from "../component/sidebar";
import Sidebar from "../component/sidebar";
import { userscontext } from "../store/usersstore";
import Chatbox from "../component/chatbox";
// import Messagesend from "../component/messagesend";
import Navbar from "../component/navbar";

function Home() {
  // setcurrentuser();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("home");
    // navigate("/login");
  }

  return (
    <>
      <Navbar></Navbar>
      <center>
        <div className="homecontainer">
          <Sidebar></Sidebar>
          <Chatbox></Chatbox>
        </div>
      </center>
    </>
  );
}

export default Home;
