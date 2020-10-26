"use strict";
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", (req, res) => {
  const { email, campaign, total_amount } = req.body;
  const data = `cid=TC0ONETIME&partner_order_id=hugus&partner_user_id=${email}&item_name=${campaign}&quantity=1&total_amount=${total_amount}&tax_free_amount=0&approval_url=http://localhost:3000/pay/approved/${email}/${campaign}/${total_amount}&cancel_url=http://localhost:3001&fail_url=http://localhost:3001`;
  const headers = {
    Authorization: `KakaoAK ${process.env.APP_ADMIN_KEY}`,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  axios
    .post("https://kapi.kakao.com/v1/payment/ready", data, {
      headers,
    })
    .then((response) => {
      res.json({ data: response.data });
    })
    .catch((error) => console.error(error));
});

router.post("/approved", (req, res) => {
  const { email, campaign, total_amount } = req.params;
  const data = `cid=TC0ONETIME&partner_order_id=hugus&partner_user_id=${email}&item_name=${campaign}&quantity=1&total_amount=${total_amount}&tax_free_amount=0&approval_url=http://localhost:3000/pay/approved&cancel_url=http://localhost:3001&fail_url=http://localhost:3001`;
  const headers = {
    Authorization: `KakaoAK ${process.env.APP_ADMIN_KEY}`,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  axios
    .post("https://kapi.kakao.com/v1/payment/approve", data, {
      headers,
    })
    .then((response) => {
      // console.log(response.data);
      res.json({ data: response.data });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
