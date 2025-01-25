import { createContext, useEffect, useState } from "react";

export const userscontext = createContext({
  currentusers: [],
  setauth: () => {},
});

const Userscontextprovider = ({ children }) => {
  const [currentusers, setcurrentusers] = useState([]);
  const token = localStorage.getItem("token");
  const setcurrentuser = () => {
    useEffect(() => {
      // if (!token) {
      //   navigate("/login");
      // }
      fetch("http://localhost:3000/user/currentuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        //   email: email,
        //   password: password,

        // }),
      })
        .then((res) => res.json())
        .then((res) => {
          // localStorage.setItem("token", res);
          console.log(res);
          setcurrentusers(res);
          // window.alert(res);
        }, []);
    });
  };
  return (
    <userscontext.Provider value={{ currentusers, setcurrentuser }}>
      {children}
    </userscontext.Provider>
  );
};
export default Userscontextprovider;
