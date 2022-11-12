import "./App.css";
import { loginUserid } from "./actions/uidlogin";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const dispatch = useDispatch();
  const { currentBankUser } = useSelector((state) => state.loginUseridReducer);

  function loginWithUserID() {
    if (!password) {
      console.log("Fuck");
    } else if (email && email.match(/.+@.+/)) {
      console.log("FUck");
    }
    const bankuser = { email, password };

    dispatch(loginUserid(bankuser));
  }

  function logout() {
    localStorage.removeItem("currentBankUser");
    window.location.href = "/";
  }

  return (
    <div className="App">
      {}

      {!currentBankUser ? (
        <div>
 
          <form class="login">
            <t1>BanK LOGIN</t1>
            
            <div>
              <input
                class="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                class="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                class="button"
                type="button"
                id="button"
                onClick={loginWithUserID}
                onsubmit="return false"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div class="h6">YOUR BANK INFORMATION</div>
          <div class="padding something">
            <div>
              <div>
                <h5>{currentBankUser.email.split("@")[0]}</h5>
                <div class="divbox">
                  <div>
                    <div>
                      <h3>
                        <small>Email :</small>
                        {currentBankUser.email}
                      </h3>
                    </div>
                    <div>
                      <h3>
                        <small>Balance :</small>
                        {currentBankUser.bdt} \= BDT{" "}
                      </h3>
                    </div>
                    <div>
                      <h3>
                        <small class="id">Id No. :</small>
                        {currentBankUser.bankUID}
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="logout">
                  <button id="logout" onClick={logout}>
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
