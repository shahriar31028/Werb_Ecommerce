import React, { useState, useEffect } from "react";
import "./AddItem.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewProducts } from "../../actions/productAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddItem() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [Img, setImg] = useState("");
  const [Price, setPrice] = useState("");

  function reqItemADD() {
    if (!name || !desc || !cat || !Img || !Price) {
      toast.info("Fill Properly and First Variant Must Be Filled", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const newItem = {
      name,
      category: cat,
      description: desc,
      image: Img,
      price: Price,
    };
    console.log(newItem);
    dispatch(addNewProducts(newItem));
  }

  return (
    <div>
      <ToastContainer limit={3} containerId="default" />

      <div class="signup-container">
        <div class="right-container">
          <header>
            <div class="set2 set3">
              <div class="prod-name">
                <label for="pets-name">Name</label>
                <input
                  id="prod-name"
                  placeholder="Product's name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="set2">
              <div class="prod-name">
                <label for="pets-name">Description</label>
                <input
                  id="prod-des"
                  placeholder="Description"
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="set">
              <div class="pets-breed">
                <label for="pets-breed">Category</label>
                <input
                  id="pets-breed"
                  placeholder="Product Category"
                  type="text"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  required
                />
              </div>
              <div class="pets-birthday">
                <label for="pets-birthday">Image Permalink</label>
                <input
                  id="pets-birthday"
                  placeholder="https://"
                  type="text"
                  value={Img}
                  onChange={(e) => setImg(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="set2">
              <div class="prod-name">
                <label for="pets-name">Price</label>
                <input
                  id="prod-des"
                  placeholder="Product's Price"
                  type="text"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div class="pets-weight">
              <div class="input ">
                <div class="input-group-prepend vn1"></div>
              </div>
            </div>

            <div class="pets-weight">
              <div class="input-group ">
                <div class="input-group-prepend vn1"></div>
              </div>
            </div>
          </header>
          <footer>
            <div class="set">
              <button id="back" onClick={() => window.location.replace("/")}>
                Back
              </button>
              <button id="next" onClick={reqItemADD}>
                Next
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
