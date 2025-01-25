import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Signup from "./component/signup.jsx";
import { createBrowserRouter, BrowserRouter } from "react-router-dom";
import Login from "./component/Login.jsx";
import Home from "./pages/home.jsx";
import { SocketContextProvider } from "./store/socketstore.jsx";
const router = createBrowserRouter([
  { path: "/signup", element: <Signup></Signup> },
  { path: "/login", element: <Login></Login> },
  { path: "/", element: <Home></Home> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </BrowserRouter>
  </StrictMode>
);
