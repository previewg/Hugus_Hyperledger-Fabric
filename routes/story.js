"use strict";

const express = require("express");
const router = express.Router();
const { Story, Story_File } = require("../models");

// multer 설정
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, file.originalname + "_" + Date.now()),
  }),
});

// 스토리 등록
router.post("/add", upload.array("files"), async (req, res) => {
  try {
    let store = req.sessionStore;
    console.log(store);
    Story.create({
      story_title: req.body.title,
      user_info: req.body.info,
      story_content: req.body.content,
      story_goal: 100,
      user_email: "moonnr94@gmail.com",
    });

    for (const file of req.files) {
      Story_File.create({
        story_id: 1,
        file: file.filename,
      });
    }
    res.json({ success: 1 });
  } catch (error) {
    console.log(error);
  }
});

// 스토리 삭제
router.delete("/delete", async (req, res) => {
  try {
    await Story.destroy({ where: { id: req.body.id } });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.put("/update", async (req, res) => {
  try {
    await Story.update(
      {
        story_title: req.body.title,
        user_info: req.body.user_info,
        story_content: req.body.content,
        story_hashtag: req.body.hashtag,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
