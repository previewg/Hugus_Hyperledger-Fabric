"use strict";
const {
  Story,
  User,
  Hashtag,
  Story_File,
  Campaign,
  Campaign_File,
  Act,
  Story_Report,
  Story_Report_Reply,
  sequelize,
  Sequelize,
} = require("../models");
const Transaction = require("../models/block/transaction");

const express = require("express");
const router = express.Router();

router.post("/summary", async (req, res) => {
  try {
    const activeStoryCount = await Story.count({
      where: { expired: false },
    });
    const expiredStoryCount = await Story.count({
      where: { expired: true },
    });
    const activeCampaignCount = await Campaign.count({
      where: { expired: false },
    });
    const expiredCampaignCount = await Campaign.count({
      where: { expired: true },
    });
    const ActCount = await Act.count({});
    const UserCount = await User.count({});

    const donationCount = await Transaction.countDocuments({
      tx_type: "transfer",
    });
    let totalAmount = await Transaction.aggregate([
      { $group: { _id: "totalAmount", value: { $sum: "$value" } } },
    ]);

    if (totalAmount.length === 0) {
      totalAmount = 0;
    } else {
      totalAmount = totalAmount[0].value;
    }

    res.json({
      activeStoryCount: activeStoryCount,
      expiredStoryCount: expiredStoryCount,
      activeCampaignCount: activeCampaignCount,
      expiredCampaignCount: expiredCampaignCount,
      ActCount: ActCount,
      UserCount: UserCount,
      donationCount: donationCount,
      totalAmount: totalAmount,
      success: 1,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// campaign 목록 조회
router.get("/campaign/:page", async (req, res) => {
  try {
    let page = req.params.page;
    let type = req.query.type;
    let keyword = req.query.keyword;
    let order = req.query.order;
    let offset = 0;
    let count = 0;
    let list = null;

    // 10개씩 조회
    if (page > 1) {
      offset = 10 * (page - 1);
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

    if (keyword) {
      list = await Campaign.findAll({
        attributes: [
          "campaign_title",
          "id",
          "user_email",
          "visited",
          "created_at",
          "id",
          "campaign_goal",
          "campaign_value",
        ],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        include: [{ model: User, attributes: ["nickname"] }],
        where: {
          expired: type === "done",
          campaign_title: {
            [Sequelize.Op.like]: "%" + keyword + "%",
          },
        },
      });
      count = await Campaign.count({
        expired: type === "done",
        campaign_title: {
          [Sequelize.Op.like]: "%" + keyword + "%",
        },
      });
    } else {
      list = await Campaign.findAll({
        attributes: [
          "campaign_title",
          "id",
          "user_email",
          "visited",
          "created_at",
          "id",
          "campaign_goal",
          "campaign_value",
        ],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        where: {
          expired: type === "done",
        },
        include: [{ model: User, attributes: ["nickname"] }],
      });
      count = await Campaign.count({
        expired: type === "done",
      });
    }
    count = Math.ceil(count / 10);
    res.json({ list: list, count: count, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// story 목록 조회
router.get("/story/:page", async (req, res) => {
  try {
    let page = req.params.page;
    let type = req.query.type;
    let keyword = req.query.keyword;
    let order = req.query.order;
    let offset = 0;
    // 10개씩 조회
    if (page > 1) {
      offset = 10 * (page - 1);
    }
    let count = 0;
    let list = null;

    if (keyword) {
      list = await Story.findAll({
        attributes: [
          "story_title",
          "id",
          "user_email",
          "visited",
          "created_at",
        ],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        include: [{ model: User, attributes: ["nickname"] }],
        where: {
          expired: type === "done",
          story_title: {
            [Sequelize.Op.like]: "%" + keyword + "%",
          },
        },
      });
      count = await Story.count({
        expired: type === "done",
        campaign_title: {
          [Sequelize.Op.like]: "%" + keyword + "%",
        },
      });
    } else {
      list = await Story.findAll({
        attributes: [
          "story_title",
          "id",
          "user_email",
          "visited",
          "created_at",
        ],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        where: {
          expired: type === "done",
        },
        include: [{ model: User, attributes: ["nickname"] }],
      });
      count = await Story.count({
        expired: type === "done",
      });
    }
    count = Math.ceil(count / 10);
    res.json({ list: list, count: count, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// Act 목록 조회
router.get("/act/:page", async (req, res) => {
  try {
    let page = req.params.page;
    let keyword = req.query.keyword;
    let order = req.query.order;
    let offset = 0;
    // 10개씩 조회
    if (page > 1) {
      offset = 10 * (page - 1);
    }
    let count = 0;
    let list = null;

    if (keyword) {
      list = await Act.findAll({
        attributes: ["act_title", "id", "visited", "created_at"],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        where: {
          act_title: {
            [Sequelize.Op.like]: "%" + keyword + "%",
          },
        },
      });
      count = await Act.count({
        act_title: {
          [Sequelize.Op.like]: "%" + keyword + "%",
        },
      });
    } else {
      list = await Act.findAll({
        attributes: ["act_title", "id", "visited", "created_at"],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
      });
      count = await Act.count({});
    }
    count = Math.ceil(count / 10);
    res.json({ list: list, count: count, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

// Report 목록 조회
router.get("/report/:page", async (req, res) => {
  try {
    let page = req.params.page;
    let keyword = req.query.keyword;
    let order = req.query.order;
    let type = req.query.type;
    let offset = 0;
    // 10개씩 조회
    if (page > 1) {
      offset = 10 * (page - 1);
    }
    let count = 0;
    let list = null;

    if (keyword) {
      list = await Story_Report.findAll({
        attributes: [
          "id",
          "user_email",
          "story_id",
          "case_detail",
          "created_at",
        ],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        include: [
          { model: User, attributes: ["nickname"] },
          {
            model: Story_Report_Reply,
            attributes: ["reply"],
          },
        ],
        where: {
          replied: type === "done",
          case_detail: {
            [Sequelize.Op.like]: "%" + keyword + "%",
          },
        },
      });
      count = await Story_Report.count({
        case_detail: {
          [Sequelize.Op.like]: "%" + keyword + "%",
        },
      });
    } else {
      list = await Story_Report.findAll({
        attributes: [
          "id",
          "user_email",
          "story_id",
          "case_detail",
          "created_at",
        ],
        order: [["created_at", "DESC"]],
        offset: offset,
        limit: 10,
        include: [
          { model: User, attributes: ["nickname"] },
          {
            model: Story_Report_Reply,
            attributes: ["reply"],
          },
        ],

        where: {
          replied: type === "done",
        },
      });
      count = await Story_Report.count({});
    }
    count = Math.ceil(count / 10);
    res.json({ list: list, count: count, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

router.post("/report/add", async (req, res) => {
  try {
    const { reply, report_id } = req.body;
    await Story_Report_Reply.create({
      reply,
      report_id,
    });

    await Story_Report.update(
      {
        replied: true,
      },
      {
        where: {
          id: report_id,
        },
      }
    );

    res.json({ success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
