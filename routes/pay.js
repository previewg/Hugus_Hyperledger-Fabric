"use strict";
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Kakao_Pay, Campaign, User } = require("../models");
const server = require("../app");

router.post("/", async (req, res) => {
  const { user_email } = req.session.loginInfo;
  const { campaign_id, total_amount } = req.body;
  const campaign = await Campaign.findOne({ where: { id: campaign_id } });
  const campaign_hash = campaign.getDataValue("hash");
  const user = await User.findOne({ where: { email: user_email } });
  const hashedEmail = user.getDataValue("hash");
  const campaign_title = campaign.getDataValue("campaign_title");
  const data = `cid=TC0ONETIME&partner_order_id=HUGUS_PAY&partner_user_id=hugus&item_name=${campaign_title}&quantity=1&total_amount=${total_amount}&tax_free_amount=0&approval_url=http://localhost:3000/pay/approval&cancel_url=http://localhost:3000/pay/cancel&fail_url=http://localhost:3000/pay/failure`;
  const headers = {
    Authorization: `KakaoAK ${process.env.APP_ADMIN_KEY}`,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  axios
    .post("https://kapi.kakao.com/v1/payment/ready", data, {
      headers,
    })
    .then(async (response) => {
      await Kakao_Pay.create({
        user_email: user_email,
        tid: response.data.tid,
        campaign_hash: campaign_hash,
        hashed_email: hashedEmail,
        campaign_title: campaign_title,
        value: total_amount,
      });
      res.json({ data: response.data });
    })
    .catch((error) => console.error(error));
});

router.get("/approval", async (req, res) => {
  try {
    const { user_email } = req.session.loginInfo;
    const { pg_token } = req.query;

    const campaign = await Kakao_Pay.findOne({
      where: { user_email },
    });
    const hashed_email = campaign.getDataValue("hashed_email");
    const tid = campaign.getDataValue("tid");
    const value = campaign.getDataValue("value");
    const campaign_hash = campaign.getDataValue("campaign_hash");
    const data = `cid=TC0ONETIME&tid=${tid}&partner_order_id=HUGUS_PAY&partner_user_id=hugus&pg_token=${pg_token}`;
    const transferData = {
      senderId: hashed_email,
      receiverId: campaign_hash,
      value: value,
    };
    const headers = {
      Authorization: `KakaoAK ${process.env.APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    await axios.post("https://kapi.kakao.com/v1/payment/approve", data, {
      headers,
    });
    await axios.post(`${process.env.FABRIC_URL}/campaign/transfer`, {
      ...transferData,
    });
    server.emit(user_email, "SUCCESS");
    res.send(
      "<script type=\"text/javascript\">alert(\"결제가 완료되었습니다.\");window.open('','_self').close();</script>"
    );
    await Kakao_Pay.destroy({ where: { hashed_email: hashed_email } });
  } catch (error) {
    console.error(error);
  }
});

router.get("/cancel", async (req, res) => {
  const { user_email } = req.session.loginInfo;
  server.emit(user_email, "CANCELED");
  await Kakao_Pay.destroy({ where: { user_email } });
  res.send(
    "<script type=\"text/javascript\">alert(\"결제가 취소되었습니다.\");window.open('','_self').close();</script>"
  );
});

module.exports = router;
