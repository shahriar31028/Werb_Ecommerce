import axios from "axios";

export const loginUserid = (user) => async (dispatch) => {
  dispatch({ type: "USER_ID_REQUEST" });
  try {
    const log_res = await axios.get("/bankAPI/users/login", {
      params: { user },
    });
    const find_res = await axios.get("/bankAPI/users/findbyUid", {
      params: { user: log_res.data._id },
    });
    dispatch({ type: "USER_ID_SUCCESS", payload: find_res.data });
    localStorage.setItem("currentBankUser", JSON.stringify(find_res.data));
    
  } catch (error) {
    dispatch({ type: "USER_ID_FAILED", payload: error });
  }
};
