const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");

router.get("/getAllOrders", async (req, res) => {
  try {
    const order = await Order.find();
    res.send(order);
  } catch (error) {
    return res.status(400).json();
  }
});
router.post("/ShippingAOrder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const res = await Order.findByIdAndUpdate(
      { _id: orderid },
      { isDelivered: 2 }
    ).exec();
  } catch (error) {
    return res.status(400).json();
  }
});

module.exports = router;
