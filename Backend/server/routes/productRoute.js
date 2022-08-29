const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

router.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

router.post("/addNewProduct", async (req, res) => {
  const { name, category, description, image, price } = req.body;
  const newProduct = new Product({ name, price, category, image, description });

  try {
    newProduct.save();
    res.send("Product saved successfully");
  } catch (error) {
    return res.status(400).json();
  }
});
module.exports = router;
