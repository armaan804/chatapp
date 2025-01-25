import React, { useState } from "react";
import { Chatstate } from "../store/chatstore";
import Message from "./message";
import userconversation from "../zustand/messagecontroler";
// import Messagesend from "./messagesend";

const Chatbox = () => {
  const { selectedChat, setSelectedChat, chatvisual } = Chatstate();
  const { selectedConversation, setselectedConversation } = userconversation();
  // const [chatvisual, setvisual] = useState("hidden");
  // console.log(selectedChat ? 1 : 0);

  return (
    <>
      <div
        style={{ width: "60%" }}
        // className={`sm:flex sm:align-center sm:justify-center ${chatvisual}`}
        // style={{ borderLeft: "4px solid white", height: "85vh" }}
      >
        {selectedConversation !== null ? (
          <>
            <Message users={selectedConversation}></Message>
            {/* <Messagesend></Messagesend> */}
          </>
        ) : (
          <div
            className="chatcontainer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // display: "none",
            }}
          >
            <p style={{ fontSize: "2rem", color: "white" }}>Welcome!!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbox;
