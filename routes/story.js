"use strict";
const express = require("express");
const router = express.Router();
const {
  Story,
  Story_File,
  Hashtag,
  Story_Hashtag,
  Story_Item,
  User,
  Story_Comment,
  Story_Like,
} = require("../models");

// multer 설정
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
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
      story_goal: req.body.goal,
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
      const result = await Hashtag.findOrCreate({
        where: { hashtag: hashtag },
      });

      await Story_Hashtag.findOrCreate({
        where: {
          story_id: story.dataValues.id,
          hashtag_id: result[0].dataValues.id,
        },
      });
    }

    const items = JSON.parse(req.body.items);
    for (const item of items) {
      console.log(item);
      await Story_Item.create({
        story_id: story.dataValues.id,
        item_name: item.item_name,
        item_price: item.item_price,
        item_quantity: item.item_quantity,
      });
    }
    res.json({ success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
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

// 스토리 수정
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

// 스토리 목록 조회
router.get("/list/:section", async (req, res) => {
  try {
    let section = req.params.section;
    let offset = 0;

    if (section > 1) {
      offset = 18 * (section - 1);
    }
    const list = await Story.findAll({
      attributes: ["story_title", "id"],
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Story_File, attributes: ["file"], limit: 1 },
      ],
      offset: offset,
      limit: section * 18 - 1,
    });

    res.json({ list: list, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const story_id = req.params.id;
    let user_email;
    if (req.session.loginInfo) user_email = req.session.loginInfo.user_email;
    else user_email = null;

    const data = await Story.findOne({
      where: { id: story_id },
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Story_Item },
        { model: User, attributes: ["nickname"] },
      ],
    });

    const likeNum = await Story_Like.count({
      where: { story_id: story_id, like: true },
    });
    if (user_email) {
      const like = await Story_Like.findOne({
        where: { story_id: story_id, user_email: user_email, like: true },
      });

      res.json({
        data: data,
        like: like ? true : false,
        likeNum: likeNum,
        success: 1,
      });
    } else {
      res.json({
        data: data,
        like: false,
        likeNum: likeNum,
        success: 1,
      });
    }
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 조회수
router.put("/visit", async (req, res) => {
  try {
    const id = req.body.story_id;
    const visited = await Story.findOne({
      attributes: ["visited"],
      where: { id: id },
    });
    await Story.update(
      {
        visited: visited.dataValues.visited + 1,
      },
      {
        where: { id: id },
      }
    );
    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 좋아요
router.put("/like", async (req, res) => {
  try {
    const story_id = req.body.story_id;
    const status = req.body.status;
    const user_email = req.session.loginInfo.user_email;

    const history = await Story_Like.findOne({
      where: { story_id: story_id, user_email: user_email },
    });

    if (history) {
      await Story_Like.update(
        {
          like: !status,
        },
        {
          where: { story_id: story_id, user_email: user_email },
        }
      );
    } else {
      await Story_Like.create({
        story_id: story_id,
        user_email: user_email,
        like: !status,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
