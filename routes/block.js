"use strict";
const express = require("express");
const router = express.Router();
const Block = require("../models/block/block");
const transaction = require("../models/block/transaction");
const Transaction = require("../models/block/transaction");

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

router.post("/search/user/:page", async (req, res) => {
  try {
    const word = req.body.word;
    
    let searchUser;     
    let searchUserCount;
    let page;
    
      searchUser = await Transaction.find({ sender_id: word }).sort({timestamp: -1}).skip((page -1)*10).limit(10);
      console.log(searchUser)
      searchUserCount = await Transaction.find({sender_id: word}).count();  
      searchUserCount = parseInt(searchUserCount / 10) + 1;  
      console.log(searchUserCount);    
      res.json({ list: searchUser, count:searchUserCount, success: 1 });
       
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});
router.post("/search/tx", async (req, res) => {
  try {
    const word = req.body.word;
    const type = "user";    
    let searchTx;   
     
      searchTx = await Transaction.findOne({ tx_id: word });
      console.log(searchTx)    
      res.json({ list: searchTx, success: 1 });
      
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

router.post("/search/block/", async (req, res) => {
  try {
    const word = req.params; 
    let searchBlock;    
  
        searchBlock = await Block.findOne({ block_hash: word });
        console.log(searchBlock);
        res.json({ list: searchBlock, success: 1 });
      
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});

module.exports = router;
