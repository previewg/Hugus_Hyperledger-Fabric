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
  Story_Vote,
} = require("../models");

// multer 설정
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
  }),
});

// 스토리 등록
router.post("/add", upload.array("files"), async (req, res) => {
    try {
        const {user_email} = req.session.loginInfo;
        const {story_title, user_info, story_content, story_goal} = req.body;
        const story = await Story.create({
            story_title,
            user_info,
            story_content,
            story_goal,
            user_email,
        });

    for (const file of req.files) {
      await Story_File.create({
        story_id: story.dataValues.id,
        file: file.filename,
      });
    }

    const hashtags = req.body.hashtags.split(",");
    for (const hashtag of hashtags) {
      const result = await Hashtag.findOrCreate({
        where: { hashtag: hashtag },
      });

      await Story_Hashtag.create({
        story_id: story.dataValues.id,
        hashtag_id: result[0].dataValues.id,
      });
    }

    const items = JSON.parse(req.body.items);
    for (const item of items) {
      await Story_Item.create({
        story_id: story.dataValues.id,
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

// 스토리 삭제 ( 일단 soft delete로 연관 테이블 정보들은 보존 / 추후에 복구 가능 )
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
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
      story_goal,
      id,
      hashtags,
      items,
      del_items,
      del_hashtags,
    } = req.body;

    for (const file of req.files) {
      await Story_File.create({
        story_id: story.dataValues.id,
        file: file.filename,
      });
    }

    const delHashtagList = JSON.parse(del_hashtags);
    for (const del of delHashtagList) {
      console.log(del);
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
            hashtag_id: result[0].dataValues.id,
          },
        });
      }
    }

    for (const id of del_items.split(",")) {
      await Story_Item.destroy({
        where: { id: id },
      });
    }

    const itemList = JSON.parse(items);
    for (const item of itemList) {
      if (item.new) {
        await Story_Item.create({
          story_id: id,
          item_name: item.item_name,
          item_price: item.item_price,
          item_quantity: item.item_quantity,
        });
      }
    }

    await Story.update(
      {
        story_title,
        user_info,
        story_content,
        story_goal,
      },
      {
        where: { id },
      }
    );

    // // 프론트에서 사진 유지한다는 값을 던져줘야함 -> 처리하기
    // await Story_File.destroy({
    //   where: { story_id: id },
    // });
    // for (const file of req.files) {
    //   await Story_File.create({
    //     story_id: id,
    //     file: file.filename,
    //   });
    // }

    res.json({ success: 1 });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 스토리 목록 조회
router.get("/list/:section", async (req, res) => {
  try {
    let section = req.params.section;
    let offset = 0;

    // 18개씩 조회
    if (section > 1) {
      offset = 18 * (section - 1);
    }

    const list = await Story.findAll({
      attributes: [
        "story_title",
        "id",
        "story_goal",
        "story_vote",
        "story_like",
        "user_info",
        "story_comment",
        "user_email"
      ],
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Story_File, attributes: ["file"], limit: 1 },
      ],
      offset: offset,
      limit: section * 18,
    });

    res.json({ list: list, success: 1 });
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
      where: { id: story_id },
      include: [
        { model: Hashtag, attributes: ["hashtag"] },
        { model: Story_Item },
        { model: User, attributes: ["nickname"] },
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

    if (status) {
      await Story.decrement(
        {
          story_like: 1,
        },
        {
          where: {
            id: story_id,
          },
        }
      );
    } else {
      await Story.increment(
        {
          story_like: 1,
        },
        {
          where: {
            id: story_id,
          },
        }
      );
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

    if (status) {
      await Story.decrement(
        {
          story_vote: 1,
        },
        {
          where: {
            id: story_id,
          },
        }
      );
    } else {
      await Story.increment(
        {
          story_vote: 1,
        },
        {
          where: {
            id: story_id,
          },
        }
      );
    }
    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
