import { createContext, useState } from "react";

export const authcontext = createContext({
  auth: {},
  setauth: () => {},
});

const Authcontextprovider = ({ children }) => {
  const [auth, setauthuser] = useState(localStorage.getItem("userinfo"));
  const setauth = (userinfo) => {
    setauthuser(userinfo);
  };
  return (
    <authcontext.Provider value={{ auth, setauth }}>
      {children}
    </authcontext.Provider>
  );
};
export default Authcontextprovider;
