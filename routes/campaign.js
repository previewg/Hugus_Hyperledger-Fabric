"use strict";
const express = require("express");
const router = express.Router();
const {
  Campaign,
  Campaign_File,
  Campaign_Like,
  Campaign_Hashtag,
  Hashtag,
  Story,
  User,
  sequelize,
} = require("../models");
const Transaction = require("../models/block/transaction");
const crypto = require("crypto");
const axios = require("axios");

const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "huguscampaign",
    key: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(
        null,
        file.originalname.split(".")[0] + Date.now().toString() + extension
      );
    },
    acl: "public-read-write",
  }),
});

// 특수문자 제거
const regExp = (str) => {
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  if (reg.test(str)) {
    return str.replace(reg, "");
  } else {
    return str;
  }
};

// 캠페인 등록
router.post("/add", upload.array("files"), async (req, res) => {
  try {
    const { user_email } = req.session.loginInfo;
    if (user_email !== "admin@admin") res.status(400).json({ success: 3 });
    const { campaign_title, story_title } = req.body;

    const story = await Story.findOne({
      where: { story_title },
    });

    const email = story.getDataValue("user_email");
    const story_id = story.getDataValue("id");
    const campaign_goal = story.getDataValue("story_goal");

    const campaign = await Campaign.create({
      campaign_title: campaign_title,
      user_email: email,
      campaign_goal: campaign_goal,
      story_id: story_id,
    });

    const campaign_id = campaign.getDataValue("id");

    for (const file of req.files) {
      let fileName = null;
      if (file.location !== null) fileName = file.location;
      await Campaign_File.create({
        campaign_id: campaign_id,
        file: fileName,
      });
    }

    const hashtags = req.body.hashtags.split(",");
    for (const hashtag of hashtags) {
      const result = await Hashtag.findOrCreate({
        where: { hashtag: hashtag },
      });

      await Campaign_Hashtag.create({
        campaign_id: campaign_id,
        hashtag_id: result[0].getDataValue("id"),
      });
    }

    await crypto.randomBytes(8, (err, buf) => {
      crypto.pbkdf2(
        email + campaign_id,
        buf.toString("base64"),
        100000,
        8,
        "sha512",
        async (err, key) => {
          let hashedCampaign = key.toString("base64");
          hashedCampaign = regExp(hashedCampaign);
          await axios.post(`${process.env.FABRIC_URL}/auth/enroll/user`, {
            user_id: hashedCampaign,
          });
          await Campaign.update(
            {
              hash: hashedCampaign,
            },
            { where: { id: campaign_id } }
          );
        }
      );
    });

    res.json({ success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 삭제
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const files = await Campaign_File.findAll({
      where: { campaign_id: id },
      attributes: ["file"],
    });

    if (files.length !== 0) {
      let params = {
        Bucket: "huguscampaign",
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

      await Campaign_File.destroy({
        where: { campaign_id: id },
      });
    }

    const hashtags = await Campaign_Hashtag.findAll({
      attributes: [
        "hashtag_id",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_hashtag WHERE hashtag_id = `Campaign_Hashtag`.hashtag_id)"
          ),
          "count",
        ],
      ],
      where: { campaign_id: id },
    });

    for (const hashtag of hashtags) {
      const unique = hashtag.getDataValue("count") === 1 ? true : false;
      if (unique) {
        await Hashtag.destroy({
          where: { id: hashtag.getDataValue("hashtag_id") },
        });
      }
    }

    const campaign = await Campaign.findOne({ where: { id } });
    await axios.post(`${process.env.FABRIC_URL}/auth/delete`, {
      user_id: campaign.getDataValue("hash"),
    });

    await Campaign.destroy({ where: { id } });

    res.json({ success: 1 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 리스트 조회 ( 메인 슬라이더용  - 도달 임박순 )
router.get("/init", async (req, res) => {
  try {
    const campaignData = await Transaction.aggregate([
      { $group: { _id: "$receiver_id", value: { $sum: "$value" } } },
    ]);

    for (const campaign of campaignData) {
      await Campaign.update(
        {
          campaign_value: campaign.value,
        },
        { where: { hash: campaign._id } }
      );
    }

    const list = await Campaign.findAll({
      attributes: [
        "id",
        "campaign_title",
        "campaign_goal",
        "hash",
        "user_email",
        "visited",
        "createdAt",
        "campaign_value",
        [
          sequelize.literal(
            "(SELECT (campaign_value)/(campaign_goal) FROM campaign WHERE id = `Campaign`.id)"
          ),
          "campaign_ratio",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_like WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_like",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_comment WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_comment",
        ],
      ],
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Campaign_File, attributes: ["file"] },
      ],
      order: [
        [sequelize.cast(sequelize.col("campaign_ratio"), "FLOAT"), "DESC"],
      ],
      where: { expired: false },
      limit: 10,
    });
    res.json({ list: list, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 목록 조회
router.get("/list/:page", async (req, res) => {
  try {
    let offset = 0;
    const page = req.params.page;
    // 9개씩 조회
    if (page > 1) {
      offset = 9 * (page - 1);
    }

    const campaignData = await Transaction.aggregate([
      { $group: { _id: "$receiver_id", value: { $sum: "$value" } } },
    ]);

    for (const campaign of campaignData) {
      await Campaign.update(
        {
          campaign_value: campaign.value,
        },
        { where: { hash: campaign._id } }
      );
    }

    const list = await Campaign.findAll({
      attributes: [
        "id",
        "campaign_title",
        "campaign_goal",
        "hash",
        "user_email",
        "visited",
        "createdAt",
        "campaign_value",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_like WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_like",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_comment WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_comment",
        ],
      ],
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Campaign_File, attributes: ["file"] },
      ],
      offset: offset,
      limit: 9,
      where: { expired: false },
      order: [["created_at", "DESC"]],
    });
    const total = await Campaign.count({});
    let more = false;
    if (total > page * 10) more = true;
    res.json({ list: list, success: 1, more: more });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const campaign_id = req.params.id;
    let user_email = null;
    if (req.session.loginInfo) user_email = req.session.loginInfo.user_email;

    const campaign = await Campaign.findOne({ where: { id: campaign_id } });
    const hash = campaign.getDataValue("hash");

    const campaignData = await Transaction.aggregate([
      { $match: { receiver_id: `${hash}` } },
      { $group: { _id: `${hash}`, value: { $sum: "$value" } } },
    ]);

    if (campaignData.length !== 0) {
      await Campaign.update(
        {
          campaign_value: campaignData[0].value,
        },
        { where: { hash: campaignData[0]._id } }
      );
    }

    const data = await Campaign.findOne({
      attributes: [
        "id",
        "campaign_title",
        "campaign_goal",
        "campaign_value",
        "user_email",
        "visited",
        "expired",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_like WHERE campaign_id = `Campaign`.id )"
          ),
          "campaign_like",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_comment WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_comment",
        ],
      ],
      where: { id: campaign_id },
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: User, attributes: ["nickname"] },
        { model: Campaign_File, attributes: ["file"] },
        { model: Story, attributes: ["story_title", "id"] },
      ],
    });

    if (user_email) {
      const like = await Campaign_Like.findOne({
        where: { campaign_id: campaign_id, user_email: user_email },
      });
      res.json({
        data: data,
        like: like ? true : false,
        success: 1,
      });
    } else {
      res.json({
        data: data,
        like: false,
        success: 1,
      });
    }
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 조회수 추가
router.put("/visit", async (req, res) => {
  try {
    const { campaign_id } = req.body;
    await Campaign.increment(
      {
        visited: 1,
      },
      {
        where: {
          id: campaign_id,
        },
      }
    );
    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 좋아요 등록/삭제
router.put("/like", async (req, res) => {
  try {
    const { campaign_id, status } = req.body;
    const { user_email } = req.session.loginInfo;

    const history = await Campaign_Like.findOne({
      where: { campaign_id, user_email },
    });

    if (history) {
      await Campaign_Like.destroy({
        where: { campaign_id, user_email },
      });
    } else {
      await Campaign_Like.create({
        campaign_id,
        user_email,
      });
    }
    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 제목 전체 조회
router.get("/all/title", async (req, res) => {
  try {
    const list = await Campaign.findAll({
      attributes: ["campaign_title"],
      where: { expired: false },
    });
    res.json({ success: 1, list: list });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
