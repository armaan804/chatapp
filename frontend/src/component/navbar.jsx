import React from "react";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleclick = () => {
    console.log("logout");
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  return (
    <div>
      <nav
        className="navbar "
        style={{
          color: "white",
          borderBottom: "2px solid white",
          boxShadow: "5px 20px 50px #000",
        }}
      >
        <div className="container-fluid">
          <img
            src="https://th.bing.com/th?id=OIP.kTU8bDenXyTTtuPk0PZT5wHaCo&w=350&h=124&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Logo"
            width="80"
            // height="40"
            className="d-inline-block align-text-top"
          />
          <span>Jarvis-Chat</span>
          <button onClick={handleclick}>
            <SlLogout />
          </button>
        </div>
      </nav>
    </div>
  );
}
