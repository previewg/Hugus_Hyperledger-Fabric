"use strict";
const express = require("express");
const router = express.Router();
const {
  Hashtag,
  Story_Hashtag,
  Story_File,
  Story,
  sequelize,
} = require("../models");

// 해시태그 목록 조회
router.get("/all", async (req, res) => {
  try {
    const hashtags = await Hashtag.findAll({ attributes: ["hashtag"] });
    // const mostTags = await Story_Hashtag.findAll({
    //   attributes: [
    //     [
    //       sequelize.literal(
    //         "(SELECT (campaign_value)/(campaign_goal) FROM campaign WHERE id = `Campaign`.id)"
    //       ),
    //       "campaign_ratio",
    //     ],
    //   ],
    //   include: [{ model: Hashtag, attributes: ["hashtag"] }],
    //
    //   limit: 10,
    // });
    res.json({ success: 1, list: hashtags });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});
router.post("/search", async (req, res) => {
  const search = req.body.search;

  try {
    const search_data = await Hashtag.findOne({
      where: { hashtag: search },
      attributes: ["id"],
      include: [{ model: Story_Hashtag, attributes: ["story_id"] }],
    });
    const candidate = [];
    const stories = search_data.getDataValue("Story_Hashtags");
    for (const story of stories) {
      candidate.push(story.getDataValue("story_id"));
    }
    if (candidate !== null) {
      const list = await Story.findAll({
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
              "(SELECT COUNT(1) FROM story_like WHERE story_id = `Story`.id)"
            ),
            "story_like",
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
        where: { id: candidate },
        include: [
          { model: Hashtag, attributes: ["hashtag"] },
          { model: Story_File, attributes: ["file"], limit: 1 },
        ],
      });
      console.log(list);
      res.json({ list: list, success: 1 });
    } else {
      res.json({ success: 3 });
    }
  } catch (err) {
    res.json({ success: 2 });
    console.log(err);
  }
});

// 해당 해시태그 게시물 조회
router.post("/list", async (req, res) => {
  try {
    const { hashtag } = req.body;
    const hashtag_id = await Hashtag.findOne({
      attributes: ["id"],
      where: { hashtag: hashtag },
    });
    console.log(hashtag_id);
    const list = await Story_Hashtag.findAll({
      where: { hashtag_id: 7 },
      include: [{ model: Story }],
    });

    res.json({ success: 1, list: list });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
