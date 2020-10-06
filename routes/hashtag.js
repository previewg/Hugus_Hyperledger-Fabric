"use strict";
const express = require("express");
const router = express.Router();
const { Hashtag, Story_Hashtag } = require("../models");

router.get("/all", async (req, res) => {
  try {
    const alltags = await Hashtag.findAll({ attributes: ["hashtag"] });
    res.json({ success: 1, list: alltags });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
