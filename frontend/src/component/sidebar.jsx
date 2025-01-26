import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Chatstate } from "../store/chatstore";
import styles from "./sidebar.module.css";
import Chat from "./chat";

const Sidebar = () => {
  const searchelement = useRef();
  const {
    setSelectedChat,
    user,
    chats,
    setChats,
    setsearchchat,
    searchchat,
    loggeduser,
    visual,
  } = Chatstate();

  const handlesearch = async () => {
    const search = searchelement.current.value;
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(
        `https://jarvis-chat.onrender.com/user/find?search=${search}`,
        config
      );
      setsearchchat(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchchats = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(
        `https://jarvis-chat.onrender.com/user/currentuser`,
        config
      );
      setChats(data);
      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // setloggeduser();
    fetchchats();
  }, [loggeduser]);
  const handleclick = (e) => {
    e.preventDefault();
    handlesearch();
  };
  const handleback = () => {
    setsearchchat([]);
  };
  return (
    <div
      style={{
        width: "40%",
        maxWidth: "340px",
        height: "85vh",
        // minWidth: "310px",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <div className=" d-flex flex-column align-items-stretch flex-shrink-0 background">
        <span
          className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none "
          style={{
            borderBottom: "2px solid white",
            justifyContent: "space-between",
          }}
        >
          <div
            className="flex searchuser w-1/2 justify-around"
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "0 5px",
            }}
          >
            <button className="mr-2" onClick={handleback}>
              <IoIosArrowBack />
            </button>
            <input
              type="text"
              ref={searchelement}
              placeholder="search"
              className={styles.input}
              style={{
                backgroundColor: "white",
                width: "60%",
                border: "none",
                textDecoration: "none",
              }}
            />
            <button onClick={handleclick} className="searchbtn">
              <CiSearch />
            </button>
          </div>
          <img
            className="pic online"
            src={
              loggeduser.pic ||
              "https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png"
            }
            alt="pic"
          />
        </span>
        {searchchat.length === 0
          ? chats.map((users) => <Chat key={users._id} users={users}></Chat>)
          : searchchat.map((users) => (
              <Chat key={users._id} users={users}></Chat>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
