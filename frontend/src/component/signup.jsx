import { useContext, useRef, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authcontext } from "../store/authstore";
import styles from "./Login.module.css";

export default function Signup() {
  const { setauth } = useContext(authcontext);
  const [gender, setgender] = useState("");
  const navigate = useNavigate();

  const [fetchstaus, setfetchstatus] = useState(false);
  const [pic, setpic] = useState("");
  const nameelement = useRef();
  const emailelement = useRef();
  const passwordelement = useRef();
  const genderelement = useRef();
  const handlesubmit = (e) => {
    e.preventDefault();
    const name = nameelement.current.value;
    const email = emailelement.current.value;
    const password = passwordelement.current.value;
    const gender = genderelement.current.value;
    if (name === "" || email === "" || password === "" || gender === "") {
      console.log("please filled allfields");
      toast("please fill all fields");
      return;
    }
    setfetchstatus(true);
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "HTTP Token Auth",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        gender: gender,
        pic: pic,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user_id", res._id);
        localStorage.setItem("name", res.name);
        localStorage.setItem("pic", res.pic);
        console.log(res);
        setfetchstatus(false);
        setauth(res.token);
        if (res.success) {
          toast.success(res.message);
          navigate("/");
        } else {
          toast.error(res.message);
        }
      });
  };

  const handleimg = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setpic(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <main>
      <div className={styles.main}>
        <div className={styles.signup}>
          <form>
            <label for="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className={styles.input}
              ref={nameelement}
              type="text"
              name="txt"
              placeholder="User name"
              required=""
            />
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
            <input
              className={styles.input}
              type="text"
              name="gender"
              ref={genderelement}
              placeholder="male or female"
              required=""
            />
            <input
              className={`  ${styles.input}`}
              style={{ fontSize: ".8rem", height: "2.2rem" }}
              type="file"
              name="img"
              onChange={handleimg}
              // ref={passwordelement}
            />
          </form>
          {/* <center className="flex justify-center">
            <input type="checkbox" value={"male"} />
            male
            <input type="checkbox" className="ml-3" value={"female"} />
            female
          </center> */}
          {!fetchstaus ? (
            <button className={styles.button} onClick={handlesubmit}>
              Sign up
            </button>
          ) : (
            <button className={styles.button}>
              <Spinner animation="border" role="status"></Spinner>
            </button>
          )}
          <ToastContainer />

          <Link to={"/"}>
            <button className={styles.button}>login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
