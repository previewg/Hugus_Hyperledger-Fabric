"use strict";
const {Story, User} = require("../models");


const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const multerS3 = require('multer-s3');
const AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");

let s3 = new AWS.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hugus",
        key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension)
        },
        acl: 'public-read-write',
    })
})

router.put("/update", (req, res, next) => {
    const {email, nickname, password} = req.body;
    User.update({nickname: nickname}, {where: {nickname}});
});

// 회원사진수정
router.put("/profile", upload.single("file"), async (req, res) => {
    const user = req.session.loginInfo;
    let user_profile = req.file.location;

    try {
        const data = await User.findOne({where: {email: user.user_email}, attributes: ["user_profile"]})


        if (data.user_profile !== null) {
            const key = data.user_profile.split('/');
            console.log(key[3])
            await s3.deleteObject({
                Bucket: 'hugus',
                Key: decodeURI(key[3])
            }, (err) => {
                if (err) {
                    throw err;
                }
            })
        }
        await User.update({
                user_profile: user_profile,
            },
            {where: {email: user.user_email}}
        )
        jwt.sign(
            {
                nickname: user.user_nickname,
                profile: user_profile
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            },
            (err, token) => {
                res.cookie("hugus", token);
                res.json({success: 1, profile: user_profile});
            }
        );
    } catch (err) {
        console.error(err);
        res.status(400).json({success: 3});
    }
});
// 회원 기본 정보
router.post("/profile/view", async (req, res) => {
    try {
        const user_name = req.body.username;

        const data = await User.findOne(
            {where: {nickname: user_name}},
            {attributes: []}
        );
        res.json({data: data, success: 1});
    } catch (error) {
        console.log(error);
        res.status(400).json({failure: 3});
    }
});


router.post("/myWriting", async (req, res) => {
    try {
        const {username} = req.body;
        const user_email = await User.findOne({where: {nickname: username}});
        console.log(req.body.session)

        const writingList = await Story.findAll({
            where: {user_email: user_email.dataValues.email},
            attributes: ["story_title", "story_vote"],
        });

        res.json({list: writingList, success: 1});
    } catch (error) {
        res.status(400).json({success: 3});
    }
});
//정보 수정 하기
router.post("/update", async (req, res) => {
    const user = req.session.loginInfo;
    const changeName = req.body.userInfo.nickname;
    const changePhone = req.body.userInfo.phone;
    let regExp = /^\d{3}-\d{3,4}-\d{4}$/;
    const exEmail = await User.findOne({where: {email: user.user_email}});
    console.log(exEmail.nickname)
    try {
        const exUserName = await User.findOne({where: {nickname: changeName}});
        if (exEmail.nickname !== changeName) {
            if (exUserName) {
                return res.json({
                    success: 2,
                    code: 0,
                    changeName: changeName,
                    changePhone: changePhone,
                })
            }
        }
        if (!regExp.test(changePhone)) {
            return res.json({
                success: 2,
                code: 1,
            })
        }
        await User.update(
            {
                nickname: changeName,
                phone_number: changePhone,
            }, {where: {email: user.user_email}})

        const payload = {
            nickname: changeName,
            phone_number: changePhone,
            email: user.user_email,
            hash_email: user.hash_email,
            profile: user.profile,
        };
        await jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            },
            (err, token) => {
                // res.cookie(key,value) cookie에 key값을 넣는 방식
                res.cookie("hugus", token);
                res.status(200).json({
                    success: 1,
                    user_email: user.user_email,
                    user_nickname: changeName,
                    hash_email: user.hash_email,
                    profile: user.profile,
                    phone_number: changePhone,
                })
            }
        );
    } catch (error) {

    }
})


module.exports = router;
