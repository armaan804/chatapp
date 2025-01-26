import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Login.module.css";
import { Chatstate } from "../store/chatstore";

export default function Login() {
  const { setloggeduser, loggeduser } = Chatstate();
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    navigate("/");
  }

  const [fetchstaus, setfetchstatus] = useState(false);
  const emailelement = useRef();
  const passwordelement = useRef();
  const handlesubmit = (e) => {
    e.preventDefault();
    if (emailelement === "" || passwordelement === "") {
      console.log("please filled all fields");
      toast("please fill all fields");
      return;
    }
    const email = emailelement.current.value;
    const password = passwordelement.current.value;
    if (email === "" || password === "") {
      console.log("please filled allfields");
      toast("please fill all fields");
      return;
    }
    setfetchstatus(true);
    fetch("https://jarvis-chat.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "HTTP Token Auth",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user_id", res._id);
        localStorage.setItem("name", res.name);
        localStorage.setItem("pic", res.pic);
        setfetchstatus(false);
        setloggeduser(res);
        console.log(loggeduser);
        if (res.success) {
          toast.success(res.message);
          navigate("/");
        } else {
          toast.error(res.message);
        }
      });
  };
  return (
    <main>
      <div className={styles.main}>
        <div className={styles.login}>
          <form>
            <label for="chk" aria-hidden="true">
              Login
            </label>
            <input
              className={styles.input}
              type="email"
              ref={emailelement}
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              className={styles.input}
              type="password"
              name="pswd"
              ref={passwordelement}
              placeholder="Password"
              required=""
            />
            {!fetchstaus ? (
              <button className={styles.button} onClick={handlesubmit}>
                Login
              </button>
            ) : (
              <button className={styles.button}>
                <Spinner animation="border" role="status">
                  <span className={styles.visuallyhidden}></span>
                </Spinner>
              </button>
            )}

            <ToastContainer />
          </form>
          <Link to={"/signup"}>
            <button className={styles.button}>signup</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
