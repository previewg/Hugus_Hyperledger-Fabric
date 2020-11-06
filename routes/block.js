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

    res.json({
      success: 1,
      blockList: blockList,
      blockHeight: blockHeight,
      txList: txList,
      txHeight: txHeight,
    });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});
router.get("/list/:page", async (req, res) => {
  try {
    const page = req.params.page;
    let list;
    let count;

    await Block.find({}, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      list = data;
    })
      .sort({ timestamp: -1 })
      .skip((page - 1) * 10)
      .limit(10);

    await Block.find({}, (err, data) => {
      if (err) console.log(err);
      console.log(data);

      count = data;
    }).count();

    count = parseInt(count / 10) + 1;
    console.log(count);

    res.json({ list: list, count: count, success: 1 });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});
router.post("/search/:type", async (req, res) => {
  try {
    const word = req.body.word;
    const type = "user";
    let searchUser;
    let searchTx;
    let searchBlock;    
    let searchUserCount;
    let page;


    if (type === "user") {
      searchUser = await Transaction.find({ sender_id: word }).sort({timestamp: -1}).skip((page -1)*10).limit(10);
      console.log(searchUser)
      searchUserCount = await Transaction.find({sender_id: word}).count();  
      searchUserCount = parseInt(searchUserCount / 10) + 1;  
      console.log(searchUserCount);    
      res.json({ list: searchUser, count:searchUserCount, success: 1 });
     }if(type === "tx"){
      searchTx = await Transaction.findOne({ tx_id: word });
      console.log(searchTx)    
      res.json({ list: searchTx, success: 1 });
      }if (type === "block") {
        searchBlock = await Block.findOne({ block_hash: word });
        console.log(searchBlock);
        res.json({ list: searchBlock, success: 1 });
      }
      if (!type) res.status(400).json({ success: 3 });
      
    
   
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});
module.exports = router;
