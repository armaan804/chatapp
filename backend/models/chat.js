const mongoose = require("mongoose");

const chatschema = mongoose.Schema(
  {
    // chatname: { type: String, trim: true },
    // isgroupchat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: "",
      },
    ],
    // groupadmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatschema);
module.exports = Chat;
