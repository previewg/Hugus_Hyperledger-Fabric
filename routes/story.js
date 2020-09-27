"use strict";
const express = require("express");
const router = express.Router();
const { Story, Story_File, Hashtag, Story_Hashtag } = require("../models");

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
    const user_email = req.session.loginInfo.user_email;
    const story = await Story.create({
      story_title: req.body.title,
      user_info: req.body.info,
      story_content: req.body.content,
      story_goal: 100,
      user_email: user_email,
    });

    for (const file of req.files) {
      await Story_File.create({
        story_id: story.dataValues.id,
        file: file.filename,
      });
    }

    const hashtags = req.body.hashtags.split(",");
    for (const hashtag of hashtags) {
      const tag = await Hashtag.findOrCreate({
        where: { hashtag: hashtag },
      });

      console.log(tag[0]);
      await Story_Hashtag.findOrCreate({
        where: {
          story_id: story.dataValues.id,
          hashtag_id: tag[0].dataValues.id,
        },
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    console.error(error);
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
