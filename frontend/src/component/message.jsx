import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import userconversation from "../zustand/messagecontroler";
import { useSocketContext } from "../store/socketstore";
import notify from "../assets/notification.mp3";
import { Chatstate } from "../store/chatstore";

const Message = ({ users }) => {
  const [loading, setloading] = useState(false);
  const { setNewmessageuser, setvisual, setchatvisual, setselectedchat } =
    Chatstate();
  const chat = useRef();
  const lastmessage = useRef();
  const { selectedConversation, setmessage, messages } = userconversation();
  const { socket } = useSocketContext();

  // soket.io
  useEffect(() => {
    socket.on("newMessage", (newmessage) => {
      const sound = new Audio(notify);
      sound.play();
      if (users._id === newmessage.senderid) {
        setmessage([...messages, newmessage]);
      }
      setNewmessageuser(newmessage);
    });
    return () => socket.off("newMessage");
  }, [socket, setmessage, messages]);

  useEffect(() => {
    setTimeout(() => {
      lastmessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  const handlesend = async () => {
    try {
      const msg = chat.current.value;
      chat.current.value = "";

      const token = localStorage.getItem("token");
      fetch(`http://localhost:3000/message/send/${users._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: msg,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const newmessage = [...messages, res];

          setmessage(newmessage);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getmessage = async () => {
    try {
      setloading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(
        `http://localhost:3000/message/${users._id}`,
        config
      );
      setmessage(data);
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getmessage();
  }, [users, selectedConversation?._id, setmessage]);

  const handleback = () => {
    setchatvisual("hidden");
    setvisual("");
    setselectedchat({});
  };
  return (
    <div className="chatcontainer ">
      <div className="chatheader" style={{ height: "12%" }}>
        <button className="backbtn" onClick={handleback}>
          <IoMdArrowBack />
        </button>
        <img
          className="pic"
          src={
            users.pic ||
            "https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png"
          }
          alt="pic"
        />
        <h4 style={{ marginLeft: "10px" }}>{users.name}</h4>
      </div>

      <div className="flex-1 overflow-auto" style={{ height: "80%" }}>
        {loading && (
          <div
            className="flex w-full h-full flex-col items-center justify-center 
                gap-4 bg-transparent"
          >
            <div className="loading loading-spinner"></div>
          </div>
        )}
        {!loading && messages?.length === 0 && (
          <p className="text-center text-white items-center">
            Send a message to start Conversation
          </p>
        )}
        {!loading &&
          messages?.length > 0 &&
          messages?.map((message) => (
            <div className="text-white" key={message._id} ref={lastmessage}>
              <div
                className={`chat ${
                  message.senderid !== users._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar"></div>
                <div
                  className={`chat-bubble ${
                    message.senderid !== users._id ? "bg-sky-600" : ""
                  }`}
                >
                  {message?.message}
                </div>
                <div className="chat-footer text-[10px] opacity-80">
                  {new Date(message?.createdAt).toLocaleDateString("en-IN")}
                  {new Date(message?.createdAt).toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="chatinput">
        <center>
          <div
            className=""
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "2px 5px",
            }}
          >
            <input
              className="chattinput"
              ref={chat}
              type="text"
              placeholder="chat"
            ></input>
            <button onClick={handlesend}>➤</button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Message;
