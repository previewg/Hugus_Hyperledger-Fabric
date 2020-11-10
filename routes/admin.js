"use strict";
const {
  Story,
  User,
  Hashtag,
  Story_File,
  Campaign,
  Campaign_File,
  Act,
  sequelize,
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
    const totalAmount = await Transaction.aggregate([
      { $group: { _id: "totalAmount", value: { $sum: "$value" } } },
    ]);

    res.json({
      activeStoryCount: activeStoryCount,
      expiredStoryCount: expiredStoryCount,
      activeCampaignCount: activeCampaignCount,
      expiredCampaignCount: expiredCampaignCount,
      ActCount: ActCount,
      UserCount: UserCount,
      donationCount: donationCount,
      totalAmount: totalAmount[0].value,
      success: 1,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;
