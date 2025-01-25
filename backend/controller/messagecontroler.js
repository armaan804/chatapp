const Chat = require("../models/chat");
const Message = require("../models/message");
const { getReceieverSocketId, io } = require("../socketio");

const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverid } = req.params;
    const { id: senderid } = req.user;
    let chat = await Chat.findOne({ users: { $all: [senderid, reciverid] } });
    if (!chat) {
      chat = await Chat.create({ users: [senderid, reciverid] });
    }
    const newmessage = new Message({
      senderid,
      reciverid,
      message,
      chatid: chat._id,
    });

    if (newmessage) {
      chat.message.push(newmessage._id);
    }
    await Promise.all([chat.save(), newmessage.save()]);

    //socket io function
    const receiversocketId = getReceieverSocketId(reciverid);
    if (receiversocketId) {
      io.to(receiversocketId).emit("newMessage", newmessage);
    }

    res.status(200).json(newmessage);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getmessage = async (req, res) => {
  try {
    const { id: reciverid } = req.params;
    const { id: senderid } = req.user;
    const chat = await Chat.findOne({
      users: { $all: [reciverid, senderid] },
    }).populate("message");
    // console.log(chat.message);
    if (!chat) return res.status(200).send([]);
    const message = chat.message;
    res.status(200).send(message);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { sendmessage, getmessage };
