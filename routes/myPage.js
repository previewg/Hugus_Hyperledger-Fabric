"use strict";
const {
    Story,
} = require("../models");

const express = require("express");
const router = express.Router();

router.post("/myWriting", async (req, res) => {
    try {
        const email = req.body.email
        const writingList = await Story.findAll({
            where:{user_email:email},
            attributes: [
                "story_title",
                "user_email",
                "story_vote",
            ]
        })
      console.log(writingList)

        res.json({list: writingList, success: 1});

    } catch (error) {
        res.status(400).json({success: 3})
    }


})


module.exports = router;
