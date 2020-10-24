"use strict";
const express = require("express");
const router = express.Router();
const { Talk, User, Talk_File, Sequelize } = require("../models");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");
// const path = require("path");

// let s3 = new AWS.S3();

// let upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "hugustalk",
//     key: function (req, file, cb) {
//       let extension = path.extname(file.originalname);
//       cb(
//         null,
//         file.originalname.split(".")[0] + Date.now().toString() + extension
//       );
//     },
//     acl: "public-read-write",
//   }),
// });


// Talk 등록
router.post("/add", async (req, res) => {
    try {
      // const { user_email } = req.session.loginInfo;
      const user_email = "moonnr94@gmail.com";
      const { talk_title, talk_content } = req.body;
      const list = await Talk.create({
        talk_title,
        talk_content,
        user_email: user_email,
      });
  
      // const act_id = list.getDataValue("id");
      // for (const file of req.files) {
      //   await Act_File.create({
      //     act_id: act_id,
      //     file: file.location,
      //   });
      // }
  
      res.json({ list: list, success: 1 });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: 3 });
    }
  });
  
// Talk 목록 조회
router.get("/list/:page", async (req, res) => {
    try {
      let page = req.params.page;
      let keyword = req.query.keyword;
      let offset = 0;
      // 10개씩 조회
      if (page > 1) {
        offset = 10 * (page - 1);
      }
  
      let list;
      if (keyword){
        list = await Talk.findAll({
          attributes: [
            "talk_title",
            "id",
            "talk_content",
            "user_email",
            "visited",
            "created_at",
          ],
          order: [["created_at", "DESC"]],
          offset: offset,
          limit: 10,
          where:{talk_title:{
            [Sequelize.Op.like]: "%" + keyword + "%"
        }}
        });
      }else{
        list = await Talk.findAll({
          attributes: [
            "talk_title",
            "id",
            "talk_content",
            "user_email",
            "visited",
            "created_at",
          ],
          order: [["created_at", "DESC"]],
          offset: offset,
          limit: 10,
        });
      }
  
      let count = await Talk.count({});
      count = Math.ceil(count / 10);
      res.json({ list: list, count: count, success: 1 });
    } catch (error) {
      res.status(400).json({ success: 3 });
    }
  });

// Talk 상세 조회
router.get("/:id", async (req, res) => {
    try {
      const talk_id = req.params.id;
      let user_email;
      if (req.session.loginInfo) user_email = req.session.loginInfo.user_email;
      else user_email = null;
  
      const data = await Talk.findOne({
        where: { id: talk_id },
        include: [{ model: Talk_File, attributes: ["file"] }],
      });
      res.json({ data: data, success: 1 });
    } catch (error) {
      res.status(400).json({ success: 3 });
    }
  });

// Act 조회수 추가
router.put("/visit", async (req, res) => {
    try {
      const { talk_id } = req.body;
      await Talk.increment(
        {
          visited: 1,
        },
        {
          where: {
            id: talk_id,
          },
        }
      );
      res.json({ success: 1 });
    } catch (error) {
      res.status(400).json({ success: 3 });
    }
  });


module.exports = router;