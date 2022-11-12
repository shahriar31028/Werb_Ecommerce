import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { registerBankUser, findBankUser } from "../../actions/userAction_Bank";

export default function UserBank() {
  const [bankUID, setbankUID] = useState("");
  const [secretKey, setsecretKey] = useState("");
  const dispatch = useDispatch();

  const { loadingy, successy } = useSelector(
    (state) => state.registerUserBankReducer
  );

  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const notify = (callId, msg, timex) => {
    if (callId === "") {
      return toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: timex,
      });
    }
    if (callId === "reg") {
    }
    if (callId === "info") {
      //toast.info(msg, { position: toast.POSITION.TOP_RIGHT, autoClose: timex });
    }
  };

  function bankRegWithUser() {
    if (!bankUID || !secretKey) {
      if (bankUID.length < 10) {
        setbankUID("");
      }
      return notify("", "BankUID length should be 10", 1500);
    }
    const userID = {
      bankUID,
      email: currentUser.email,
      password: secretKey,
    };

    notify("info", "your Email: " + currentUser.email + " will be used ", 2000);
    dispatch(registerBankUser(userID));
    dispatch(findBankUser(currentUser.email));
  }
  return (
    <div>
      <ToastContainer limit={1} />
      <div className="row justify-content-center">
        <div id="uReginputHolder" validate>
          <html_banner className="text-center">
            {" "}
            Your Bank Information{" "}
          </html_banner>
          <div>
            {loadingy && !successy && (
              <div class="load_hold">
                {" "}
                <div class="dots-bars-3"> </div>
              </div>
            )}
            {successy &&
              !loadingy &&
              notify("reg", "BankUID Verification Successful,", 1520)}
            <input
              type={"BankUID"}
              placeholder="Bank User Identification No."
              className="form-control"
              value={bankUID}
              onChange={(e) => setbankUID(e.target.value)}
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
              value={secretKey}
              onChange={(e) => setsecretKey(e.target.value)}
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
              onClick={bankRegWithUser}
              style={{ marginBottom: "50px" }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <p
        id="clause_for_user"
        style={{ color: "black", fontWeight: "bold", marginTop: "20px" }}
      >
        {" "}
        Your bank details are required for your further activities.{" "}
      </p>
    </div>
  );
}
