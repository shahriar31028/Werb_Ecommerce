import axios from "axios";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const registerBankUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_BANK_REQUEST" });

  try {
    const response = await axios.post("/bankAPI/users/register", user);

    dispatch({ type: "USER_REGISTER_BANK_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_BANK_FAILED", payload: error });
  }
};
export const findBankUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_FIND_BANK_REQUEST" });

  try {
    const response = await axios.get("/bankAPI/users/getUID", {
      params: { user: user },
    });

    if (response.data) {
      dispatch({ type: "USER_FIND_BANK_SUCCESS" });
      localStorage.setItem("currentUserUID", JSON.stringify(response.data));
      await delay(2000);
      window.location.href = "/";
    } else {
      dispatch({ type: "USER_FIND_BANK_FAILED", payload: response });
      await delay(2000);
      window.location.href = "/registerUID";
    }
  } catch (error) {
    dispatch({ type: "USER_FIND_BANK_FAILED", payload: error });
  }
};
