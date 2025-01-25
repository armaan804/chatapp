const mongoose = require("mongoose");
const messageschema = mongoose.Schema(
  {
    senderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reciverid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
    chatid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: [],
    },
    // readby: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageschema);
module.exports = Message;
