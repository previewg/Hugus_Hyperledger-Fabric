"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { KakaoUser } = require("../models");
const axios = require("axios");
const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");
const crypto = require("crypto");

// multer 설정
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "user_profile"),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
  }),
});

// 회원가입
router.post("/signup", async (req, res, next) => {
  const { email, nickname, password } = req.body;
  let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  let regPassword = /^[a-zA-Z0-9]{10,15}$/;

  let key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
  let key_two = crypto.randomBytes(256).toString("base64").substr(50, 5);
  let key_for_verify = key_one + key_two;

  try {
    const exUser = await User.findOne({ where: { email } });
    const exNick = await User.findOne({ where: { nickname } });

    //중복방지

    let smtpTransport = nodemailer.createTransport(
      smtpTransporter({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "yh9407@gmail.com",
          pass: "nazgbplzumjbaozs",
        },
      })
    );

    let url =
      "http://127.0.0.1:3000" +
      "/auth" +
      "/confirmEmail" +
      "?key=" +
      key_for_verify;

    let mailOpt = {
      from: "yh9407@gmail.com",
      to: email,
      subject: "이메일 인증을 진행해주세요.",
      html: "<p>아래의 링크를 클릭해주세요 !</p>" + url,
    };
    await smtpTransport.sendMail(mailOpt, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("email has been sent.");
      }
      smtpTransport.close();
    });

    if (exUser) {
      return res.status(400).json({
        error: "EMAIL EXISTS",
        code: 1,
      });
    }
    if (!regEmail.test(req.body.email)) {
      return res.status(400).json({
        error: "BAD EMAIL EXP",
        code: 2,
      });
    }
    if (exNick) {
      return res.status(400).json({
        error: "NICKNAME EXISTS",
        code: 3,
      });
    }
    if (!regPassword.test(req.body.password)) {
      return res.status(400).json({
        error: "BAD PASSWORD",
        code: 4,
      });
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      password: hash,
      key_for_verify: key_for_verify,
    });

    return res.status(200).json({ success: "true" });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});
router.get("/confirmEmail", async (req, res) => {
  const data = await User.findOne(
    { where: { key_for_verify: req.query.key } },
    { attributes: [] }
  );
  if (data) {
    await User.update(
      { email_verified: true },
      { where: { key_for_verify: req.query.key } }
    );
    res.send("Successful the email_confirm ");
  } else {
    console.error();
  }
});

// 로그인
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      return res.status(400).json({
        success: 2,
        code: 1,
      });
    }
    console.log(user.email_verified);
    if (!user.email_verified === true) {
      return res.status(400).json({ success: 2, code: 2 });
    }
    bcrypt.compare(password, user.password).then((isMatched) => {
      if (isMatched) {
        let session = req.session;
        session.loginInfo = {
          user_email: user.email,
          user_nickname: user.nickname,
          email_verified: user.email_verified,
        };
        const payload = {
          nickname: user.nickname,
          profile: user.user_profile,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            //token 지속시간
            expiresIn: "24h",
          },
          (err, token) => {
            // res.cookie(key,value) cookie에 key값을 넣는 방식
            res.cookie("hugus", token);
            res.json({
              success: 1,
              nickname: user.nickname,
              profile: user.user_profile,
            });
          }
        );
      } else {
        return res.status(400).json({ success: 2, code: 1 });
      }
    });
  });
});

// 로그아웃
router.post("/signOut", (req, res) => {
  let store = req.sessionStore;
  store.destroy((err) => {
    if (err) throw err;
  });
  res.clearCookie("hugus");
  return res.json({ success: 1 });
});

// 회원탈퇴
router.delete("/destroy", (req, res, next) => {
  const { username } = req.body;
  let store = req.sessionStore;

  try {
    store.destroy((err) => {
      if (err) throw err;
    });
    res.clearCookie("hugus");
    User.destroy({ where: { nickname: username } }).then((result) => {
      return res.status(200).json({ success: 1 });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// 회원정보수정
router.put("/update", (req, res, next) => {
  const { email, nickname, password } = req.body;
  User.update({ nickname: nickname }, { where: { nickname } });
});

// 회원사진수정
router.put("/profile", upload.single("file"), async (req, res) => {
  const { username } = req.body;
  try {
    let profile = req.file.filename;
    await User.update(
      {
        user_profile: profile,
      },
      { where: { nickname: username } }
    );

    jwt.sign(
      { nickname: username, profile: profile },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        res.cookie("hugus", token);
        res.json({ success: 1, profile: profile });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: 3 });
  }
});

// 회원 기본 정보
router.post("/profile/view", async (req, res) => {
  try {
    const user_name = req.body.username;

    const data = await User.findOne(
      { where: { nickname: user_name } },
      { attributes: [] }
    );
    res.json({ data: data, success: 1 });
  } catch (error) {
    console.log(error);
    res.status(400).json({ failure: 3 });
  }
});

// 회원비밀번호 재확인
router.post("/confirm", async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { nickname: username } }).then((user) => {
    bcrypt.compare(password, user.password).then((isMatched) => {
      if (isMatched) {
        return res.status(200).json({ success: true });
      } else {
        res.status(400).json({ password_incorrect: "PassWord Incorrect" });
      }
    });
  });
});

//카카오 로그인
router.post("/kakao", async (req, res) => {
  KakaoUser.create({
    id_Value: req.body.profile.id,
    nickname: req.body.profile.properties.nickname,
  });
  const payload = {
    nickname: req.body.profile.properties.nickname,
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      //token 지속시간
      expiresIn: "24h",
    },
    (err, token) => {
      // res.cookie(key,value) cookie에 key값을 넣는 방식
      res.cookie("hugus", token);
      res.json({
        success: 1,
        nickname: payload.nickname,
      });
    }
  );
});

module.exports = router;
