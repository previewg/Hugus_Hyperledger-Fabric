"use strict";
const express = require("express");
const router = express.Router();
const {
  User,
  Campaign,
  Campaign_Comment,
  Campaign_Comment_Like,
  Campaign_Comment_Child,
  sequelize,
} = require("../models");

// Campaign 댓글 등록
router.post("/add", async (req, res) => {
  try {
    const { user_email } = req.session.loginInfo;

    const { campaign_id, comment } = req.body;
    await Campaign_Comment.create({
      user_email,
      campaign_id,
      comment,
    });

    const list = await Campaign_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM campaign_comment_child WHERE comment_id = `Campaign_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      where: {
        campaign_id: req.body.campaign_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname", "user_profile"] }],
      limit: 10,
    });

    const total = await Campaign_Comment.count({
      where: {
        campaign_id: campaign_id,
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

// Campaign 댓글 삭제
router.post("/delete", async (req, res) => {
  const { campaign_id, comment_id } = req.body;
  try {
    await Campaign_Comment.destroy({
      where: {
        id: comment_id,
      },
    });
    await Campaign_Comment_Child.destroy({
      where: {
        id: comment_id,
      },
    });

    const list = await Campaign_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM campaign_comment_child WHERE comment_id = `Campaign_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      where: {
        campaign_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname", "user_profile"] }],
      limit: 10,
    });

    const total = await Campaign_Comment.count({
      where: {
        campaign_id: campaign_id,
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

// Campaign 댓글 목록 조회
router.get("/list/:id/:page", async (req, res) => {
  try {
    let campaign_id = req.params.id;
    let page = req.params.page;
    let offset = 0;

    // 10개씩 조회
    if (page > 1) {
      offset = 10 * (page - 1);
    }
    const list = await Campaign_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(1) FROM campaign_comment_like WHERE comment_id = `Campaign_Comment`.id)"
          ),
          "like_count",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM campaign_comment_child WHERE comment_id = `Campaign_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      include: [{ model: User, attributes: ["nickname", "user_profile"] }],

      where: {
        campaign_id: campaign_id,
      },
      order: [["created_at", "DESC"]],
      offset: offset,
      limit: 10,
    });

    const total = await Campaign_Comment.count({
      where: {
        campaign_id: campaign_id,
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

// Campaign 대댓글 작성
router.post("/child/add", async (req, res) => {
  try {
    const user_email = req.session.loginInfo.user_email;
    const { comment_id, comment, campaign_id } = req.body;
    console.log(campaign_id);

    await Campaign_Comment_Child.create({
      user_email: user_email,
      comment_id: comment_id,
      comment: comment,
    });
    const list = await Campaign_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM campaign_comment_child WHERE comment_id = `Campaign_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      include: [{ model: User, attributes: ["nickname", "user_profile"] }],
      where: {
        campaign_id,
      },
      order: [["created_at", "DESC"]],
      limit: 10,
    });

    const total = await Campaign_Comment.count({
      where: {
        campaign_id: campaign_id,
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

// Campaign 대댓글 목록 조회
router.get("/childList/:comment_id", async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const list = await Campaign_Comment_Child.findAll({
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

// Campaign_Comment 좋아요 등록/삭제
router.put("/like", async (req, res) => {
  try {
    const { comment_id, status } = req.body;
    // const { user_email } = req.session.loginInfo;
    const user_email = "moonnr94@gmail.com";
    const history = await Campaign_Comment_Like.findOne({
      where: { comment_id, user_email },
    });

    console.log(comment_id);
    console.log(user_email);
    console.log(history);

    if (history) {
      await Campaign_Comment_Like.destroy({
        where: { comment_id, user_email },
      });
    } else {
      await Campaign_Comment_Like.create({
        comment_id,
        user_email,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
