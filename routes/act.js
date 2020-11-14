"use strict";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
const axios = require("axios");

const { Act, User, Campaign, Act_File, Sequelize } = require("../models");
const Transaction = require("../models/block/transaction");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "hugusact",
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

let upload_memory = multer({ storage: multer.memoryStorage() });

// Act 등록
router.post("/add", upload.array("files"), async (req, res) => {
  try {
    const { act_title, act_content, campaign_title } = req.body;
    const campaign = await Campaign.findOne({
      where: { campaign_title },
    });
    const campaign_id = campaign.getDataValue("id");

    const list = await Act.create({
      act_title,
      act_content,
      campaign_id: campaign_id,
    });
    const act_id = list.getDataValue("id");
    for (const file of req.files) {
      await Act_File.create({
        act_id: act_id,
        file: file.location,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// Act 등록 (이미지 변환 - 패브릭 통신)
router.post("/add/buffer", upload_memory.array("files"), async (req, res) => {
  try {
    const { act_content, campaign_title } = req.body;
    const campaign = await Campaign.findOne({ where: { campaign_title } });
    const hash = campaign.getDataValue("hash");
    console.log(hash);

    const campaignData = await Transaction.aggregate([
      { $match: { receiver_id: `${hash}` } },
      { $group: { _id: `${hash}`, value: { $sum: "$value" } } },
    ]);

    let value = 0;
    if (campaignData.length !== 0) {
      value = campaignData[0].value;
    }

    let base64data = await req.files[1].buffer.toString("base64");
    await axios.post(`${process.env.FABRIC_URL}/campaign/donate`, {
      data: base64data,
      senderId: hash,
      receiverId: "admin",
      content: act_content,
      value: value,
    });
    res.json({ success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// Act 수정
router.post("/update", upload.array("files"), async (req, res) => {
  try {
    const { act_id, act_title, act_content, campaign_title } = req.body;
    const campaign = await Campaign.findOne({
      where: { campaign_title },
    });
    const campaign_id = campaign.getDataValue("id");

    await Act.update({
      act_title,
      act_content,
      campaign_id: campaign_id,
      where: { id: act_id },
    });

    const files = await Act_File.findAll({
      where: { act_id: act_id },
      attributes: ["file"],
    });

    if (files.length !== 0) {
      let params = {
        Bucket: "hugusact",
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

      await Act_File.destroy({
        where: { act_id: act_id },
      });
    }

    for (const file of req.files) {
      await Act_File.create({
        act_id: act_id,
        file: file.location,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// Act 수정 (이미지 변환 - 패브릭 통신)
router.post(
  "/update/buffer",
  upload_memory.array("files"),
  async (req, res) => {
    try {
      const { act_content, campaign_title } = req.body;
      const campaign = await Campaign.findOne({ where: { campaign_title } });
      const hash = campaign.getDataValue("hash");

      const campaignData = await Transaction.aggregate([
        { $match: { receiver_id: `${hash}` } },
        { $group: { _id: `${hash}`, value: { $sum: "$value" } } },
      ]);

      let value = 0;
      if (campaignData.length !== 0) {
        value = campaignData[0].value;
      }

      let base64data = await req.files[1].buffer.toString("base64");
      await axios.post(`${process.env.FABRIC_URL}/campaign/donate`, {
        data: base64data,
        senderId: hash,
        receiverId: "admin",
        content: act_content,
        value: value,
      });
      res.json({ success: 1 });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: 3 });
    }
  }
);

// Act 삭제
router.post("/delete", async (req, res) => {
  try {
    const { act_id } = req.body;
    const files = await Act_File.findAll({
      where: { act_id: act_id },
      attributes: ["file"],
    });

    if (files.length !== 0) {
      let params = {
        Bucket: "hugusact",
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

      await Act_File.destroy({
        where: { act_id: act_id },
      });
    }

    await Act.destroy({ where: { id: act_id } });
    res.json({ success: 1 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: 3 });
  }
});

// Act 목록 조회
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
    if (keyword) {
      list = await Act.findAll({
        attributes: ["act_title", "id", "act_content", "visited", "created_at"],
        include: [{ model: Act_File, attributes: ["file"], limit: 1 }],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        where: {
          act_title: {
            [Sequelize.Op.like]: "%" + keyword + "%",
          },
        },
      });
    } else {
      list = await Act.findAll({
        attributes: ["act_title", "id", "act_content", "visited", "created_at"],
        include: [{ model: Act_File, attributes: ["file"], limit: 1 }],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
      });
    }

    let total = await Act.count({});

    let more = false;
    if (total > page * 10) more = true;

    res.json({ list: list, success: 1, more: more });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// ACT 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const act_id = req.params.id;
    let user_email;
    if (req.session.loginInfo) user_email = req.session.loginInfo.user_email;
    else user_email = null;

    const data = await Act.findOne({
      where: { id: act_id },
      include: [{ model: Act_File, attributes: ["file"] }],
    });
    res.json({ data: data, success: 1 });
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
