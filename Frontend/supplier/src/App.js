import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { Modal } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAllOrders, ShippingAOrder } from "./actions/supplierActions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [UIDPass, setUIDPass] = useState("");

  const handleClose = () => setShow(false);
  const handleClose_withConfirm = (order) => {
    if (UIDPass != "supplier") {
      // console.log(currentAdmin[0].password," vs You vs ",UIDPass);
      toast.error("Suppliers's Credential Doesn't Match", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setUIDPass("");
      setShow(false);
      return;
    }
    console.log("Accpeted" + order._id);
    dispatch(ShippingAOrder({ orderid: order._id }));
    toast.success("Product Supplied for OrderID- " + order._id, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    setUIDPass("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const orderstate = useSelector((state) => state.getAllOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div className="App">
      {/* <ToastContainer limit={2} />
      {/* <p> HUGE SUCCESS </p> */}
      {/* <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.css"
        integrity="sha512-1hsteeq9xTM5CX6NsXiJu3Y/g+tj+IIwtZMtTisemEv3hx+S9ngaW4nryrNcPM4xGzINcKbwUJtojslX2KG+DQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />{" "}  */}
      <div className="orderScreenHolder">
        <text id="titleid" style={{ fontSize: "35px" }}>
          Orders For Shipping{" "}
        </text>

        <br></br>
        <text id="text" style={{ fontSize: "25px", fontStyle: "italic" }}>
          Supply the ordered products{" "}
        </text>
        <hr id="line"></hr>
        {
          <div className="row justify-content-center">
            {loading && <div> Loading... </div>}
            {error && <div> Something went wrong... </div>}
            {orders &&
              orders.map((order) => {
                return (
                  order.isDelivered != 0 && (
                    <div className=" ">
                      {
                        <div className="flex-container">
                          <i class="fa-duotone fa-truck-clock"></i>

                          <div className="text-left d-flex w-50 m-1 pp2">
                            <ch1>
                              {" "}
                              Transaction Id: {order.transactionId.slice(12)}
                            </ch1>
                            <ch1> Order Amount : {order.orderAmount} </ch1>
                            <br></br>
                            <ch1> Date : {order.createdAt.slice(0, 10)} </ch1>
                            <br></br>
                            <br></br>

                            
                          </div>
                         

                          
                          <div className="ExtendedOrder">
                            {/* <div class="vertical"></div>
                            <div class="vertical2"></div> */}

                            {order.isDelivered === 1 && (
                              <div /*class="circle small"*/>
                                {/* <h3>GFDA / No. 65</h3> */}
                                <button className="btn h1" onClick={handleShow}>
                                  Supply Product
                                </button>
                                {/*-----------------M--O--D--A--L------------------------*/}
                                <Modal
                                  show={show}
                                  className=" modal fade bd-example-modal-lg" style={{ width: "1100px",height:"2000px", margin:"auto"}}
                                >
                                  <Modal.Header
                                    closeButton
                                    onClick={handleClose}
                                  >
                                    <Modal.Title className="modal_size_and_font1 ">
                                      {"You need to supply this product"}
                                    </Modal.Title>
                                  </Modal.Header>

                                  <Modal.Body>
                                    <h2 className="modal_size_and_font1 ">
                                      {"Customer Name : " + order.name}
                                    </h2>
                                    <p className="pAdd ">
                                      {"Address : " +
                                        order.shippingAddress.street +
                                        "," +
                                        order.shippingAddress.city +
                                        "," +
                                        order.shippingAddress.country }
                                    </p>
                                    <hr id="sphr"></hr>
                                    <h2 className="pAmount ">
                                      {"Amount : " + order.orderAmount}
                                    </h2>
                                    {/* <p className="pTrx ">
                                      {"Trx Id. : " + order.transactionId}
                                    </p> */}

                                    <hr id="sphr"></hr>
                                    <div className="">
                                      {order.orderItems.map((item) => {
                                        return (
                                          <div>
                                            <h1 id="spfont">
                                              {" "}
                                              {item.name}[ {item.varient}*
                                              {item.quantity}]= {item.price}
                                            </h1>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    {/* <p id="pAmount ">{"Shipment City Zip Code. "+order.shippingAddress.pincode}</p> */}
                                    {/* <p>{"Number of Products"+Object.keys( order.orderItem).length}</p> */}
                                    <hr></hr>
                                    {/* <p className="pMsg ">
                                      {"IF You Confirm this Supply Request " +
                                        "  Objects will be transferred from your inventory "}
                                    </p> */}

                                    {/* <hr id="sphr"></hr> */}
                                    {/* <div class="center">
                                      <div class="float-input">
                                        <label id="slab">
                                          Suppliers's BankUID Password
                                        </label>
                                        <input
                                          type="password"
                                          placeholder="Enter"
                                          value={UIDPass}
                                          onChange={(e) =>
                                            setUIDPass(e.target.value)
                                          }
                                          required
                                        />
                                      </div>
                                    </div> */}
                                  </Modal.Body>

                                  <Modal.Footer>
                                    
                                    {/* <div
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handleClose_withConfirm(order)
                                      }
                                    >
                                      Accept
                                    </div> */}
                                  </Modal.Footer>
                                </Modal>
                                <Modal
                                  show={show}
                                  className=" modal fade bd-example-modal-lg" style={{ width: "2200px", margin:"auto"}}
                                >
                                  <Modal.Header
                                    closeButton
                                    onClick={handleClose}
                                  >
                                    <Modal.Title className="modal_size_and_font2 ">
                                      {"Supplier Accept Token"}
                                    </Modal.Title>
                                  </Modal.Header>

                                  <Modal.Body>
                                    <h2 className="modal_size_and_font1 ">
                                    {"Order No.-" + order._id.slice()}
                                    </h2>
                                    {/* <p className="pAdd ">
                                      {"Adress : " +
                                        order.shippingAddress.street +
                                        "," +
                                        order.shippingAddress.city +
                                        "," +
                                        order.shippingAddress.country }
                                    </p> */}
                                    <hr id="sphr"></hr>
                                    {/* <p className="pAmount ">
                                      {"Amount : " + order.orderAmount}
                                    </p> */}
                                    <h2 className="modal_size_and_font1 ">
                                      {"Trx Id. : " + order.transactionId.slice(5)}
                                    </h2>

                                    <hr id="sphr"></hr>
                                    {/* <div className="">
                                      {order.orderItems.map((item) => {
                                        return (
                                          <div>
                                            <h1 id="spfont">
                                              {" "}
                                              {item.name}[ {item.varient}*
                                              {item.quantity}]= {item.price}
                                            </h1>
                                          </div>
                                        );
                                      })}
                                    </div> */}
                                    {/* <p id="pAmount ">{"Shipment City Zip Code. "+order.shippingAddress.pincode}</p> */}
                                    {/* <p>{"Number of Products"+Object.keys( order.orderItem).length}</p> */}
                                   
                                    {/* <p className="modal_size_and_font2 ">
                                      {"IF You Confirm this Supply Request " +
                                        "  Objects will be transferred from your inventory "}
                                    </p> */}

                                    {/* <hr id="sphr"></hr> */}
                                    <div class="center">
                                      <div class="float-input">
                                        <label id="slab">
                                          Suppliers's BankUID Password
                                        </label>
                                        <input
                                          type="password"
                                          placeholder="Enter"
                                          value={UIDPass}
                                          onChange={(e) =>
                                            setUIDPass(e.target.value)
                                          }
                                          required
                                        />
                                      </div>
                                    </div>
                                  </Modal.Body>

                                  <Modal.Footer>
                                    
                                    <div
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handleClose_withConfirm(order)
                                      }
                                    >
                                      Accept
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            )}
                            {/*-------------------*/}
                            {order.isDelivered === 2 && (
                              <div className="">
                                {/* <i class="far fa-check-circle"></i> */}
                                <p id="fixit">Supplied</p>
                              </div>
                            )}
                          </div>
                        </div>
                      }
                      <hr id="line"></hr>
                    </div>
                    
                  )
                );
              })}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
