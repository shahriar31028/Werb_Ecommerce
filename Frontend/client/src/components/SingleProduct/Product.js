import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { checkUser, notify } from "../../views/Homescreen";
export default function Product({ product }) {
  const [quantity, setQuantity] = useState(1);

  const [description, setdescription] = useState("null");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  function addToCartHandle() {
    if (!localStorage.getItem("currentUser")) {
      return checkUser();
    }
    dispatch(addToCart(product, quantity));
  }

  return (
    <div
      className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded"
      style={{ width: "300px", marginTop: "100px" }}
    >
      <h1 className="html_h1">{product.name}</h1>
      <img
        src={product.image}
        className="img-fluid single_el_img"
        onClick={handleShow}
      />

      <div className="flex-container">
        <div className="w-100 m-1">
          <p>Description</p>
          <p>{product.description}</p>
        </div>
      </div>

      <div class="flex-container">
        <div className="Pizprices m-1 w-100 ">
          <h2>{product.price} BDT/=</h2>
        </div>

        <div className="w-100 m-1">
          <button
            className=""
            onClick={addToCartHandle}
            style={{
              marginLeft: "-10px",
              backgroundColor: "blue",
              color: "white",
              height: "60px",
              marginBottom: "100px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Modal show={show} className="modal modal_window">
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={product.image} className="modal-image img-fluid" />
          <p>{product.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <div class="btn" onClick={handleClose}>
            CLOSE
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
