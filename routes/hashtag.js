"use strict";
const express = require("express");
const router = express.Router();
const { Hashtag, Story_Hashtag } = require("../models");

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

module.exports = router;
