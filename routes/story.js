"use strict";
const express = require("express");
const router = express.Router();
const {
  Story,
  Story_File,
  Hashtag,
  Story_Hashtag,
  Story_Item,
  User,
  Story_Like,
  Story_Report,
  Story_Vote,
  sequelize,
} = require("../models");

// multer 설정
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "hugusstory",
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

// 스토리 등록
router.post("/add", upload.array("files"), async (req, res) => {
  try {
    const { user_email } = req.session.loginInfo;
    const { story_title, user_info, story_content, story_goal } = req.body;

    const story = await Story.create({
      story_title,
      user_info,
      story_content,
      story_goal,
      user_email,
    });

    const story_id = story.getDataValue("id");
    for (const file of req.files) {
      let fileName = file.location;
      await Story_File.create({
        story_id: story_id,
        file: fileName,
      });
    }

    const hashtags = req.body.hashtags.split(",");
    for (const hashtag of hashtags) {
      const result = await Hashtag.findOrCreate({
        where: { hashtag: hashtag },
      });

      await Story_Hashtag.create({
        story_id: story_id,
        hashtag_id: result[0].getDataValue("id"),
      });
    }

    const items = JSON.parse(req.body.items);
    for (const item of items) {
      await Story_Item.create({
        story_id: story_id,
        item_name: item.item_name,
        item_price: item.item_price,
        item_quantity: item.item_quantity,
      });
    }
    res.json({ success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const files = await Story_File.findAll({
      where: { story_id: id },
      attributes: ["file"],
    });

    if (files.length !== 0) {
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

      await Story_File.destroy({
        where: { story_id: id },
      });
    }

    const hashtags = await Story_Hashtag.findAll({
      attributes: [
        "hashtag_id",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM story_hashtag WHERE hashtag_id = `Story_Hashtag`.hashtag_id)"
          ),
          "count",
        ],
      ],
      where: { story_id: id },
    });

    for (const hashtag of hashtags) {
      const unique = hashtag.getDataValue("count") === 1 ? true : false;
      if (unique) {
        await Hashtag.destroy({
          where: { id: hashtag.getDataValue("hashtag_id") },
        });
      }
    }

    await Story.destroy({ where: { id } });
    res.json({ success: 1 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: 3 });
  }
});

// 스토리 수정
router.post("/update", upload.array("files"), async (req, res) => {
  try {
    const {
      story_title,
      user_info,
      story_content,
      id,
      hashtags,
      del_hashtags,
    } = req.body;

    if (req.files.length !== 0) {
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
      await Story_File.destroy({
        where: { story_id: id },
      });

      for (const file of req.files) {
        let fileName = file.location;
        await Story_File.create({
          story_id: id,
          file: fileName,
        });
      }
    }

    const delHashtagList = JSON.parse(del_hashtags);
    for (const del of delHashtagList) {
      const count = await Story_Hashtag.count({
        where: { hashtag_id: del.id },
      });

      await Story_Hashtag.destroy({
        where: { hashtag_id: del.id },
      });

      if (count === 1) {
        await Hashtag.destroy({
          where: {
            hashtag: del.hashtag,
          },
        });
      }
    }

    const hashtagList = JSON.parse(hashtags);
    for (const hashtag of hashtagList) {
      if (hashtag.new) {
        const result = await Hashtag.findOrCreate({
          where: { hashtag: hashtag.tag },
        });

        await Story_Hashtag.findOrCreate({
          where: {
            story_id: id,
            hashtag_id: result[0].getDataValue("id"),
          },
        });
      }
    }

    await Story.update(
      {
        story_title,
        user_info,
        story_content,
      },
      {
        where: { id },
      }
    );
    res.json({ success: 1 });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

// 스토리 목록 조회
router.get("/list/:page", async (req, res) => {
  try {
    let offset = 0;
    const page = req.params.page;
    const type = req.query.type;
    let order;
    if (type === "hot") {
      order = [[sequelize.cast(sequelize.col("story_ratio"), "FLOAT"), "DESC"]];
    } else if (type === "new") {
      order = [["created_at", "DESC"]];
    }
    // 9개씩 조회
    if (page > 1) {
      offset = 9 * (page - 1);
    }

    let list;

    if (type === "my") {
      const { user_email } = req.session.loginInfo;
      list = await Story.findAll({
        attributes: [
          "id",
          "story_title",
          "user_info",
          "story_content",
          "story_goal",
          "user_email",
          "visited",
          "createdAt",
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_like WHERE story_id = `Story`.id)"
            ),
            "story_like",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_report WHERE story_id = `Story`.id)"
            ),
            "story_report",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_vote WHERE story_id = `Story`.id)"
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
        include: [
          { model: Hashtag, attributes: ["hashtag"] },
          { model: Story_File, attributes: ["file"], limit: 1 },
        ],
        offset: offset,
        limit: 9,
        where: {
          id: [
            sequelize.literal(
              `(SELECT story_id FROM story_like WHERE user_email = '${user_email}')`
            ),
          ],
          expired: false,
        },

        order: [["created_at", "DESC"]],
      });
      const total = await Story.count({
        where: {
          id: [
            sequelize.literal(
              `(SELECT story_id FROM story_like WHERE user_email = '${user_email}')`
            ),
          ],
          expired: false,
        },
      });
      let more = false;
      if (total > page * 9) more = true;
      res.json({ list: list, success: 1, more: more });
    } else if (type === "past") {
      list = await Story.findAll({
        attributes: [
          "id",
          "story_title",
          "user_info",
          "story_content",
          "story_goal",
          "user_email",
          "visited",
          "createdAt",
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_like WHERE story_id = `Story`.id)"
            ),
            "story_like",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_report WHERE story_id = `Story`.id)"
            ),
            "story_report",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_vote WHERE story_id = `Story`.id)"
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
        include: [
          { model: Hashtag, attributes: ["hashtag"] },
          { model: Story_File, attributes: ["file"], limit: 1 },
        ],
        offset: offset,
        limit: 9,
        where: {
          expired: true,
        },
        order: [["created_at", "DESC"]],
      });
      const total = await Story.count({ where: { expired: true } });
      let more = false;
      if (total > page * 9) more = true;
      res.json({ list: list, success: 1, more: more });
    } else {
      list = await Story.findAll({
        attributes: [
          "id",
          "story_title",
          "user_info",
          "story_content",
          "story_goal",
          "user_email",
          "visited",
          "createdAt",
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_like WHERE story_id = `Story`.id)"
            ),
            "story_like",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_report WHERE story_id = `Story`.id)"
            ),
            "story_report",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_vote WHERE story_id = `Story`.id)"
            ),
            "story_vote",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(1) FROM story_comment WHERE story_id = `Story`.id)"
            ),
            "story_comment",
          ],
          [
            sequelize.literal(
              "(SELECT (story_vote)/(story_goal) FROM story WHERE id = `Story`.id)"
            ),
            "story_ratio",
          ],
        ],
        include: [
          { model: User, attributes: ["nickname", "user_profile"] },
          { model: Hashtag, attributes: ["hashtag"] },
          { model: Story_File, attributes: ["file"], limit: 1 },
        ],
        where: { expired: false },
        offset: offset,
        limit: 9,
        order: order,
      });
      const total = await Story.count({ where: { expired: false } });
      let more = false;
      if (total > page * 10) more = true;
      res.json({ list: list, success: 1, more: more });
    }
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
        "expired",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM story_like WHERE story_id = `Story`.id)"
          ),
          "story_like",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM story_report WHERE story_id = `Story`.id)"
          ),
          "story_report",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM story_vote WHERE story_id = `Story`.id)"
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
        where: { story_id: story_id, user_email: user_email },
      });
      const report = await Story_Report.findOne({
        where: { story_id: story_id, user_email: user_email },
      });
      const vote = await Story_Vote.findOne({
        where: { story_id: story_id, user_email: user_email },
      });
      res.json({
        data: data,
        like: like ? true : false,
        report: report ? true : false,
        vote: vote ? true : false,
        success: 1,
      });
    } else {
      res.json({
        data: data,
        like: false,
        report: false,
        vote: false,
        success: 1,
      });
    }
  } catch (error) {
    console.error(error);
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
    const { story_id } = req.body;
    const { user_email } = req.session.loginInfo;

    const history = await Story_Like.findOne({
      where: { story_id, user_email },
    });

    if (history) {
      await Story_Like.destroy({
        where: { story_id, user_email },
      });
    } else {
      await Story_Like.create({
        story_id,
        user_email,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

//게시물 신고하기 등록 삭제
router.put("/report", async (req, res) => {
  try {
    const { story_id } = req.body;
    const { case_detail } = req.body;
    const { user_email } = req.session.loginInfo;

    let newReport = true;
    const history = await Story_Report.findOne({
      where: { story_id, user_email },
    });

    if (history) {
      newReport = false;
      await Story_Report.destroy({
        where: { story_id, user_email },
      });
    } else {
      await Story_Report.create({
        story_id,
        user_email,
        case_detail,
      });
    }

    res.json({ success: 1, newReport: newReport });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 투표 등록/삭제
router.put("/vote", async (req, res) => {
  try {
    const { story_id } = req.body;
    const { user_email } = req.session.loginInfo;

    const history = await Story_Vote.findOne({
      where: { story_id, user_email },
    });

    if (history) {
      await Story_Vote.destroy({
        where: { story_id, user_email },
      });
    } else {
      await Story_Vote.create({
        story_id,
        user_email,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// 스토리 제목 전체 조회
router.get("/all/title", async (req, res) => {
  try {
    const list = await Story.findAll({
      attributes: ["story_title"],
      where: { expired: false },
    });
    res.json({ success: 1, list: list });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
