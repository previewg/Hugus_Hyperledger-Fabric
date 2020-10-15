"use strict";
const express = require("express");
const router = express.Router();
const { Act,User } = require("../models");


// Act 등록
router.post("/add", async (req, res) => {
    try {
    //   const { user_email } = req.session.loginInfo;
      const user_email = "moonnr94@gmail.com";
      const { act_title, act_content } = req.body;
      const act = await Act.create({
        act_title,
        act_content,
        user_email,
      });
    //   for (const file of req.files) {
    //     await Story_File.create({
    //       act_id: story.dataValues.id,
    //       file: file.filename,
    //     });
    //   }

      res.json({ act: act, success: 1 });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: 3 });
    }
  });


  
// Act 목록 조회
router.get("/list/:page", async (req, res) => {
    try {
      let page = req.params.page;
      let offset = 0;
  
      // 9개씩 조회
      if (page > 1) {
        offset = 9 * (page - 1);
      }
      console.log(page);
      console.log(offset);
      const list = await Act.findAll({
        attributes: [
          "act_title",
          "id",
          "act_content",
          "user_email",
          "visited",
          "created_at",
        ],
        // include : [
            
        // ],
        offset: offset,
        limit: 9,
      });
      res.json({ list: list, success: 1 });
    } catch (error) {
      res.status(400).json({ success: 3 });
    }
  });
  
// Act 조회수 추가
router.put("/visit", async (req, res) => {
    try {
      const { act_id } = req.body;
      await Act.increment(
        {
          visited: 1,
        },
        {
          where: {
            id: act_id,
          },
        }
      );
      res.json({ success: 1 });
    } catch (error) {
      res.status(400).json({ success: 3 });
    }
  });










module.exports = router;