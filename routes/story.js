'use strict';

const express = require('express');
const router = express.Router();
const { Story } = require('../models');
const upload = require('../app');

router.get('/',  (req, res, next) => {
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

router.post("/add", upload.array('file'),async (req, res) => {
    try{
      console.log(req);
      res.json({success:1})
      
      Story.create({
        story_title:req.body.title,
        user_info:req.body.info,
        story_content: req.body.content,
        story_items: req.body.items,
        story_hashtags: req.body.hashtags,
        story_goal:100,
        user_email:'moonnr94@gmail.com'
      });
    }catch (error){
      console.log(error)
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
