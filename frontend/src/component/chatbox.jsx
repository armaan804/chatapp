import React, { useState } from "react";
import Message from "./message";
import userconversation from "../zustand/messagecontroler";

const Chatbox = () => {
  const { selectedConversation } = userconversation();

  return (
    <>
      <div style={{ width: "60%" }}>
        {selectedConversation !== null ? (
          <>
            <Message users={selectedConversation}></Message>
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
