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
    await Story_Comment.create({
    user_email: user_email,
    story_id: req.body.story_id,  
    comment: req.body.comment,
    });
    res.json({ success: 1 });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: 3 });
    }
});

router.delete("/delete", async (req, res) => {
    try {
      await Story_Comment.destroy({ where: { id: req.body.id } });
      res.json({ message: true });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });


module.exports = router;