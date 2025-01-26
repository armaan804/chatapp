const { Server } = require("socket.io");
const { createServer } = require("http");
const express = require("express");
const { Socket } = require("dgram");
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://jarvis-chat.onrender.com"],
    methods: ["GET", "POST"],
  },
});
const userSocketmap = {};
const getReceieverSocketId = (receiverId) => {
  return userSocketmap[receiverId];
};
io.on("connection", (socket) => {
  const userid = socket.handshake.query.userId;
  if (userid !== "undefine") userSocketmap[userid] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketmap));
  socket.on("disconnect", () => {
    delete userSocketmap[userid],
      io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

module.exports = { io, app, server, getReceieverSocketId };
