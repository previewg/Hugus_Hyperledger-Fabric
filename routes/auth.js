"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const axios = require("axios");

// multer 설정
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "user_profile"),
    filename: (req, file, cb) => cb(null, file.originalname + "_" + Date.now()),
  }),
});

router.post("/signup", async (req, res, next) => {
  const { email, nickname, password } = req.body;
  let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  let regPassword = /^[a-zA-Z0-9]{10,15}$/;

  try {
    const exUser = await User.findOne({ where: { email } });
    const exNick = await User.findOne({ where: { nickname } });
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

// 로그인
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      return res.status(400).json({ success: 2 });
    }
    bcrypt.compare(password, user.password).then((isMatched) => {
      if (isMatched) {
        let session = req.session;
        session.loginInfo = {
          user_email: user.email,
        };

        const payload = {
          nickname: user.nickname,
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
    console.log(req.file);
    let profile = req.file.path;
    await User.update(
      {
        user_profile: profile,
      },
      { where: { nickname: username } }
    );
    res.json({ success: 1 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: 3 });
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

module.exports = router;
