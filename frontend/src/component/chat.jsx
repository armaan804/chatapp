import React from "react";
import { Chatstate } from "../store/chatstore";
import userconversation from "../zustand/messagecontroler";
import { useState } from "react";

export default function Chat({ users }) {
  const {
    selectedChat,
    setSelectedChat,
    setselectedchat,
    setNewmessageuser,
    setchatvisual,
    setvisual,
  } = Chatstate();
  const { selectedConversation, setselectedConversation } = userconversation();
  const { Newmessageuser, loggeduser } = Chatstate();
  // const [activechat, setactivechat] = useState("");

  console.log(users._id);
  const handleclick = () => {
    setselectedConversation(users);
    setSelectedChat(users);
    setNewmessageuser("");
    setchatvisual("");
    setvisual("hidden");
  };

  return (
    <div
      onClick={handleclick}
      className={`chatlist  list-grouplist-group-flushborder-bottom scrollarea `}
    >
      <div
        className={`list-group-item list-group-item-action background py-3 lh-tight ${
          selectedChat._id === users._id ? "activechat" : ""
        }`}
        aria-current="true"
      >
        <div
          className={`d-flex w-100 align-items-center justify-around`}
          style={{ gap: "" }}
        >
          <div>
            <img
              className="pic position-relative"
              style={{ marginLeft: "7px" }}
              src={users.pic}
              alt="pic"
            />
            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success hidden rounded-circle"></span>
          </div>
          <strong style={{ color: "white" }} className="mb-1">
            {users.name}
          </strong>
          {Newmessageuser.reciverid === loggeduser._id &&
          Newmessageuser.senderid === users._id ? (
            <small
              className="bg-green-600 "
              style={{
                marginRight: "7px",
                borderRadius: "50%",
                padding: "2px",
              }}
            >
              +1
            </small>
          ) : (
            <div></div>
          )}
        </div>
        {/* <div className="col-10 mb-1 small" style={{ marginLeft: "70px" }}>
          Some placeholder content in div paragraph below the heading and date.
        </div> */}
      </div>
    </div>
  );
}
