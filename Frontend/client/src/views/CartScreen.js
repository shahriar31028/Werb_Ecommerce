import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, deleteFromCart } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { checkUser } from "./Homescreen";
import Checkout from "../components/Checkout/Checkout";

export default function CartScreen() {
  checkUser();
  const notify = (callId, msg) => {
    toast.clearWaitingQueue({ containerId: "default" });
    if (callId === "limit") {
      return toast.info(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    toast("Default!", { position: toast.POSITION.BOTTOM_LEFT });
  };
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  const dispatch = useDispatch();

  function increaseCount(item) {
    if (item.quantity === 20)
      return notify("limit", "We deliver maximum of 20 quantities ");
    dispatch(addToCart(item, Math.min(item.quantity + 1, 20), item.varient));
  }
  function decreaseCount(item) {
    if (item.quantity === 1)
      return notify("limit", "Can't Order Less than 1 quantities");
    dispatch(addToCart(item, Math.max(item.quantity - 1, 1), item.varient));
  }
  function removeItemCart(item) {
    dispatch(deleteFromCart(item));
  }

  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);

  return (
    <div id="basic_container">
      <ToastContainer limit={1} containerId="default" />
      <div className="row justify-content-center" id="consumeBody">
        <div className="col-md-6 cartContainer">
          <div
            style={{
              marginTop: "100px",
              color: "black",
              fontSize: "25px",
              textAlign: "center",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {" "}
            MY CART
          </div>
          <hr id="allhr"></hr>

          {cartItems.length == 0 ? (
            <div id="noItemDiv">
              <h3 id="noItemsinCart">
                No items in your Cart. Visit the <a href="/">Homepage</a>
              </h3>
              <h3 id="noItemsinCart2">
                or Visit <a href="/orders"> My Orders </a> for recent order info
              </h3>
            </div>
          ) : (
            cartItems.map((item) => {
              const defaultPrize = JSON.stringify(item.prices[0])
                .split(",")[0]
                .split(":")[1];
              {
                console.log(item.varients);
              }
              return (
                <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="text-nowrap">
                    <custom_h1 className="text-nowrap">
                      {item.name}

                      <br></br>
                    </custom_h1>

                    <custom_h1 className="text-nowrap">
                      Price : <></>
                      {item.varient != "null"
                        ? item.prices[0][item.varient]
                        : defaultPrize}
                      * {item.quantity}={" "}
                      {JSON.stringify(item.price) != "null"
                        ? item.price
                        : defaultPrize * item.quantity}
                    </custom_h1>

                    <div className="text-nowrap">
                      <custom_h1 id="cartPage_defQ">Quantity :&nbsp;</custom_h1>
                      <i
                        className="fa fa-plus "
                        id="cartPageIconPlus"
                        aria-hidden="true"
                        onClick={() => increaseCount(item)}
                      ></i>
                      &nbsp; &nbsp;
                      <b id="cartPageQuantity_text">{item.quantity}</b>
                      &nbsp;&nbsp;&nbsp;
                      <i
                        className="fa fa-minus"
                        id="cartPageIconMinus"
                        aria-hidden="true"
                        onClick={() => decreaseCount(item)}
                      ></i>
                      <hr />
                    </div>
                  </div>
                  <div>
                    <img
                      className="m-1 w-100"
                      id="cartPageProdImg"
                      src={item.image}
                    ></img>
                  </div>

                  <div>
                    <i
                      className=" fa fa-trash  mt-5 w-100 "
                      id="cartPageIconTrash"
                      aria-hidden="true"
                      onClick={() => removeItemCart(item)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length != 0 && (
          <div className="col-md-4 flex-container subtotal text-right">
            <h1 className="type3_text subt" style={{ marginLeft: "-300px" }}>
              Total Amount : {subtotal} Bdt/=
            </h1>
            <Checkout subtotal={subtotal} />
          </div>
        )}
      </div>
    </div>
  );
}
