"use strict";
const express = require("express");
const router = express.Router();
const {
    Story,
    Story_File,
    User,
    Story_Comment,
  } = require("../models");

router.post('/add', async (req,res) => {
    console.log(req.body);
    try {
    const user_email = req.session.loginInfo.user_email;
    // const user_email = "moonnr94@gmail.com"
    await Story_Comment.create({
    user_email: user_email,
    story_id: req.body.story_id,  
    comments: req.body.comment,
    });
    res.json({ success: 1 });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: 3 });
    }
});

module.exports = router;