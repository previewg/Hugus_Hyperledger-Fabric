'use strict';

const express = require('express');
const router = express.Router();
const { Story } = require('../models');


router.get('/', function (req, res, next) {
  Story.findAll({})
    .then((result) =>
      console.log(result))
});

// router.post("/getStoryList", async (req, res) => {
//   try {
//     const id = req.body.id;
//     await Story.findAll({
//       sort: { createdAt: -1 }
//     })
//     .then((res) => {
//       res.json({ list: Story })
//     })
//   } catch (err) {
//     console.log(err);
//     res.json({ message: false });
//   }
// });

router.post("/add", async (req, res) => {
  try {
    console.log(req)
    let obj;
    obj = {
      story_title: req.body.title,
      user_info: req.body.user_info,
      story_content: req.body.content,
      story_hashtag: req.body.hashtag
    };
    const story = new Story(obj);

    await story.save();
    res.json({ message: "스토리가 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await Story.destroy({where:{ id:req.body.id }});
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.put("/update", async (req, res) => {
  try {
    
    await Story.update({
      story_title: req.body.title,
      user_info: req.body.user_info,
      story_content: req.body.content,
      story_hashtag: req.body.hashtag
    },
    {where: { id: req.body.id }
});
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});



module.exports = router;
