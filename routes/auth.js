"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const smtpTransporter = require("nodemailer-smtp-transport");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const server = require("../app");

const { User, Email_confirm } = require("../models");

// 회원가입
router.post("/signup", async (req, res, next) => {
  const { email, nickname, password } = req.body;
  let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  let regPassword = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{9,}$/i;

  try {
    const exUser = await User.findOne({ where: { email } });
    const exNick = await User.findOne({ where: { nickname } });

    // 이메일 중복
    if (exUser) {
      return res.json({
        success: 2,
        code: 0,
      });
    }

    // 이메일 형식 오류
    if (!regEmail.test(req.body.email)) {
      return res.json({
        success: 2,
        code: 1,
      });
    }

    // 닉네임 중복
    if (exNick) {
      return res.json({
        success: 2,
        code: 2,
      });
    }

    // 비밀번호 형식 오류
    if (!regPassword.test(req.body.password)) {
      return res.json({
        success: 2,
        code: 3,
      });
    }

    const hash = await bcrypt.hash(password, 12);

    crypto.randomBytes(8, (err, buf) => {
      crypto.pbkdf2(
        email,
        buf.toString("base64"),
        100000,
        8,
        "sha512",
        (err, key) => {
          User.create({
            email,
            nickname,
            password: hash,
            hash: key.toString("base64"),
          });
        }
      );
    });
    return res.status(200).json({ success: 1 });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/requestEmail", async (req, res) => {
  const key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
  const key_two = crypto.randomBytes(256).toString("base64").substr(50, 5);
  const key_for_verify = key_one + key_two;
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const email = req.body.email;
  const smtpTransport = nodemailer.createTransport(
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

  const url = `http://127.0.0.1:3000/auth/confirmEmail/${key_for_verify}/${email}`;

  try {
    if (regEmail.test(req.body.email)) {
      await Email_confirm.create({
        email: email,
        key_for_verify: key_for_verify,
      });
      setTimeout(function () {
        Email_confirm.destroy({ where: { email: email } });
      }, 100000);
    }
    let mailOpt = {
      from: "yh9407@gmail.com",
      to: email,
      subject: "이메일 인증을 진행해주세요 - HUGUS",
      html: "<h2>아래의 링크를 클릭하여 인증을 진행해주세요 !</h2>" + url,
    };

    await smtpTransport.sendMail(mailOpt, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("email has been sent.");
      }
      smtpTransport.close();
    });
    res.status(200).json({ success: 1 });
  } catch (err) {
    console.log(err);
  }
});

router.get("/confirmEmail/:key/:email", async (req, res) => {
  const data = Email_confirm.findOne({
    where: { key_for_verify: req.params.key },
  });

  try {
    if (data) {
      await Email_confirm.update(
        { email_verified: true },
        { where: { key_for_verify: req.params.key } }
      );
      server.emit(req.params.email, "SUCCESS");

      res.send(
        "<script type=\"text/javascript\">alert(\"인증이 성공적으로 완료되었습니다. 회원가입을 이어서 진행해주세요.\");window.open('','_self').close();</script>"
      );
    } else {
      res.send(
        "<script type=\"text/javascript\">alert(\"인증기한이 만료되었습니다. 이메일 인증을 다시 진행해주세요.\");window.open('','_self').close();</script>"
      );
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
      });
    }

    bcrypt.compare(password, user.password).then((isMatched) => {
      if (isMatched) {
        let session = req.session;
        session.loginInfo = {
          user_email: user.email,
          user_nickname: user.nickname,
        };
        const payload = {
          nickname: user.nickname,
          profile: user.user_profile,
          email: user.email,
          hash_email: user.hash,
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
              email: user.email,
              hash_email: user.hash,
            });
          }
        );
      } else {
        return res.status(400).json({ success: 2 });
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
router.post("/destroy", (req, res, next) => {
  const { email } = req.body;
  let store = req.sessionStore;

  try {
    store.destroy((err) => {
      if (err) throw err;
    });
    res.clearCookie("hugus");
    User.destroy({ where: { email } }).then((result) => {
      return res.status(200).json({ success: 1 });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// 회원비밀번호 재확인
router.post("/confirm", async (req, res) => {
  const { nickname, password } = req.body;
  console.log(nickname, password);
  const user = await User.findOne({ where: { nickname } });
  if (user) {
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      return res.json({ success: 1 });
    } else {
      res.json({ success: 2 });
    }
  } else {
    res.status(400).json({ success: 3 });
  }
});

//카카오 로그인
router.post("/kakao", async (req, res) => {
  let email = req.body.id + "@kakao.com";
  if (req.body.kakao_account.email) email = req.body.kakao_account.email;
  let nickname = req.body.kakao_account.profile.nickname;
  let user_profile = req.body.kakao_account.profile.profile_image_url;
  const password = await bcrypt.hash(`${req.body.id}`, 12);
  let hash = "";
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    user_profile = user.getDataValue("user_profile");
    nickname = user.getDataValue("nickname");
    hash = user.getDataValue("hash");
  } else {
    crypto.randomBytes(8, (err, buf) => {
      crypto.pbkdf2(
        email,
        buf.toString("base64"),
        100000,
        8,
        "sha512",
        (err, key) => {
          hash = key.toString("base64");
          User.create({
            email: email,
            nickname: nickname,
            user_profile: user_profile,
            password: password,
            hash: key.toString("base64"),
          });
        }
      );
    });
  }

  let session = req.session;
  session.loginInfo = {
    user_email: email,
    user_nickname: nickname,
  };
  const payload = {
    email: email,
    nickname: nickname,
    profile: user_profile,
    social: "kakao",
    hash_email: hash,
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
    (err, token) => {
      res.cookie("hugus", token);
      res.json({
        success: 1,
        nickname: nickname,
        profile: user_profile,
        email: email,
        social: "kakao",
        hash_email: hash,
      });
    }
  );
});

//네이버 로그인
router.post("/naver", async (req, res) => {
  const { email, nickname, profile } = req.body;
  const password = await bcrypt.hash(email, 12);
  let hash = "";
  let user_profile = "";
  let user_nickname = "";
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    user_profile = user.getDataValue("user_profile");
    user_nickname = user.getDataValue("nickname");
    hash = user.getDataValue("hash");
  } else {
    crypto.randomBytes(8, (err, buf) => {
      crypto.pbkdf2(
        email,
        buf.toString("base64"),
        100000,
        8,
        "sha512",
        (err, key) => {
          hash = key.toString("base64");
          User.create({
            email: email,
            nickname: nickname,
            user_profile: profile,
            password: password,
            hash: key.toString("base64"),
          });
        }
      );
    });
    user_profile = profile;
    user_nickname = nickname;
  }

  let session = req.session;
  session.loginInfo = {
    user_email: email,
    user_nickname: user_nickname,
  };
  const payload = {
    email: email,
    nickname: user_nickname,
    profile: user_profile,
    social: "naver",
    hash_email: hash,
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
    (err, token) => {
      res.cookie("hugus", token);
      res.json({
        success: 1,
        nickname: user_nickname,
        profile: user_profile,
        email: email,
        social: "naver",
        hash_email: hash,
      });
    }
  );
});

module.exports = router;
