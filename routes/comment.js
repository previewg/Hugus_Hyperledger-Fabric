"use strict";
const express = require("express");
const router = express.Router();
const {
    Story,
    User,
    Story_Comment,
    Comment_Child,
  } = require("../models");
  const { Sequelize, DataTypes } = require('sequelize');
const comment_child = require("../models/comment_child");

router.post('/add', async (req,res) => {
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

// 댓글 취소
router.post("/delete", async (req, res) => {
  const story_id = req.body.story_id;
  const comment_id = req.body.comment_id;
    console.log(req.body);

    try {
      await Story_Comment.destroy({
         where: { 
           id : comment_id
          },
        })
        const list = await Story_Comment.findAll({
          where : {
            story_id : story_id
          },
          order: [
            [ "created_at","DESC" ]
          ],
          include: [
            { model: User, attributes: ["nickname"] },
          ],
        });
        res.json({ list: list , success: 1 });
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
      include: [
        { model: User, attributes: ["nickname"] },
      ],  
    });
    res.json({ list: list , success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});


//대댓글 작성
router.post('/child_add', async (req,res) => {
  console.log(req.body);
  try {
  const user_email = req.session.loginInfo.user_email;
  await Comment_Child.create({
  user_email: user_email,
  comment_id: req.body.comment_id,  
  comment: req.body.comment,
  });
  // const list = await Comment_Child.findAll({
  //   where : {
  //     Comment_id : req.body.comment_id
  //   },
  //   order: [
  //     [ "created_at","DESC" ]
  //   ],
  //   include: [
  //     { model: User, attributes: ["nickname"] },
  //     { model: Comment_Child, attributes: ["comment"]},
  //   ],
  // });
  // res.json({ list: list, success: 1 });
  } catch (error) {
      console.error(error);
      res.status(400).json({ success: 3 });
  }
});

module.exports = router;