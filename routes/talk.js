"use strict";
const express = require("express");
const router = express.Router();
const { Talk, User, Talk_File, Sequelize } = require("../models");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "hugustalk",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(
        null,
        file.originalname.split(".")[0] + Date.now().toString() + extension
      );
    },
    acl: "public-read-write",
  }),
});


// Talk 등록
router.post("/add", upload.array("files"), async (req, res) => {
    try {
      const { user_email } = req.session.loginInfo;
      // const user_email = "moonnr94@gmail.com";
      const { talk_title, talk_content } = req.body;
      const list = await Talk.create({
        talk_title,
        talk_content,
        user_email: user_email,
      });
  
      const talk_id = list.getDataValue("id");
      for (const file of req.files) {
        await Talk_File.create({
          talk_id: talk_id,
          file: file.location,
        });
      }
  
      res.json({ list: list, success: 1 });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: 3 });
    }
  });


  // talk 삭제
  router.post("/delete", async (req, res) => {
    try {
      const { talk_id } = req.body;
        const files = await Talk_File.findAll({
          where: { talk_id},
          attributes: ["file"],
        });
      if (files.length !== 0) {
        let params = {
          Bucket: "hugustalk",
          Delete: {
            Objects: [],
          },
        };
    
        for (const file of files) {
          const key = file.file.split("/");
          params.Delete.Objects.push({ Key: decodeURI(key[3]) });
        }
    
        await s3.deleteObjects(params, (err) => {
          if (err) {
            throw err;
          }
        });
      }
      await Talk.destroy({ where: { id:talk_id } });
      res.json({ success: 1 });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: 3 });
    }
  });
  
  // talk 수정
  router.post("/update", upload.array("files"), async (req, res) => {
    try {
      const {
        talk_title,
        talk_content,
        id,
      } = req.body;
  
      for (const file of req.files) {
        await Talk_File.create({
          talk_id: talk.dataValues.id,
          file: file.filename,
        });
      }
  
      await Story.update(
        {
          talk_title,
          user_info,
          talk_content,
        },
        {
          where: { id },
        }
      );
  
      // // 프론트에서 사진 유지한다는 값을 던져줘야함 -> 처리하기
      // await Talk_File.destroy({
      //   where: { talk_id: id },
      // });
      // for (const file of req.files) {
      //   await Talk_File.create({
      //     talk_id: id,
      //     file: file.filename,
      //   });
      // }
  
      res.json({ success: 1 });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
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