"use strict";
const express = require("express");
const router = express.Router();
const {
    Story,
    Story_File,
    User,
    Story_Comment,
  } = require("../models");

router.post('/add', async (req,res) => {
    console.log(req.body);
    try {
    const user_email = req.session.loginInfo.user_email;
    await Story_Comment.create({
    user_email: user_email,
    story_id: req.body.story_id,  
    comment: req.body.comment,
    });

    const list = await Story_Comment.findAll({
      where : {
        story_id : req.body.story_id
      },
      order: [
        [ "created_at","DESC" ]
      ],
      attributes: ["comment"],
      include: [
        { model: User, attributes: ["nickname"] },
      ],

    });

    res.json({ list: list, success: 1 });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: 3 });
    }
});


router.delete("/delete", async (req, res) => {
    const id = req.body;
    try {
      await Story_Comment.destroy({
         where: { 
           id: id
          } 
        })
        .then ((result) => {
          res.json({ message: true }
          );
        })
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

  // 댓글 목록 조회
router.get("/list/:story_id", async (req, res) => {
  try {
    let story_id = req.params.story_id;

    const list = await Story_Comment.findAll({
      where : {
        story_id : story_id
      },
      order: [
        [ "created_at","DESC" ]
      ],
      attributes: ["comment"],
      include: [
        { model: User, attributes: ["nickname"] },
      ],
    });

    res.json({ list: list, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;