"use strict";
const express = require("express");
const router = express.Router();
const {
  User,
  Story_Comment,
  Comment_Child,
  Story_Comment_Like,
  sequelize,
} = require("../models");

// 댓글 등록
router.post("/add", async (req, res) => {
    try {
        console.log(req.body)
        const {user_email} = req.session.loginInfo;
        const {story_id, comment} = req.body;
        if (req.body.type === "mobile") {
            await Story_Comment.create({
                user_email: req.body.email,
                story_id: req.body.story_id.story_id,
                comment: req.body.comment
            })
        } else {


            await Story_Comment.create({
                user_email,
                story_id,
                comment,
            })
        }
        ;

    const list = await Story_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM comment_child WHERE comment_id = `Story_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      where: {
        story_id: req.body.story_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname", "user_profile"] }],
      limit: 10,
    });

    const total = await Story_Comment.count({
      where: {
        story_id: story_id,
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

// 댓글 삭제
router.post("/delete", async (req, res) => {
  const { story_id, comment_id } = req.body;

  try {
    await Story_Comment.destroy({
      where: {
        id: comment_id,
      },
    });

    await Comment_Child.destroy({
      where: {
        id: comment_id,
      },
    });

    const list = await Story_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM comment_child WHERE comment_id = `Story_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      where: {
        story_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname", "user_profile"] }],
      limit: 10,
    });

    const total = await Story_Comment.count({
      where: {
        story_id: story_id,
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

// 댓글 목록 조회
router.get("/list/:story_id/:section", async (req, res) => {
  try {
    let story_id = req.params.story_id;
    let section = req.params.section;
    let offset = 0;

    // 10개씩 조회
    if (section > 1) {
      offset = 10 * (section - 1);
    }
    const list = await Story_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM comment_child WHERE comment_id = `Story_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      include: [
        { model: User, attributes: ["nickname", "user_profile"] },
        // { model: Story_Comment_Like, attributes: ["like"] },
      ],

      where: {
        story_id: story_id,
      },
      order: [["created_at", "DESC"]],
      offset: offset,
      limit: 10,
    });

    const total = await Story_Comment.count({
      where: {
        story_id: story_id,
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

// 댓글 좋아요 등록 / 삭제
router.put("/like", async (req, res) => {
  try {
    const { user_email } = req.session.loginInfo;
    const { comment_id } = req.body;

    const history = await Story_Comment_Like.findOne({
      where: { user_email, comment_id },
    });

    if (history) {
      await Story_Comment_Like.destroy({
        where: { comment_id, user_email },
      });
    } else {
      await Story_Comment_Like.create({
        comment_id,
        user_email,
      });
    }

    res.json({ success: 1 });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: 3 });
  }
});

//대댓글 작성
router.post("/child/add", async (req, res) => {
    try {
        const user_email = req.session.loginInfo.user_email;
        const {comment_id, comment, story_id} = req.body;
        await Comment_Child.create({
            user_email: user_email,
            comment_id: comment_id,
            comment: comment,
        });

        const list = await Story_Comment.findAll({
            attributes: [
                "id",
                "user_email",
                "comment",
                "createdAt",
                [
                    sequelize.literal(
                        "(SELECT COUNT(comment_id) FROM comment_child WHERE comment_id = `Story_Comment`.id)"
                    ),
                    "child_count",
                ],
            ],
            include: [{model: User, attributes: ["nickname", "user_profile"]}],
            where: {
                story_id,
            },
            order: [["created_at", "DESC"]],
            limit: 10,
        });

        const total = await Story_Comment.count({
            where: {
                story_id: story_id,
            },
        });

        let more = false;
        if (total > 10) more = true;

        res.json({list: list, success: 1, more: more, total: total});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: 3});
    }
});

// 대댓글 목록 조회
router.get("/childList/:comment_id", async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const list = await Comment_Child.findAll({
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
