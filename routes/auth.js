const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
//const session = require('express-session');
const router = express.Router();

// router.use(session({
//     secret: 'Molrang~$1$234',
//     resave: false,
//     saveUninitialized: true
// }));
// generates hash

// compares the password


router.post('/signup', async (req, res, next) => {
    const {email, nickname, password} = req.body;

    try {
        const exUser = await User.findOne({where: {email}});
        //중복방지
        if (exUser) {
            res.status(500).json({
                error: '중복이메일',
                code: 1
            })
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hash,
        });
        return res.status(200).json({success: 'true'});

    } catch (err) {
        console.error(err);
        return next(err);
    }

});

router.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    // let session = req.session;

    User.findOne({
        where: {
            email,
        },

    }).then((user) => {
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        // session.loginInfo = {
        //     _id: user._id,
        //     email: user.email,
        // }
        //Password 비교
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    nickname: user.nickname,
                };
                // jwt 객체가 sign() method를 호출해서 토큰을 생성
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        //token 지속시간
                        expiresIn: '24h',
                    },
                    (err, token) => {
                        //res.cookie(key,value) cookie에 key값을 넣는 방식
                        res.cookie('token', token);
                        res.json({
                            nickname: user.nickname,
                            id: user.id,
                            token: token,
                        });
                    },
                );
            } else {
                return res
                    .status(400)
                    .json({passwordincorrect: 'PassWord Incorrect'});
            }
        });
    });
});
router.post('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({success: true});
})

module.exports = router;

