import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserOrders } from "../../actions/orderActions";
import {
  getAllOrders,
  verifyAOrder,
  updateAdminBalance,
} from "../../actions/adminAction";
import { checkUser } from "../Homescreen";
import { Modal } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./OrderScreen.css";

export default function OrderScreen() {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.verifyAdminReducer);
  const { currentAdmin } = adminState;

  const [UIDPass, setUIDPass] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose_withConfirm = (order) => {
    if (UIDPass !== currentAdmin[0].password) {
      setUIDPass("");
      setShow(false);
      return;
    }
    setUIDPass("");
    console.log("Accpeted" + order._id);
    dispatch(verifyAOrder({ orderid: order._id }));
    dispatch(updateAdminBalance(currentAdmin[0].email, order.orderAmount));
    toast.success("Order Forwared to Supplier " + order._id, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const orderstateAdmin = useSelector((state) => state.getAllOrdersReducer);
  const logState = !!localStorage.getItem("currentAdmin");
  var orders, error, loading;

  if (logState) {
    ({ orders, error, loading } = orderstateAdmin);
  } else {
    ({ orders, error, loading } = orderstate);
  }

  useEffect(() => {
    if (!logState) {
      dispatch(getUserOrders());
      checkUser();
    } else {
      dispatch(getAllOrders());
    }
  }, []);

  return (
    // <div className="orderScreenHolder">
    <div className="orderScreenHolder">
      <text id="titleid" style={{ fontSize: "35px" }}>
        Orders For Shipping{" "}
      </text>
      <ToastContainer limit={2} />

      {!logState ? (
        <h2 style={{ fontSize: "35px" }}>My Orders </h2>
      ) : (
        <h2
          style={{ fontSize: "35px", marginTop: "60px", marginLeft: "-100px" }}
        >
          Confirm These Orders
          <h6> Please Confirm the state of these orders </h6>
        </h2>
      )}
      <hr id="sphr"></hr>

      {
        <div className="row justify-content-center">
          {loading && <div> Loading... </div>}
          {error && <div> Something went wrong... </div>}
          {orders &&
            orders.map((order) => {
              return (
                <div>
                  <div className="baal">
                    <br></br>
                    <ch1> Date : {order.createdAt.slice(0, 10)} </ch1>
                    <br></br>
                    <ch1> Transaction Id :{order.transactionId.slice(12)}</ch1>
                    <br></br>
                    <ch1> Ordered items</ch1>
                    <br></br>

                    {order.orderItems.map((item) => {
                      return (
                        <div>
                          <h1>
                            {" "}
                            {item.name}[ {item.varient}*{item.quantity}]={" "}
                            {item.price}
                          </h1>
                        </div>
                      );
                    })}

                    <div>
                      <ch1> Order Amount : {order.orderAmount}</ch1>
                    </div>

                    <br></br>
                    <br></br>
                  </div>
                  <div style={{ marginTop: "50px" }}>
                    {logState && order.isDelivered === 0 && (
                      <div>
                        <div classname="button">
                          <button className="btn h1" onClick={handleShow}>
                            CONFIRM ORDER
                          </button>
                        </div>

                        {
                          <Modal show={show} className="modal modal_window">
                            <Modal.Header closeButton onClick={handleClose}>
                              <Modal.Title className="pTname ">
                                {"Order No.-" + order._id.slice(4)}
                              </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <p className="pCname ">
                                {"Customer Name : " + order.name}
                              </p>
                              <p className="pAdd ">
                                {"Adress : " +
                                  order.shippingAddress.street +
                                  "," +
                                  order.shippingAddress.city +
                                  "," +
                                  order.shippingAddress.country +
                                  "-" +
                                  order.shippingAddress.pincode}
                              </p>
                              <hr id="sphr"></hr>
                              <p className="pAmount ">
                                {"Amount Paid : " + order.orderAmount}
                              </p>
                              <p className="pTrx ">
                                {"Trx Id. : " + order.transactionId}
                              </p>

                              <hr id="sphr"></hr>
                              <p className="pMsg "></p>
                              <p className="pMsg2 ">
                                {"Also "}
                                {<a id="amountSP"> {order.orderAmount} </a>}
                                {" /= BDT will be "}
                                {" Deducted From Admin's Bank Account "}
                              </p>
                              <hr id="sphr"></hr>
                              <div class="center">
                                <div class="float-input">
                                  <label>Admin's BankUID Password</label>
                                  <input
                                    type="password"
                                    placeholder="Enter"
                                    value={UIDPass}
                                    onChange={(e) => setUIDPass(e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                            </Modal.Body>

                            <Modal.Footer>
                              <div
                                className="btn-white accpet clshov"
                                onClick={handleClose}
                              >
                                CLOSE
                              </div>
                              <button
                                onClick={() => handleClose_withConfirm(order)}
                              >
                                Accept
                              </button>
                            </Modal.Footer>
                          </Modal>
                        }
                      </div>
                    )}
                    {!logState && order.isDelivered === 0 && (
                      <div className="fixarea">
                        <i class="" aria-hidden="true"></i>
                        <p id="fixt1">Processing</p>
                      </div>
                    )}

                    {order.isDelivered === 2 && (
                      <div className="fixarea">
                        {logState ? (
                          <i class=" " aria-hidden="true"></i>
                        ) : (
                          <i class="" aria-hidden="true"></i>
                        )}
                        {logState ? (
                          <p id="">Supplied</p>
                        ) : (
                          <p id="fixit">Products Received</p>
                        )}
                      </div>
                    )}
                    {order.isDelivered === 1 && (
                      <div className="fixarea">
                        <p>shipping</p>
                      </div>
                    )}
                  </div>
                </div>
              );
              // </div>
            })}
        </div>
      }
    </div>
  );
}
