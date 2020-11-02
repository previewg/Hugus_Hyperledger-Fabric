"use strict";
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Kakao_Pay, Campaign } = require("../models");
const server = require("../app");

router.post("/", async (req, res) => {
  const { user_email } = req.session.loginInfo;
  const { campaign_id, total_amount } = req.body;
  const campaign_data = await Campaign.findOne({ where: { id: campaign_id } });
  const campaign_title = campaign_data.getDataValue("campaign_title");
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
        tid: response.data.tid,
        campaign_id: campaign_id,
        user_email: user_email,
        campaign_title: campaign_title,
        total_amount: total_amount,
      });
      res.json({ data: response.data });
    })
    .catch((error) => console.error(error));
});

router.get("/approval", async (req, res) => {
  const { user_email } = req.session.loginInfo;
  const campaign_data = await Kakao_Pay.findOne({
    where: { user_email },
  });
  const tid = campaign_data.getDataValue("tid");
  const { pg_token } = req.query;
  console.log(pg_token);
  const data = `cid=TC0ONETIME&tid=${tid}&partner_order_id=HUGUS_PAY&partner_user_id=hugus&pg_token=${pg_token}`;
  const headers = {
    Authorization: `KakaoAK ${process.env.APP_ADMIN_KEY}`,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  axios
    .post("https://kapi.kakao.com/v1/payment/approve", data, {
      headers,
    })
    .then((response) => {
      server.emit(user_email, "SUCCESS");
      res.send(
        "<script type=\"text/javascript\">alert(\"결제가 완되었습니다.\");window.open('','_self').close();</script>"
      );
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(async () => {
      await Kakao_Pay.destroy({ where: { user_email } });
    });
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
