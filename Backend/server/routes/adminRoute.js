const express = require("express");
const router = express.Router();

const Admin = require("../models/adminModel");

router.get("/verifyAdmin", async (req, res) => {
  const email = req.query.admin
    .split(",")[0]
    .split(":")[1]
    .replace(/['"]+/g, "");
  const password = req.query.admin
    .split(",")[1]
    .split(":")[1]
    .split("}")[0]
    .replace(/['"]+/g, "");

  try {
    result = await Admin.find({ email, password });
  } catch (error) {
    return res.status(400).json();
  }
});

module.exports = router;
