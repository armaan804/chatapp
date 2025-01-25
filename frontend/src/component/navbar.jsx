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
        <div className="container-fluid ">
          <img
            src="https://th.bing.com/th/id/OIP.xRWpWm7_LXO3eDcrDs5YJwHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Logo"
            width="80"
            // height="60"
            className="d-inline-block align-text-top"
            style={{
              mixBlendMode: "screen",
            }}
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
