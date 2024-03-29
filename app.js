"use strict";
const express = require("express");
const path = require("path");
const models = require("./models");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();
require("morgan")("dev");
require("cors")();
require("cookie-parser")();
require("./db")();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB 설정 ( 배포시 secret 변경 및 .env처리 )
app.use(
  session({
    secret: "Molrang~$1$234",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.MONGO_REMOTE_URL,
      collection: "sessions",
    }),
  })
);

// socket 설정
const io = require("socket.io");
const server = io.listen(3333);
server.on("connection", function (socket) {
  socket.emit("hugus", "connected");
});
module.exports = server;

// 업로드 파일 경로 설정
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/user_profile", express.static(path.join(__dirname, "user_profile")));
//
// try {
//   fs.readdirSync("uploads");
// } catch (error) {
//   console.log("uploads 폴더 생성");
//   fs.mkdirSync("uploads");
// }
//
// try {
//   fs.readdirSync("user_profile");
// } catch (error) {
//   console.log("user_profile 폴더 생성");
//   fs.mkdirSync("user_profile");
// }

// sequelize MariaDB 연결
models.sequelize
  .sync()
  .then(() => {
    console.log("✓ DB 연결 성공");
  })
  .catch((err) => {
    console.log("✗ DB 연결 에러");
    console.error(err);
    process.exit();
  });

// Router 설정
const authRouter = require("./routes/auth");
const myPageRouter = require("./routes/mypage");
const storyRouter = require("./routes/story");
const commentRouter = require("./routes/comment");
const hashtagRouter = require("./routes/hashtag");
const actRouter = require("./routes/act");
const talkRouter = require("./routes/talk");
const talkCommentRouter = require("./routes/talk_comment");
const blockRouter = require("./routes/block");
const payRouter = require("./routes/pay");
const campaignRouter = require("./routes/campaign");
const campaignCommentRouter = require("./routes/campaign_comment");
const adminRouter = require("./routes/admin");

// Router 사용
app.use("/auth", authRouter);
app.use("/myPage", myPageRouter);
app.use("/story", storyRouter);
app.use("/comment", commentRouter);
app.use("/hashtag", hashtagRouter);
app.use("/act", actRouter);
app.use("/talk", talkRouter);
app.use("/talk_comment", talkCommentRouter);
app.use("/block", blockRouter);
app.use("/pay", payRouter);
app.use("/campaign", campaignRouter);
app.use("/campaign_comment", campaignCommentRouter);
app.use("/admin", adminRouter);

// 404 처리
app.use((req, res) => {
  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
});

app.listen(process.env.PORT, () =>
  console.log(`${process.env.PORT} port is listening...`)
);
