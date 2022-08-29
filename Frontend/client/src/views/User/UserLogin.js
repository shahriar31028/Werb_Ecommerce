import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../actions/userAction";
import { checkLoggedAsAdmin } from "../Homescreen";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const dispatch = useDispatch();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    checkLoggedAsAdmin();
    if (localStorage.getItem("currentUser")) {
      setTimeout(this, 500);
      notify("", "Fill Up Every Field Correctly", 400);
      window.location.href = "/";
    }
  }, []);

  const { loading, success } = useSelector((state) => state.loginUserReducer);

  const notify = (callId, msg, timex) => {
    if (callId === "" || callId === "passNotMatch") {
      return toast.warning(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: timex,
      });
    }
    if (callId === "reg") {
      toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: timex,
      });
    }
  };

  function loginWithUser() {
    if (!email || !password || !email.match(/.+@.+/)) {
      if (!email.match(/.+@.+/)) {
        setEmail("");
      }
      return notify("", "Fill Up Every Field Correctly", 1000);
    }
    const user = {
      email,
      password,
    };

    dispatch(loginUser(user));
  }
  return (
    <div>
      <ToastContainer limit={2} />
      <div className="row justify-content-center">
        <div className="" id="uReginputHolder" validate>
          <div>
            {loading && !success && (
              <div class="load_hold">
                {" "}
                <div class="dots-bars-3"> </div>
              </div>
            )}
            {success && !loading}

            <input
              type={"email"}
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "400px",
                height: "40px",
                marginLeft: "450px",
                backgroundColor: "transparent",
                borderColor: "black",
                borderWidth: "2px",
              }}
            />
            <input
              type={"password"}
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              required
              style={{
                width: "400px",
                height: "40px",
                marginLeft: "450px",
                backgroundColor: "transparent",
                borderColor: "black",
                borderWidth: "2px",
              }}
            />

            <button
              type="button"
              className="btn-outline-dark registerButton mt-3"
              onClick={loginWithUser}
              style={{ marginLeft: "-150px" }}
            >
              Login
            </button>
          </div>
        </div>
        <a
          href="/register"
          id="clicktoLog"
          style={{ color: "black", fontWeight: "bold", marginLeft: "-150px" }}
        >
          {" "}
          Not Registered yet? Create an Account!{" "}
        </a>
      </div>
    </div>
  );
}
