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
router.get("/list/:page", async (req, res) => {
  try {
    const page = req.params.page
    let list;
    let count;

    await Block.find({}, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      list=data;
    })
    .sort({ timestamp: -1 })
    .skip((page-1)*10)
    .limit(10)

    await Block.find({}, (err, data) => {
      if (err) console.log(err);
      console.log(data);

      count=data;
    })
    .count()

    count=parseInt(count/10)+1
    console.log(count);
     
    res.json({ list: list,count:count, success: 1 });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});
router.post("/search", async (req, res) => {
  try {
    console.log("dddd");
    // const page = req.params.page
    const word = req.body.word
    console.log(word);
    let list;
    // let count;

    await Block.find({"tx_id":word}, (err, data) => {
      if (err) console.log(err);
      list=data;
      if(list === 0) res.status(400).json({ success: 3 });
    })
    .sort({ timestamp: -1 })
    // .skip((page-1)*10)
    // .limit(10)
    console.log(list)

    // await Block.findone({word}, (err, data) => {
    //   if (err) console.log(err);
    //   console.log(data);

    //   count=data;
    // })
    // .count()

    // count=parseInt(count/10)+1
    // console.log(count);
     
    res.json({ list: list, success: 1 });
  } catch (err) {
    res.status(400).json({ success: 3 });
    console.log(err);
  }
});
module.exports = router;
