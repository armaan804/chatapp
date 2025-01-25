import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chatcontext = createContext();

const Chatprovider = ({ children }) => {
  const navigate = useNavigate();
  const user = {
    _id: localStorage.getItem("user_id"),
    name: localStorage.getItem("name"),
    pic: localStorage.getItem("pic"),
  };
  const [User, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState({});
  const [notification, setNotification] = useState([]);
  const [loggeduser, setloggeduser] = useState(user);
  const [chats, setChats] = useState([]);
  const [searchchat, setsearchchat] = useState([]);
  const [Newmessageuser, setNewmessageuser] = useState("");
  const [chatvisual, setchatvisual] = useState("hidden");
  const [visual, setvisual] = useState("");
  const setselectedchat = (users) => {
    setSelectedChat(users);
  };
  useEffect(() => {
    const userinfo = localStorage.getItem("token");
    setUser(userinfo);
    if (!userinfo) {
      navigate("/login");
    }
  }, []);
  return (
    <Chatcontext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        setselectedchat,
        User,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        searchchat,
        setsearchchat,
        setloggeduser,
        loggeduser,
        Newmessageuser,
        setNewmessageuser,
        setchatvisual,
        chatvisual,
        visual,
        setvisual,
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
};
export const Chatstate = () => {
  return useContext(Chatcontext);
};

export default Chatprovider;
