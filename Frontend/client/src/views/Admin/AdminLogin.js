import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Admin.css";
import { verifyAdmin } from "../../actions/adminAction";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const dispatch = useDispatch();

  const { load, success } = useSelector((state) => state.verifyAdminReducer);

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setTimeout(this, 2000);
      notify("", "You are Already Logged in", 1000);
      window.location.href = "/";
    }
    if (localStorage.getItem("currentAdmin")) {
      setTimeout(this, 2000);
      notify("", "You are Already Logged in", 200);
      window.location.href = "/orders";
    }
  }, []);

  const notify = (callId, msg) => {
    if (callId === "" || callId === "passNotMatch") {
      return toast.warning(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
    if (callId === "reg") {
      toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  };
  function loginWithAdmin() {
    if (!email || !password || !email.match(/.+@.+/)) {
      if (!email.match(/.+@.+/)) {
        setEmail("");
      }
      return notify("", "Fill Up Every Field");
    }
    const admin = {
      email,
      password,
    };
    console.log("ADMIN :", admin);
    dispatch(verifyAdmin(admin));
  }
 
  return (
    <div className="admin-login">
      <ToastContainer limit={2} />
    
      {load && (
        <div class="load_hold">
          {" "}
          <div class="dots-bars-3"> </div>
        </div>
      )}
      {success && !load && notify("reg", "Login As Admin Successful", 2000)}
      <div class="center">
        <h1 className="fixtex1">Admin</h1>
        <form>
          <div className="something">
            <input
              type="text "
              id="fixBg1"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "400px",
                height: "40px",
                marginLeft: "-50px",
                backgroundColor: "transparent",
                borderColor: "black",
                borderWidth: "2px",
                marginTop: "300px",
                display: "flex",
                flexDirection: "column",
              }}
            />
           

            <input
              type="password"
              value={password}
              placeholder="Password"
              id="fixBg2"
              onChange={(e) => setPass(e.target.value)}
              required
              style={{
                width: "400px",
                height: "40px",
                marginLeft: "-50px",
                backgroundColor: "transparent",
                borderColor: "black",
                borderWidth: "2px",
              }}
            />

            <div class="inputbox">
              <input
                id="subBut"
                type="button"
                onClick={loginWithAdmin}
                value="Login"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
