"use strict";
const express = require("express");
const router = express.Router();
const {
  User,
  Talk,
  Talk_Comment,
  Talk_Comment_Like,
  Talk_Comment_Child,
  sequelize,
} = require("../models");


// Talk 댓글 등록
router.post("/add", async (req, res) => {
    try {
      const { user_email } = req.session.loginInfo;
      const { talk_id, comment } = req.body;
      await Talk_Comment.create({
        user_email,
        talk_id,
        comment,
      });
  
      const list = await Talk_Comment.findAll({
        attributes: [
          "id",
          "user_email",
          "comment",
          "createdAt",
          [
            sequelize.literal(
              "(SELECT COUNT(comment_id) FROM talk_comment_child WHERE comment_id = `Talk_Comment`.id)"
            ),
            "child_count",
          ],
        ],
        where: {
          talk_id: req.body.talk_id,
        },
        order: [["created_at", "DESC"]],
        include: [{ model: User, attributes: ["nickname", "user_profile"] }],
        limit: 10,
      });
  
      const total = await Talk_Comment.count({
        where: {
          talk_id: talk_id,
        },
      });
  
      let more = false;
      if (total > 10) more = true;
  
      res.json({ list: list, success: 1, total: total, more: more });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: 3 });
    }
  });

  
// Talk 댓글 삭제
router.post("/delete", async (req, res) => {
    const { talk_id, comment_id } = req.body;
  
    try {
      await Talk_Comment.destroy({
        where: {
          id: comment_id,
        },
      });
      await Talk_Comment_Child.destroy({
        where: {
          id: comment_id,
        },
      });
  
      const list = await Talk_Comment.findAll({
        attributes: [
          "id",
          "user_email",
          "comment",
          "createdAt",
          [
            sequelize.literal(
              "(SELECT COUNT(comment_id) FROM comment_child WHERE comment_id = `Talk_Comment`.id)"
            ),
            "child_count",
          ],
        ],
        where: {
          talk_id,
        },
        order: [["created_at", "DESC"]],
        include: [{ model: User, attributes: ["nickname", "user_profile"] }],
        limit: 10,
      });
  
      const total = await Talk_Comment.count({
        where: {
          talk_id: talk_id,
        },
      });
  
      let more = false;
      if (total > 10) more = true;
  
      res.json({ list: list, success: 1, total: total, more: more });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

  // Talk 댓글 목록 조회
router.get("/list/:id/:page", async (req, res) => {
    try {
      let talk_id = req.params.id;
      let page = req.params.page;
      let offset = 0;
      
      // 10개씩 조회
      if (page > 1) {
        offset = 10 * (page - 1);
      }
      const list = await Talk_Comment.findAll({
        attributes: [
          "id",
          "user_email",
          "comment",
          "createdAt",
          [
            sequelize.literal(
              "(SELECT COUNT(comment_id) FROM talk_comment_child WHERE comment_id = `Talk_Comment`.id)"
            ),
            "child_count",
          ],
        ],
        include: [
          { model: User, attributes: ["nickname", "user_profile"] },
          { model: Talk_Comment_Like, attributes: ["like"] },
        ],
  
        where: {
          talk_id: talk_id,
        },
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
      });


      const total = await Talk_Comment.count({
        where: {
          talk_id: talk_id,
        },
      });
  
      let more = false;
      if (total > offset + 10) more = true;

      res.json({ list: list, success: 1, more: more, total: total });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: 3 });
    }
  });

// Talk 대댓글 작성
router.post("/child/add", async (req, res) => {
    try {
      const user_email = req.session.loginInfo.user_email;
      // const user_email = "moonnr94@gmail.com";
      const { comment_id, comment, talk_id } = req.body;
      await Talk_Comment_Child.create({
        user_email: user_email,
        comment_id: comment_id,
        comment: comment,
      });
      const list = await Talk_Comment.findAll({
        attributes: [
          "id",
          "user_email",
          "comment",
          "createdAt",
          [
            sequelize.literal(
              "(SELECT COUNT(comment_id) FROM talk_comment_child WHERE comment_id = `Talk_Comment`.id)"
            ),
            "child_count",
          ],
        ],
        include: [{ model: User, attributes: ["nickname", "user_profile"] }],
        where: {
          talk_id,
        },
        order: [["created_at", "DESC"]],
        limit: 10,
      });
  
      const total = await Talk_Comment.count({
        where: {
          talk_id: talk_id,
        },
      });
  
      let more = false;
      if (total > 10) more = true;
      res.json({ list: list, success: 1, more: more, total: total });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: 3 });
    }
  });
  
  // Talk 대댓글 목록 조회
  router.get("/childList/:comment_id", async (req, res) => {
    try {
      const comment_id = req.params.comment_id;
      const list = await Talk_Comment_Child.findAll({
        where: {
          comment_id: comment_id,
        },
        order: [["created_at", "DESC"]],
        include: [{ model: User, attributes: ["nickname", "user_profile"] }],
      });
      res.json({ list: list, success: 1 });
    } catch (error) {
      res.status(400).json({ success: 3 });
    }
  });

module.exports = router;
