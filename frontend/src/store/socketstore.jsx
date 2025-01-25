import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Chatstate } from "./chatstore";
// import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  //   const { loggeduser } = Chatstate();
  const loggeduser = localStorage.getItem("user_id");
  //   const loggeduser = "6783fcd53e8076ed4827e5e7";
  useEffect(() => {
    if (loggeduser) {
      const socket = io("http://localhost:3000/", {
        query: {
          userId: loggeduser,
        },
      });
      socket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });
      setSocket(socket);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [loggeduser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
