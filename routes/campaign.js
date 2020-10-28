"use strict";
const express = require("express");
const router = express.Router();
const { Campaign, Campaign_File, Hashtag, sequelize } = require("../models");

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

// 캠페인 등록
router.post("/add", upload.array("files"), async (req, res) => {
  try {
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
    const files = await Story_File.findAll({
      where: { story_id: id },
      attributes: ["file"],
    });

    let params = {
      Bucket: "hugusstory",
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

    await Story.destroy({ where: { id } });
    res.json({ success: 1 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: 3 });
  }
});

// 캠페인 리스트 조회 ( 메인 슬라이더용  - 도달 임박순 )
router.get("/init", async (req, res) => {
  try {
    const list = await Campaign.findAll({
      attributes: [
        "id",
        "campaign_title",
        "campaign_goal",
        "user_email",
        "visited",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_like WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_like",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_vote WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_vote",
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
      limit: 10,
      order: [["created_at", "DESC"]],
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

    const list = await Campaign.findAll({
      attributes: [
        "id",
        "campaign_title",
        "campaign_goal",
        "user_email",
        "visited",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_like WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_like",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_vote WHERE campaign_id = `Campaign`.id)"
          ),
          "campaign_vote",
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

// 스토리 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const story_id = req.params.id;
    let user_email;
    if (req.session.loginInfo) user_email = req.session.loginInfo.user_email;
    else user_email = null;

    const data = await Story.findOne({
      attributes: [
        "id",
        "story_title",
        "user_info",
        "story_content",
        "story_goal",
        "user_email",
        "visited",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM story_like WHERE story_id = `Story`.id AND `like`=true )"
          ),
          "story_like",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM story_vote WHERE story_id = `Story`.id AND `vote`=true )"
          ),
          "story_vote",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM story_comment WHERE story_id = `Story`.id)"
          ),
          "story_comment",
        ],
      ],
      where: { id: story_id },
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Story_Item },
        { model: User, attributes: ["nickname"] },
        { model: Story_File, attributes: ["file"] },
      ],
    });
    if (user_email) {
      const like = await Story_Like.findOne({
        where: { story_id: story_id, user_email: user_email, like: true },
      });

      const vote = await Story_Vote.findOne({
        where: { story_id: story_id, user_email: user_email, vote: true },
      });
      res.json({
        data: data,
        like: like ? true : false,
        vote: vote ? true : false,
        success: 1,
      });
    } else {
      res.json({
        data: data,
        like: false,
        vote: false,
        success: 1,
      });
    }
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 조회수 추가
router.put("/visit", async (req, res) => {
  try {
    const { story_id } = req.body;
    await Story.increment(
      {
        visited: 1,
      },
      {
        where: {
          id: story_id,
        },
      }
    );
    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 좋아요 등록/삭제
router.put("/like", async (req, res) => {
  try {
    const { story_id, status } = req.body;
    const { user_email } = req.session.loginInfo;

    const history = await Story_Like.findOne({
      where: { story_id, user_email },
    });

    if (history) {
      await Story_Like.update(
        {
          like: !status,
        },
        {
          where: { story_id, user_email },
        }
      );
    } else {
      await Story_Like.create({
        story_id,
        user_email,
        like: !status,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 투표 등록/삭제
router.put("/vote", async (req, res) => {
  try {
    const { story_id, status } = req.body;
    const { user_email } = req.session.loginInfo;

    const history = await Story_Vote.findOne({
      where: { story_id, user_email },
    });

    if (history) {
      await Story_Vote.update(
        {
          vote: !status,
        },
        {
          where: { story_id, user_email },
        }
      );
    } else {
      await Story_Vote.create({
        story_id,
        user_email,
        vote: !status,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
