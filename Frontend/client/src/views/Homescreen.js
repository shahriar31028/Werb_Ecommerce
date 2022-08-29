import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productAction";
import Product from "../components/SingleProduct/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./Admin/AdminLogin";

export default function Homescreen() {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.getAllProductsReducer);
  const { products, error, loading } = productState;

  const logState = !!localStorage.getItem("currentAdmin");

  useEffect(() => {
    if (!logState) {
      dispatch(getAllProducts());
      checkUser();
    }
  }, []);

  return (
    <div>
      {" "}
      <ToastContainer limit={1} />
      <div className="row justify-content-center homescreenContainer">
        {logState ? (
          <div>
            <p>
              {" "}
              from you to proceed with your orders and payment in future
              <div>
                <h3 id="noItemsinCart"></h3>
                <h3
                  id="noItemsinCart2"
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "brown",
                    marginLeft: "-350px",
                  }}
                >
                  <a href="/orders">ViewOrders</a>{" "}
                </h3>
                <h3
                  id="noItemsinCart3"
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "black",
                    marginLeft: "500px",
                    marginTop: "-43px",
                  }}
                >
                  <a href="/addItem">Add Items</a>{" "}
                </h3>
              </div>
            </p>
          </div>
        ) : loading ? (
          <div class="load_hold">
            {" "}
            <div class="dots-bars-3"> </div>
          </div>
        ) : error ? (
          <html_h1>Wrong</html_h1>
        ) : (
          products.map((product) => {
            return (
              <div className="col-md-3 m-3 " key={product._id}>
                <Product product={product} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export const notify = (callId, msg, timex) => {
  if (callId === "noUser") {
    return toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: timex,
    });
  }
  if (callId === "redirect") {
    return toast.info(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: timex,
    });
  }
};
export const checkUser = () => {
  if (!localStorage.getItem("currentUser")) {
    setTimeout(() => (window.location.href = "/login"), 6000);
    
  }
};

export const checkLoggedAsAdmin = () => {
  if (localStorage.getItem("currentAdmin")) {
    setTimeout(() => (window.location.href = "/"), 3000);
    
  }
};
