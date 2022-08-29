import axios from "axios";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const verifyAdmin = (admin) => async (dispatch) => {
  dispatch({ type: "ADMIN_LOGIN_REQUEST" });

  try {
    const response = await axios.get("/storeAPI/admin/verifyAdmin", {
      params: { admin: admin },
    });

    if (response.data.length) {
      dispatch({ type: "ADMIN_LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("currentAdmin", JSON.stringify(response.data));
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("currentUserUID");

      await delay(2000);
      window.location.href = "/";
    } else {
      dispatch({ type: "ADMIN_LOGIN_FAILED", payload: response });
    }
  } catch (error) {
    dispatch({ type: "ADMIN_LOGIN_FAILED", payload: error });
  }
};

export const logoutAdmin = () => (dispatch) => {
  localStorage.removeItem("currentAdmin");
  window.location.href = "/admin";
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: "GET_All_ORDER_REQ" });

  try {
    const response = await axios.get("/storeAPI/orders/getAllOrders");

    dispatch({ type: "GET_All_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_All_ORDER_FAILED", payload: error });
  }
};

export const verifyAOrder = (orderid) => async (dispatch) => {
  dispatch({ type: "VERIFY_A_ORDER_REQ" });

  try {
    const response = await axios.post("/storeAPI/orders/VerifyAOrder", orderid);

    dispatch({ type: "VERIFY_A_ORDER_SUCCESS", payload: response.data });

    window.location.href = "/orders";
  } catch (error) {
    dispatch({ type: "VERIFY_A_ORDER_FAILED", payload: error });
  }
};
export const updateBalance = (email, amount) => async (dispatch) => {
  try {
    // console.log("adminAction Up ",email,amount );
    const accUpdate = await axios.post("/bankAPI/users/updateBalance", {
      email,
      amount,
    });
  } catch (error) {}
};

export const updateAdminBalance = (email, amount) => async (dispatch) => {
  try {
    console.log("adminAction Up ", email, amount);
    const accUpdate = await axios.post("/bankAPI/users/updateAdminBalance", {
      email,
      amount,
    });
  } catch (error) {}
};
export const updateBalance = (email, amount) => async (dispatch) => {
  try {
    // console.log("adminAction Up ",email,amount );
    const accUpdate = await axios.post("/bankAPI/users/updateBalance", {
      email,
      amount,
    });
  } catch (error) {}
};
