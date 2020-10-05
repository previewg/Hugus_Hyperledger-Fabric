"use strict";
const express = require("express");
const router = express.Router();
const {
  Story,
  Story_File,
  Hashtag,
  Story_Hashtag,
  Item,
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

    const items = req.body.items.split(",");
    for (const item of items) {
      const result = await Item.findOrCreate({
        where: { item: item },
      });

      await Story_Item.findOrCreate({
        where: {
          story_id: story.dataValues.id,
          item_id: result[0].dataValues.id,
        },
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
    let id = req.params.id;
    console.log(id)
    const data = await Story.findOne({
      where: { id: id },
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Item, attributes: ["item"] },
        { model: User, attributes: ["nickname"] },
        { model: Story_Comment, attributes: ["comment", "user_email"] },
      ],
    });

    res.json({ data: data, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 조회수
router.put("/visit",async (req,res)=>{
  try{
    let id = req.body.story_id;
    const visited = await Story.findOne({
      attributes:["visited"],
      where:{id:id}
    })
    await Story.update({
      visited: visited.dataValues.visited+1},{
    where:{id:id},
    })
    res.json({  success: 1 });
  }catch (error){
    res.status(400).json({ success: 3 });
  }
})

module.exports = router;
