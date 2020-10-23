"use strict";

const express = require("express");
const router = express.Router();
const Block = require("../models/block")

router.post("/Info", async (req, res) => {
    try {
        Block.find({},
            (err, data) => {
                if (err) console.log(err);
                else
                res.json({data: data, success: 1})
            })
            .sort({timestamp: -1}).limit(10);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;