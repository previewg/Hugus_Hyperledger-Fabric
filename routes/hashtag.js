"use strict";
const express = require("express");
const router = express.Router();
const {
  Hashtag,
  Story_Hashtag,
  Campaign_Hashtag,
  Story_File,
  Campaign_File,
  Campaign,
  Story,
  sequelize,
} = require("../models");

// 해시태그 목록 조회
router.get("/all", async (req, res) => {
  try {
    const hashtags = await Hashtag.findAll({
      attributes: [
        "hashtag",
        [
          sequelize.literal(
            "(SELECT count(1) FROM story_hashtag WHERE hashtag_id = `Hashtag`.id)"
          ),
          "count",
        ],
      ],
      order: [[sequelize.cast(sequelize.col("count"), "INTEGER"), "DESC"]],
    });
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
      include: [
        { model: Story_Hashtag, attributes: ["story_id"] },
        { model: Campaign_Hashtag, attributes: ["campaign_id"] },
      ],
    });
    const storyCandidate = [];
    const campaignCandidate = [];
    let storyList;
    let campaignList;

    const stories = search_data.getDataValue("Story_Hashtags");
    const campaigns = search_data.getDataValue("Campaign_Hashtags");

    for (const story of stories) {
      storyCandidate.push(story.getDataValue("story_id"));
    }

    for (const campaign of campaigns) {
      campaignCandidate.push(campaign.getDataValue("campaign_id"));
    }

    if (storyCandidate !== null) {
      storyList = await Story.findAll({
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
        where: { id: storyCandidate },
        include: [
          { model: Hashtag, attributes: ["hashtag"] },
          { model: Story_File, attributes: ["file"], limit: 1 },
        ],
      });
    }

    if (campaignCandidate !== null) {
      campaignList = await Campaign.findAll({
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
          { model: Campaign_File, attributes: ["file"], limit: 1 },
        ],
        order: [
          [sequelize.cast(sequelize.col("campaign_ratio"), "FLOAT"), "DESC"],
        ],
        where: { id: campaignCandidate },
      });
    }
    if (!campaignCandidate && !storyCandidate) {
      res.json({ success: 3 });
    }
    res.json({ storyList: storyList, campaignList: campaignList, success: 1 });
  } catch (err) {
    res.json({ success: 2 });
    console.log(err);
  }
});

// 해당 해시태그 게시물 조회
// router.post("/list", async (req, res) => {
//   try {
//     const { hashtag } = req.body;
//     const hashtag_id = await Hashtag.findOne({
//       attributes: ["id"],
//       where: { hashtag: hashtag },
//     });
//     const list = await Story_Hashtag.findAll({
//       where: { hashtag_id: 7 },
//       include: [{ model: Story }],
//     });
//
//     res.json({ success: 1, list: list });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: 3 });
//   }
// });

module.exports = router;
