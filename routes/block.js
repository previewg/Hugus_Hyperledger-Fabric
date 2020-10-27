"use strict";
const express = require("express");
const router = express.Router();
const Block = require("../models/block");

router.get("/init", async (req, res) => {
  try {
    Block.find({}, (err, data) => {
      if (err) console.log(err);
      res.json({ list: data, success: 1 });
    })
      .sort({ timestamp: -1 })
      .limit(10);
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

module.exports = router;
