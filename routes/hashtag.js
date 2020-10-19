"use strict";
const express = require("express");
const router = express.Router();
const { Hashtag, Story_Hashtag, Story } = require("../models");

// 해시태그 목록 조회
router.get("/all", async (req, res) => {
  try {
    const hashtags = await Hashtag.findAll({ attributes: ["hashtag"] });
    res.json({ success: 1, list: hashtags });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// 해당 해시태그 게시물 조회
router.post("/list", async (req, res) => {
  try {
    const { hashtag } = req.body;
    const hashtag_id = await Hashtag.findOne({
      attributes: ["id"],
      where: { hashtag: hashtag },
    });
    console.log(hashtag_id);
    const list = await Story_Hashtag.findAll({
      where: { hashtag_id: 7 },
      include: [{ model: Story }],
    });

    res.json({ success: 1, list: list });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
