"use strict";
const { Story, User } = require("../models");

const express = require("express");
const router = express.Router();

router.post("/myWriting", async (req, res) => {
  try {
    const { username } = req.body;
    const user_email = await User.findOne({ where: { nickname: username } });

    const writingList = await Story.findAll({
      where: { user_email: user_email.dataValues.email },
      attributes: ["story_title", "story_vote"],
    });

    res.json({ list: writingList, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
