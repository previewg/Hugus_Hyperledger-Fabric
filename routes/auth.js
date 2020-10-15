"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Email_confirm, Kakao_User } = require("../models");
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
    const data = await Email_confirm.findOne({
      where: { email: email },
      attributes: ["email_verified"],
    });

    //중복방지

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

    if (!data.email_verified || data === {}) {
      return res.status(400).json({
        error: "Email Not Confirmed",
        code: 5,
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
    });

    return res.status(200).json({ success: "true" });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/requestEmail", async (req, res) => {
  let key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
  let key_two = crypto.randomBytes(256).toString("base64").substr(50, 5);
  let key_for_verify = key_one + key_two;
  let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const email = req.body.email;

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

  try {
    if (regEmail.test(req.body.email)) {
      await Email_confirm.create({
        email: email,
        key_for_verify: key_for_verify,
      });
      await setTimeout(function () {
        Email_confirm.destroy({ where: { email: email } });
      }, 100000);
    }
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
    res.status(200).json({ success: "true" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/confirmEmail", async (req, res) => {
  const data = Email_confirm.findAll({
    where: { key_for_verify: req.query.key },
  });
  try {
    if (data) {
      await Email_confirm.update(
        { email_verified: true },
        { where: { key_for_verify: req.query.key } }
      );
      res.json({ success: 1 });
    } else {
      console.error();
      res.json({ success: 2 });
    }
  } catch (error) {
    console.log(error);
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

    bcrypt.compare(password, user.password).then((isMatched) => {
      if (isMatched) {
        let session = req.session;
        session.loginInfo = {
          user_email: user.email,
          user_profile: user.user_profile,
          user_nickname: user.nickname,
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
  Kakao_User.create({
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
