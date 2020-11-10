"use strict";
const express = require("express");
const router = express.Router();
const Block = require("../models/block/block");
const Transaction = require("../models/block/transaction");

// BlockInfo page initLoad
router.get("/init", async (req, res) => {
  try {
    const blockList = await Block.find({}).sort({ timestamp: -1 }).limit(10);
    const blockHeight = await Block.countDocuments({});
    const txList = await Transaction.find({}).sort({ timestamp: -1 }).limit(10);
    const txHeight = await Transaction.countDocuments({});
    const totalAmount = await Transaction.aggregate([
      { $group: { _id: "totalAmount", value: { $sum: "$value" } } },
    ]);
    res.json({
      success: 1,
      blockList: blockList,
      blockHeight: blockHeight,
      txList: txList,
      txHeight: txHeight,
      totalAmount: totalAmount[0].value,
    });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

// Block/Tx All
router.get("/list/:page", async (req, res) => {
  try {
    const { type } = req.query;
    const { page } = req.params;
    const offset = (page - 1) * 20;
    if (type === "block") {
      const height = await Block.countDocuments({});
      const blockList = await Block.find({})
        .sort({ timestamp: -1 })
        .limit(20)
        .skip(offset);
      const more = offset + 20 < height;
      res.json({ list: blockList, height: height, success: 1, more: more });
    } else if (type === "tx") {
      const height = await Transaction.countDocuments({});
      const txList = await Transaction.find({})
        .sort({ timestamp: -1 })
        .limit(20)
        .skip(offset);
      const more = offset + 20 < height;
      res.json({ list: txList, height: height, success: 1, more: more });
    }
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

// Search User
router.get("/search/user/:hash/:page", async (req, res) => {
  try {
    const { hash } = req.params;
    const { page } = req.params;
    const offset = (page - 1) * 20;

    const height = await Transaction.countDocuments({$or:[{receiver_id: hash},{sender_id: hash}]});
    
    const userList = await Transaction.find({$or:[{receiver_id: hash},{sender_id: hash}]})
      .sort({ timestamp: -1 })
      .skip(offset)
      .limit(20);    
   
    console.log(userList);

    const more = offset + 20 < height;
    console.log(height);
    
    res.json({ list: userList, height: height, success: 1, more: more });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

// Search Tx
router.get("/search/tx/:hash", async (req, res) => {
  try {
    const { hash } = req.params;
    const data = await Transaction.findOne({ tx_id: hash });
    res.json({ data: data, success: 1 });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

// Search Block
router.get("/search/block/:hash", async (req, res) => {
  try {
    const { hash } = req.params;
    const data = await Block.findOne({ block_hash: hash });
    res.json({ data: data, success: 1 });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

module.exports = router;
